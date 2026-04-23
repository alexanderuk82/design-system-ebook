# ejemplo_16_05

**Capítulo 16: Testing** · paso 05 (test-runner de Storybook + axe)

Config del `@storybook/test-runner` que inyecta axe-playwright en cada
story y la valida antes de continuar. Cada story del Storybook se
convierte en un test a11y automatizado en CI, sin escribir nada
específico en la story.

No es ejecutable standalone. Es un archivo para copiar al repo con
Storybook (típicamente junto al `.storybook/` raíz).

## Nota sobre la versión del libro

El fragmento impreso en el Capítulo 16 usa Jest (`test-runner-jest.config.js`)
porque el test-runner histórico se apoyaba en Jest. Desde Storybook 8
la migración recomendada es Playwright + hooks `preVisit` / `postVisit`,
que es lo que este archivo usa. Mismo resultado, API actualizada.

## Cómo integrarlo

1. Instala: `pnpm add -D @storybook/test-runner axe-playwright`.
2. Copia `test-runner.js` a la raíz del repo con Storybook.
3. Añade al `package.json`:
   ```json
   "scripts": {
     "test-storybook": "test-storybook --config-dir .storybook"
   }
   ```
4. Levanta Storybook en una terminal: `pnpm storybook`.
5. En otra terminal: `pnpm test-storybook`. axe corre sobre cada
   story renderizada.

Para CI, el runner es capaz de arrancar Storybook por sí solo con
`concurrently`:

```json
"test-storybook:ci": "concurrently -k -s first -n 'SB,TEST' 'pnpm build-storybook && pnpm exec http-server storybook-static --port 6006 --silent' 'wait-on tcp:6006 && pnpm test-storybook'"
```

Añádelo al workflow del paso-03 como job paralelo.

## Cómo excluir una story específica

Añade a la story:

```tsx
export const Loading: Story = {
  args: { loading: true },
  parameters: {
    a11y: {
      disable: true, // test-runner salta esta story
    },
  },
};
```

Para excluir una regla concreta en vez de toda la story:

```tsx
parameters: {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
},
```

Útil cuando el contraste de la story depende de tokens de marca que
ya revisaste manualmente y no quieres volver a validar.

## Relación con los otros pasos

- **paso-01**: axe sobre componentes en Vitest, rápido, sin UI.
- **paso-05**: axe sobre stories del Storybook, con el componente
  renderizado en su contexto real.

Ambos aportan algo distinto. El Vitest cubre el componente aislado,
el test-runner cubre cómo se ven las stories que el equipo realmente
usa para documentar y probar. En un DS serio quieres los dos. Si solo
puedes tener uno, empieza por Vitest.

- **paso-03**: Chromatic (visual regression). Responde "¿cambió el
  pixel?".
- **paso-05**: axe sobre Storybook. Responde "¿sigue siendo
  accesible?".

Son complementarios. Chromatic no detecta violations nuevas, axe no
detecta cambios visuales intencionados.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-16-testing.md`, sección
  "Accessibility testing con axe" (final)
- Cap relacionado: `cap-13-storybook/paso-01` (Storybook base)
- Cap relacionado: `cap-16-testing/paso-03` (Chromatic workflow)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
