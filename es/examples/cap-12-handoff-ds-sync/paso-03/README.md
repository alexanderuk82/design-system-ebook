# ejemplo_12_03

**Capítulo 12: Handoff con DS Sync** · paso 03

Simulación del paso 3 del flujo del plugin DS Sync: el output CSS variables generado a partir del JSON exportado desde Figma. Te enseña qué archivo recibe el dev en su PR y cómo se mapean los **modes** de Figma (light/dark) a `:root`, `@media (prefers-color-scheme)` y un override manual `[data-theme="dark"]`.

```
tokens-from-figma.json   # Lo que DS Sync emite desde Figma. W3C tokens con
                         # modes en la capa semantic ({"light": ..., "dark": ...}).
                              ↓
                       build.mjs
                              ↓
dist/tokens.css          # Tres bloques: :root (light) + @media (auto)
                         #              + [data-theme="dark"] (manual)
                              ↓
index.html               # Tarjeta + 3 botones para cambiar de modo en vivo.
```

## Cómo correrlo

```bash
cd es/examples/cap-12-handoff-ds-sync/paso-03
node build.mjs
```

Abre `index.html`. Tres botones: "Modo OS" (respeta preferencia del sistema operativo), "Forzar light", "Forzar dark". El componente Card se reconfigura usando solo CSS variables.

## Qué simula este ejemplo

DS Sync (el plugin) toma las variables de Figma, las valida con axe-style checks (contraste APCA, naming conventions, refs no rotas), y produce un archivo CSS variables como el de `dist/tokens.css`. Este folder no incluye el plugin (que es producto comercial), pero sí incluye exactamente el formato JSON que el plugin emite y el script que lo convierte a CSS.

Si tienes acceso a DS Sync o a Tokens Studio, el JSON real será similar al de `tokens-from-figma.json` (estructura W3C Design Tokens con modes embebidos). Si no, este JSON es un buen template para diseñar tu propio export.

## La estructura W3C con modes

```json
{
  "color": {
    "semantic": {
      "surface": {
        "base": {
          "$value": { "light": "{color.primitive.gray.50}",
                      "dark":  "{color.primitive.gray.900}" },
          "$type": "color"
        }
      }
    }
  }
}
```

`$value` puede ser un string (token sin modes) o un objeto `{ "light": ..., "dark": ... }` cuando el token cambia por mode. La spec W3C Design Tokens estandariza esta estructura. Tools como DS Sync, Tokens Studio y Figma Variables Export pueden todos producir este formato.

El `build.mjs` detecta cuál es cada caso y emite tres bloques CSS distintos:
1. `:root { ... }` — primitivos + semantic en modo light (default)
2. `@media (prefers-color-scheme: dark) { :root { ... } }` — solo el subset semantic con su valor dark
3. `[data-theme="dark"] { ... }` — el mismo subset, pero accesible mediante una clase para overrides manuales

Esa última pieza (`[data-theme="dark"]`) es lo que permite un toggle de tema dentro del producto que NO depende del setting del OS.

## Lo que vale la pena tocar

Edita `tokens-from-figma.json` y cambia `"#0052CC"` en `blue.500` por otro color. Corre el build. La tarjeta cambia de color, en light y en dark.

Añade un nuevo token semantic con modes, por ejemplo `color.semantic.feedback.error`. Mapea light a un rojo claro y dark a un rojo oscuro. Corre el build. Aparece en los tres bloques CSS sin tocar el script.

Cambia tu OS a dark mode y abre la página con "Modo OS" activo. La tarjeta debe pasar a dark sin que pulses nada.

## Diferencia con paso-01 y paso-02

Este folder es el **único** del cap 12 con código (los pasos 1, 2, 4-7 del libro son walkthroughs visuales del plugin, no necesitan ejecutable). Por eso solo `paso-03` materializa: representa el momento del flujo donde el JSON deja Figma y entra al ecosistema del repo.

## Volver al libro

- Texto fuente: `SPA/04-herramientas/cap-12-handoff-ds-sync.md`, sección "Paso 3, output CSS variables generado"
- Donde se explica el flujo completo de 8 pasos: capítulo 12 entero
- Comparación con Tokens Studio: misma sección, "Comparación honesta con Tokens Studio"

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
