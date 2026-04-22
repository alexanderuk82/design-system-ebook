# ejemplo_09_01

**Capítulo 9: Construyendo componentes** · paso 01

Button accesible con cuatro variantes, tres tamaños, cinco estados y slots para iconos. El componente entero vive dentro del `<script type="text/babel">` de `index.html`, compilado en el navegador con Babel standalone. No hay `npm install`, no hay bundler, solo abres el HTML.

```
index.html          # Babel compila el TSX en el navegador
├── Button.tsx      # embebido, con tipos React + variantes + estados
├── App.tsx         # embebido, demo con todas las combinaciones
styles.css          # Tokens + estilos del Button (data-variant, data-size)
README.md
```

## Cómo correrlo

Abre `index.html` directamente en el navegador. No hay dependencias locales, React y Babel se cargan desde unpkg.com.

Si quieres usar el Button en tu proyecto real, copia el TSX de `index.html` y pégalo en un archivo `Button.tsx`. En un proyecto con Vite o Next, funciona sin cambios porque el código es TSX estándar.

## Lo que demuestra el Button

**Cuatro variantes nombrables.** Primary para la acción principal, Secondary para alternativas, Ghost para terciarias dentro de un grupo, Danger para destrucción. Cuatro caben en una frase. Doce son síntoma de que el sistema está sustituyendo decisiones de diseño por configuración de prop.

**Tres tamaños fijos.** sm, md, lg. No hay un tamaño custom porque la escala tipográfica del capítulo 5 ya los fija. Si tu producto pide un botón "extra grande" para una hero section, la respuesta del sistema es: la hero usa su propia pieza, no un Button forzado a ser otra cosa.

**Estados completos desde el día uno.** default, hover, focus (con `outline: 2px solid var(--color-focus)` usando `:focus-visible`), disabled, loading. El loading bloquea el click sin desactivar visualmente el botón y pone `aria-busy` para que un screen reader anuncie el cambio. Un usuario con teclado y audio tiene la misma experiencia completa que un usuario con ratón.

**Slots, no props string para iconos.** `leftIcon` y `rightIcon` aceptan `ReactNode`. Permiten meter cualquier SVG, cualquier componente de icon, o nada. La alternativa de `iconName: string` obliga a mantener un mapa interno de nombres y rompe cuando alguien quiere meter un icono custom.

**`data-variant` y `data-size` en el DOM, no classnames condicionales.** El CSS lee selectores de atributo (`button[data-variant="primary"]`). En código React no hay `className={loading ? 'loading' : ''}` ni string-concatenation. El componente es legible, el CSS también.

## Por qué el código va embebido en el HTML

Los ejemplos de Fase B (caps 1 a 7) no requerían `npm install` y abrían con un doble click. Mantengo esa regla en Fase C. React UMD + Babel standalone desde un CDN compilan el TSX en el navegador. Es más lento que un bundle (Babel en runtime) y no lo pondrías en producción, pero para un ejemplo de libro es perfecto: el lector ve todo el código en un archivo, abre, juega.

Cuando llegues al capítulo 14 (codebase setup) y a Fase D del repo companion, verás los mismos componentes dentro de un monorepo pnpm con Vite, TypeScript de verdad y tests Vitest, que es como se monta en producción.

## Lo que vale la pena tocar

Cambia `variant="primary"` a `variant="secondary"` en el demo y recarga. El mismo componente, otra cara. El CSS solo decora data-attributes.

Añade una quinta variante, por ejemplo `success` (verde). Declara el tipo en la union `Variant`, añade el selector `button[data-variant="success"]` en `styles.css`. No toques `Button.tsx`. Acabas de extender el sistema.

Haz `loading={true}` permanente en un botón y navégalo con Tab desde el teclado. El anillo de focus aparece, pero el click no dispara nada. Esa es la diferencia entre `disabled` (el navegador lo omite del tab order) y `aria-disabled` (navegable pero no activable). Ambos aplicados juntos dan la experiencia correcta para loading.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-09-construyendo-componentes.md`, sección "Atom 1, Button"
- Donde se cuenta el 80/20 del scope del DS: misma sección, final del capítulo
- Donde los tests de accesibilidad del Button se automatizan: `paso-08` de este mismo capítulo

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
