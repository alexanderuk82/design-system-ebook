# ejemplo_09_06

**Capítulo 9: Construyendo componentes** · paso 06

Modal accesible construido sobre Radix Dialog. Recibes focus trap, escape para cerrar, body scroll lock, portal y ARIA dialog completo. Tu trabajo es estilizar y conectar el state.

## Cómo correrlo

Abre `index.html`. Necesita internet porque tira `@radix-ui/react-dialog` desde esm.sh con un importmap (mismo patrón que el `paso-04`).

## Las siete cosas que Radix te resuelve

Estas son las piezas que tendrías que construir desde cero (y donde casi todo el mundo se equivoca al hacerlo). Radix te las da al importar:

1. **Focus trap.** Tab y Shift+Tab navegan solo dentro del modal. No se escapan al fondo.
2. **Retorno de foco.** Cuando cierras, el foco vuelve al elemento que abrió el modal. Los usuarios de teclado no pierden la posición.
3. **Escape para cerrar.** Tecla Escape dispara `onOpenChange(false)`.
4. **Click en overlay para cerrar.** El overlay (fondo oscuro) cierra al click. Configurable.
5. **Body scroll lock.** Mientras el modal está abierto, el `<body>` no scrollea. Móvil sobre todo lo agradece.
6. **Portal.** El contenido se renderiza fuera del DOM tree del padre, así escapa de `overflow: hidden` y `transform` del padre.
7. **ARIA dialog completo.** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apuntando al `Dialog.Title`, `aria-describedby` apuntando al `Dialog.Description`. Sin nada que escribir tú.

## La API que expongo

```tsx
<Modal
  open={isPublishing}
  onOpenChange={setIsPublishing}
  title="Confirmar publicacion"
  description="Revisa los cambios antes de subir"
>
  <p>Vas a publicar 14 cambios en 3 plataformas.</p>
  <Button onClick={publish}>Publicar ahora</Button>
</Modal>
```

Cinco props. `open` y `onOpenChange` lo hacen controlled (la versión que querrás integrar con flujos del producto). `title` es required para que el `aria-labelledby` siempre exista. `description` es opcional. `size` (sm/md/lg) ajusta el max-width vía data-attribute.

## Por qué `title` es required

Un Dialog sin título accesible es un Dialog que no anuncia nada al screen reader cuando se abre. La única forma de garantizar accesibilidad es exigir el título en el TypeScript. Si tu modal visualmente no necesita un título grande, ponlo y ocúltalo con `visually-hidden` (la misma técnica del Input en `paso-03`). El title está, el screen reader lo lee, el ojo no lo ve.

## Lo que vale la pena tocar

Abre el modal. Pulsa Tab dos veces. Vas del botón Cancelar al Publicar y luego al botón X de cerrar. Una más y vuelves al Cancelar. El foco está atrapado. Pulsa Escape: se cierra y el foco vuelve al botón "Publicar release" del fondo.

Inspecciona el DOM cuando el modal está abierto (Devtools). El `Dialog.Content` se renderiza al final del `<body>`, no dentro de `<main>`. Es el portal: escapa del DOM tree para que no lo afecte ningún `overflow: hidden` del padre.

Cambia `size="md"` a `size="sm"` o `size="lg"`. El CSS lee `data-size` y ajusta el max-width.

Abre dos modales anidados en el demo (uno dentro del primero). Radix lo soporta y mantiene el focus trap correcto en el modal de arriba.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-09-construyendo-componentes.md`, sección "Organism, Modal accesible"
- Documentación oficial Radix Dialog: https://www.radix-ui.com/primitives/docs/components/dialog

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
