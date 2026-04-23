# ejemplo_16_03

**Capítulo 16: Testing** · paso 03 (Chromatic CI workflow)

Workflow de GitHub Actions que corre Chromatic en cada push y PR a
`main`. Construye el Storybook en CI, lo sube a Chromatic, y Chromatic
compara pixel a pixel contra el baseline aprobado. Diferencias se
marcan para revisión humana.

No es ejecutable standalone. Es un archivo para copiar al repo con
Storybook. Requiere configurar el secreto `CHROMATIC_PROJECT_TOKEN` en
el repo de GitHub.

## Cómo integrarlo

1. Copia `.github/workflows/chromatic.yml` al repo raíz que contiene
   tu Storybook (el del Cap 13 paso-01 sirve como base).
2. Crea cuenta en [chromatic.com](https://www.chromatic.com/), conecta
   el repo, copia el `project-token`.
3. En GitHub, `Settings → Secrets and variables → Actions`, añade
   `CHROMATIC_PROJECT_TOKEN` con ese valor.
4. Push a `main`. La primera corrida marca el baseline inicial, sin
   comparación.
5. Push de un PR con cambio visual. Chromatic detecta el diff, crea
   un link en el status del PR. Abres ese link, apruebas o rechazas.

## Tres líneas que importan

**`exitZeroOnChanges: true`.** Los cambios visuales NO fallan el
workflow. El workflow pasa, el status del PR pide review manual. Sin
esto, cualquier cambio visual bloquea el PR y genera fricción con el
equipo de diseño.

**`onlyChanged: true`.** Modo "TurboSnap". Chromatic solo re-renderiza
stories afectadas por el diff del PR, no todo el Storybook. Ahorra
mucho tiempo y créditos en teams con 200+ stories.

**`fetch-depth: 0` en checkout.** Chromatic compara con la rama base.
Sin depth=0, el git history no incluye main y Chromatic falla al no
encontrar el baseline.

## Si no quieres pagar Chromatic

Tiene tier gratuito limitado (5k snapshots al mes). Para OSS o equipos
pequeños alcanza. Si se queda corto:

- **Loki** (open source). Corre headless Chrome en tu CI, screenshot
  por story, diff pixel-to-pixel. Setup más manual, cero coste. Github
  repo: `oblador/loki`.
- **Percy** (ex-BrowserStack). Similar a Chromatic, pricing parecido.
- **Playwright visual comparison**. Usa `toHaveScreenshot()` por
  story, funciona sin servicio externo. Setup medio.

Para un DS enterprise con 5+ apps consumidoras, Chromatic paga su
coste en tiempo de review y confianza. Para un side project, Loki.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-16-testing.md`, sección
  "Visual regression con Chromatic"
- Cap relacionado: `cap-13-storybook/paso-01` (Storybook a desplegar)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
