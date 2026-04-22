# ejemplo_09_07

**Capítulo 9: Construyendo componentes** · paso 07

Navigation que separa lo visual del estado semántico. El item activo lleva `aria-current="page"` y el CSS decora ese atributo. Ninguna classname condicional paralela, ninguna forma de que se desincronicen el estilo visual y la información para screen readers.

## Cómo correrlo

Abre `index.html`. React UMD desde unpkg, Babel standalone compila el TSX en el navegador.

## La decisión que importa

El error común al construir navegación es decorar el item activo con una classname manual:

```tsx
// Antipatron
<a className={isActive ? 'active' : ''}>Inicio</a>
```

Esto da un nav que parece correcto visualmente pero que un usuario con screen reader no puede usar: el `aria-current` no está, así que el software de asistencia no sabe qué página es la actual.

El patrón correcto mete `aria-current="page"` en el item activo y deja que el CSS lea ese atributo:

```tsx
<a aria-current={isActive ? "page" : undefined}>Inicio</a>
```

```css
.nav-item[aria-current="page"] {
  background: var(--color-active-bg);
  color: var(--color-active-text);
}
```

Ahora es imposible decorarlo sin marcarlo accesible. Los dos viajan juntos por diseño.

## Las otras dos cosas que casi nadie pone bien

**`<nav>` con `aria-label` único.** Si tu página tiene dos `<nav>` (principal y footer, o principal y sidebar), cada uno necesita un `aria-label` distinto. El demo muestra dos navs: "Principal" y "Enlaces del footer". Un screen reader los lista en el landmark menu con esos nombres y el usuario puede saltar al que quiera.

**Links semánticos, no `<div onClick>`.** El item es un `<a href>` con semántica de enlace real. El navegador le da gratis el comportamiento correcto: click derecho → abrir en pestaña nueva, Ctrl+click → fondo, focus con Tab, Enter lo activa. Un `<div>` con onClick sólo funciona con ratón.

## Focus ring distinto del estado activo

En el CSS:
```css
.nav-item[aria-current="page"] { background: var(--color-active-bg); color: var(--color-active-text); }  /* verde */
.nav-item:focus-visible        { outline: 2px solid var(--color-focus); }                                  /* azul indigo */
```

Activo es verde (emerald), focus es azul (indigo). El usuario sabe siempre dónde está (aria-current) y dónde está enfocado (focus ring). Los dos pueden solaparse visualmente (estás Tab-navegando y pasas por el item activo) y siguen siendo distinguibles.

`:focus-visible` evita que el ring aparezca al click con ratón, solo cuando el usuario realmente está navegando con teclado.

## Lo que vale la pena tocar

Abre Devtools e inspecciona un item activo. Verás `aria-current="page"`. En los inactivos el atributo no aparece (undefined en React es equivalente a omitir).

Navega con Tab desde cualquier punto fuera del nav. Cuando el foco llega a un item, aparece el ring indigo. Pulsa Enter: navega a ese path (el demo usa state, en producción usarías useRouter de Next o similar).

Cambia el `label="Principal"` del segundo nav al mismo del primero. Chrome Devtools > Accessibility tab muestra que los landmarks tienen nombres duplicados. Un usuario con screen reader oirá ambos como "nav, Principal" y no podrá distinguirlos.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-09-construyendo-componentes.md`, sección "Organism, Navigation accesible"
- Donde se profundiza en accesibilidad: capítulo 10 (accesibilidad por diseño)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
