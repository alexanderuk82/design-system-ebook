# ejemplo_09_03

**Capítulo 9: Construyendo componentes** · paso 03

Input accesible. Label obligatorio en TypeScript, helper y error conectados al input vía `aria-describedby`, error con `role="alert"`, `forwardRef` para integrarse con react-hook-form y similares.

## Cómo correrlo

Abre `index.html` en el navegador. React UMD + Babel standalone se cargan desde unpkg, todo lo demás vive en el archivo HTML.

## Las tres decisiones que importan

**Label obligatorio en TypeScript.** La prop `label: string` es required, no opcional. El compilador lo exige y el runtime también. Hace imposible olvidarla. Para los casos raros donde el label tiene que estar oculto a la vista (barra de búsqueda compacta), está la prop `visuallyHiddenLabel` que oculta visualmente sin perder la accesibilidad para screen readers (clase `visually-hidden` con la técnica `clip: rect(0,0,0,0)` clásica).

**Helper text y error text con la asociación ARIA correcta.** El helper aporta contexto adicional ("te enviaremos la confirmación aquí"). El error aparece cuando la validación falla. Los dos se conectan al input vía `aria-describedby`, y el error toma precedencia sobre el helper. El error lleva `role="alert"` para que el screen reader lo anuncie en cuanto aparece, no solo cuando el usuario llega al campo.

**`useId` para el id del input.** React 18 introduce `useId` que genera un ID estable, único, server-rendering-safe. El id del input + helperId + errorId vienen del mismo prefijo, así no chocan con otros campos en la misma página.

## Lo que demuestra el demo

Cuatro escenarios:
1. Caso común con helper. Tipea un correo inválido, sal del campo (blur), aparece el error.
2. Con error preseteado. Muestra cómo se ve el helper desplazado por el error y el borde rojo.
3. Disabled. El input está bloqueado pero el label sigue visible.
4. Label oculto visualmente. Útil en barras de búsqueda donde el icono de lupa indica el propósito.

## Lo que vale la pena tocar

Quita el `error` de un Input y mira la consola del navegador buscando warnings de TypeScript (no aparecerán porque el TSX se compila a JS sin chequeo de tipos en runtime). Si copias el código a un proyecto TS real, verás cómo el compilador te exige el `label`.

Inspecciona el HTML generado en el devtools del navegador. El input tiene `aria-describedby` apuntando al span correcto. Cuando hay error, ese describedby cambia automáticamente al span del error.

Conecta el componente a react-hook-form: el `forwardRef` ya está hecho, solo `<Input {...register("email")} label="..." />` y funciona.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-09-construyendo-componentes.md`, sección "Atom 2, Input"
- Donde se explica la cadena ARIA con detalle: misma sección
- Donde aparece la auditoría axe del Input: `paso-08`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
