# ejemplo_15_06

**Capítulo 15: Codificando componentes** · paso 06 · Button.module.css tokenizado

El CSS completo del Button, con variantes, tamaños, focus, hover y
reduced-motion. Todo consume tokens. Cero valores hardcoded.

## Archivo

Ver `paso-01/src/Button/Button.module.css` completo (mostrado aquí comprimido):

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 0;
  border-radius: var(--radius-md);
  font: var(--font-body-md);
  cursor: pointer;
  transition: background var(--motion-fast) var(--ease-out);
}

.button:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.button[data-variant='primary'] {
  background: var(--color-action-bg);
  color: var(--color-action-fg);
}

.button[data-variant='primary']:hover:not(:disabled) {
  background: var(--color-action-bg-hover);
}

/* ... variants secondary, ghost, danger ... */

@media (prefers-reduced-motion: reduce) {
  .button, .spinner {
    transition: none;
    animation: none;
  }
}
```

## Por qué importa

**Todo tokenizado.** Cambiar `--color-action-bg` en `tokens.css` repinta el
Button en toda la app sin tocar el CSS del componente. Esto es la promesa
central del Cap 5 aplicada al componente real.

**`:focus-visible` sobre `:focus`.** El outline solo aparece con navegación
por teclado (o cuando el navegador considera que lo merece). Un click con
ratón no añade el ring azul, reduciendo ruido visual. Un `Tab` sí lo añade,
cumpliendo la obligación de accesibilidad.

**`prefers-reduced-motion` en capa CSS.** El spinner y las transiciones se
desactivan automáticamente para usuarios que lo han pedido en su sistema
operativo. No requiere código JavaScript, ni feature flag, ni detección
manual. El navegador decide.

**Specificity deliberada.** `.button[data-variant='primary']:hover:not(:disabled)`
tiene specificidad (0,3,1) que le permite ganar sobre un utility class
externo sin necesidad de `!important`. Reglas predecibles y debugables.

## Cómo correrlo

```bash
cd ../paso-01
npm install
npm run dev
```

Click el toggle de tema para ver cómo el mismo Button cambia sus colores
reaccionando a los tokens que cambian. Cero JS envuelto.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-15-codificando-componentes.md`, sección "El Button en código real, versión resumida"
- App completa: `paso-01/`
- Cap de tokens: `cap-05-tokens-visuales/paso-01`
- Cap de motion tokens: `cap-06-motion-tokens/paso-03` (reduced-motion)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
