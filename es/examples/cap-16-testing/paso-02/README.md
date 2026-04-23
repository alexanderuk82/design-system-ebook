# ejemplo_16_02

**Capítulo 16: Testing** · paso 02 (Storybook interaction tests)

Extracto del archivo `Button.stories.tsx` mostrando dos stories con
bloque `play`. El bloque `play` corre interacción de usuario dentro de
la story, se visualiza paso a paso en Storybook (panel
Interactions) y se ejecuta en CI a través de `@storybook/test-runner`
(ver paso 05).

Este ejemplo no es ejecutable standalone. Es un fragmento que vive
dentro del Storybook del paso `cap-13-storybook/paso-01`, donde ya
está configurado el runner y las stories básicas del Button.

## Cómo integrarlo

1. Copia `Button.stories.tsx` sobre el existente en el Storybook
   (`cap-13-storybook/paso-01/src/components/Button.stories.tsx`).
2. Añade al `package.json` del Storybook: `@storybook/test@^8.0.0`.
3. Arranca `npm run storybook`.
4. Abre la story `ClickFires`. Verás la visualización de la
   interacción en el panel Interactions con timeline.
5. Abre `LoadingBlocksClick`. El click no dispara el `fn()` porque
   el Button lo bloquea cuando loading, y el assert lo verifica.

## Tres cosas que destacar

**`fn()` en los args.** `@storybook/test` expone `fn()`, equivalente
a `vi.fn()` pero integrado con el panel Actions. Cuando se llama el
handler ves la invocación registrada con sus argumentos.

**`within(canvasElement)`.** Scope limitado al canvas de la story,
no al document completo. Útil cuando tienes stories en docs page con
múltiples instancias del componente.

**Los mismos tests, dos entornos.** El `play` es casi idéntico al
unit test de `paso-01`. La diferencia: aquí tienes visualización, en
unit no. La regla: tests del contrato puro en Vitest (rápido, sin UI),
tests con contexto visual o estado complejo en Storybook (lento, con
timeline).

## Cuándo usar uno u otro

Unit test Vitest para:
- Lógica del componente (props → output).
- Matemática interna (cálculos de posición, validación).
- Happy path y edge cases simples.

Interaction test Storybook para:
- Flujos multi-step (abrir modal, tab keyboard, cerrar).
- Debugging de tests flaky. La visualización ayuda.
- Componentes compuestos con animación o estado transitorio.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-16-testing.md`, sección
  "Interaction tests en Storybook"
- Cap relacionado: `cap-13-storybook/paso-01` (Storybook base)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
