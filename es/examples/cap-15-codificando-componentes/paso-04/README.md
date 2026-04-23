# ejemplo_15_04

**Capítulo 15: Codificando componentes** · paso 04 · CSS Modules por data-attr

El CSS del Button no se dispara por classnames condicionales desde TypeScript.
Se dispara por selectores de atributo (`data-variant`, `data-size`).

## Extracto

De `paso-01/src/Button/Button.module.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font: var(--font-body-md);
  transition: background var(--motion-fast) var(--ease-out);
}

.button[data-variant='primary'] {
  background: var(--color-action-bg);
  color: var(--color-action-fg);
}

.button[data-size='sm'] { padding: var(--space-1) var(--space-3); }
.button[data-size='md'] { padding: var(--space-2) var(--space-4); }
.button[data-size='lg'] { padding: var(--space-3) var(--space-5); }
```

## Por qué importa

El TSX expone `data-variant={variant}` y `data-size={size}`. El CSS responde
con el selector de atributo. Ventajas concretas:

1. **DOM inspeccionable.** Abre DevTools Elements y ves `data-variant="primary"`
   directamente en el botón. Debugear un variant mal aplicado es instantáneo.
2. **Sin clsx condicional.** No hay `clsx({ primary: variant === 'primary' })`.
   El TSX queda limpio: una sola línea `data-variant={variant}`.
3. **Compatibilidad con Storybook controls.** Cambiar `variant` desde el panel
   de Storybook muta el atributo, el CSS responde, sin JSX re-renders de clase.
4. **Cascada predecible.** Los selectores `[data-variant='primary']` tienen
   specificidad conocida (0,1,1), más alta que una clase sola (0,1,0). Eso
   permite que un utility classname externo no gane por accidente.

Todo el CSS consume tokens (`var(--color-action-bg)`, `var(--space-4)`). Cero
hex codes. Cero magic numbers.

## Cómo correrlo

```bash
cd ../paso-01
npm install
npm run dev
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-15-codificando-componentes.md`, sección "El Button en código real"
- App completa: `paso-01/`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
