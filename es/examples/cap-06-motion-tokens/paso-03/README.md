# ejemplo_06_03

**Capítulo 6: Motion tokens** · paso 03

`prefers-reduced-motion` implementado al nivel de tokens, no al nivel de componente. Es la pieza que el capítulo 6 marca como obligatoria por accesibilidad: WCAG 2.2 success criterion 2.3.3 lo exige y un porcentaje no despreciable de tus usuarios lo necesita.

```
tokens/primitive.json   →  motion.duration.fast/normal/slow + motion.ease.out  (valores normales)
tokens/reduced.json     →  los mismos nombres                                   (todos a 0.01ms)
                              ↓
                       build.mjs (emite el primitivo + dos overrides)
                              ↓
dist/variables.css      →  :root { ... valores normales ... }
                            @media (prefers-reduced-motion: reduce) { :root { ... 0.01ms ... } }
                            html.reduced { ... 0.01ms ... }
                              ↓
index.html              →  modal usa los tokens. Activa reduce motion en el OS o
                            marca el checkbox y el modal aparece de golpe.
```

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias.

```bash
cd es/examples/cap-06-motion-tokens/paso-03
node build.mjs        # genera dist/variables.css con base + overrides
```

Abre `index.html`. La barra de status te dice si el OS pidió reduce motion y si el toggle manual está activo. Si cualquiera de los dos está activo, el modal aparece sin animación.

## La idea clave

El componente del modal sigue siendo idéntico al de `paso-01`. Lee `--motion-duration-slow` y `--motion-ease-out`. No tiene ningún `@media (prefers-reduced-motion)` propio. Cero código en componentes para soportar accesibilidad de motion.

Cuando el navegador detecta que el usuario activó reduce motion, las variables del `:root` se redefinen al instante. Todos los componentes del producto que consuman tokens de duration heredan el cambio. Si tienes 80 componentes con animaciones, no hay que tocar 80 archivos. Hay que tocar uno: el archivo de tokens.

Esa es la diferencia entre un sistema sano y un sistema que parchea accesibilidad caso por caso.

## Por qué 0.01ms y no 0

Algunas implementaciones de `transitionend` no se disparan si la duración es exactamente 0. JavaScript que escucha el final de una transición se queda colgado. `0.01ms` es percibido como instantáneo por el ojo humano y permite que el evento se siga disparando. Es uno de esos detalles que parecen una tontería hasta que un componente queda atascado en producción.

## Por qué dos overrides (media query y clase)

El `@media (prefers-reduced-motion: reduce)` es el respeto al setting del sistema operativo. Es el comportamiento correcto por defecto.

La clase `html.reduced` es para un toggle dentro de tu producto. Algunos usuarios viven en dispositivos compartidos (oficina, biblioteca) donde no quieren cambiar la configuración global. Un toggle "Reducir animaciones" en preferencias del producto que escribe a `localStorage` y aplica `html.reduced` resuelve ese caso. Si tu producto se usa en contextos así, este toggle multiplica el alcance accesible.

## Lo que vale la pena tocar

Activa reduce motion en el OS (System Settings → Accessibility → Reduce Motion en macOS, equivalentes en iOS, Windows y Android). Recarga la página. La barra de status lo refleja. Abre el modal. Aparece de golpe.

Quita el override `@media` del CSS generado y deja solo la clase `html.reduced`. El toggle manual sigue funcionando, pero el setting del OS no se respeta. Los usuarios con motion sensitivity tienen que usar tu toggle interno o sufrir las animaciones. Demuestra por qué el media query no es opcional.

Añade un override más: `html.reduced .parallax-hero { display: none; }`. Hay animaciones que incluso a 0.01ms causan malestar (parallax, vídeo autoplay, scroll grandes). Para esas, no se reduce: se desactiva. La regla del capítulo: si la animación implica movimiento de más del 10% del viewport, desactívala completamente, no solo la aceleres.

## Diferencia con paso-01 y paso-02

`paso-01` muestra cómo se usan los motion tokens en CSS. `paso-02` muestra cómo se compilan a Dart para Flutter. Este muestra cómo el sistema honra accesibilidad sin pedirle nada a los componentes. Las tres piezas juntas son el ciclo completo: definir, distribuir y respetar.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-06-motion-tokens.md`, sección "prefers-reduced-motion como ciudadano de primera clase"
- Donde se exige por accesibilidad: WCAG 2.2 SC 2.3.3, citado en la misma sección
- Donde se conecta con el toggle de producto: misma sección, último párrafo

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
