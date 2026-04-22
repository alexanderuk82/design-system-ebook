# ejemplo_07_01

**Capítulo 7: Multi-plataforma y sync** · paso 01

Tres tokens de color, una sola fuente JSON, cuatro outputs nativos. CSS para web, Swift para iOS, Kotlin (Compose) para Android, Dart para Flutter. Cada uno con la sintaxis que su plataforma exige, todas generadas desde el mismo archivo.

```
tokens/colors.json      →  color.brand.primary    = #0052CC
                            color.brand.secondary  = #7B1FA2
                            color.text.primary     = #1A1A1A
                              ↓
                       build.mjs (lee el JSON, emite 4 archivos en sus formatos nativos)
                              ↓
build/css/tokens.css         :root { --color-brand-primary: #0052CC; ... }
build/ios/Tokens.swift       Color(red: 0.0, green: 0.322, blue: 0.8)
build/android/Tokens.kt      Color(0xFF0052CC)
build/flutter/tokens.dart    Color(0xFF0052CC)
```

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias externas.

```bash
cd es/examples/cap-07-multi-plataforma-y-sync/paso-01
node build.mjs        # genera los 4 archivos en build/
```

Inspecciona los cuatro archivos en `build/` para ver, lado a lado, las cuatro sintaxis que el capítulo 7 explica con palabras.

## Las cuatro sintaxis lado a lado

Mismo color, `#0052CC`. Cuatro formas de declararlo:

| Plataforma | Sintaxis | Comentario |
|---|---|---|
| CSS | `--color-brand-primary: #0052CC;` | Hex string directo. La conversión es trivial porque el CSS acepta hex de fábrica |
| Swift | `Color(red: 0.0, green: 0.322, blue: 0.8)` | SwiftUI pide floats normalizados entre 0 y 1. El build divide cada componente entre 255 |
| Kotlin | `Color(0xFF0052CC)` | Compose pide Long con prefijo `0xFF` (alpha en el byte alto) seguido del RGB |
| Dart | `Color(0xFF0052CC)` | Flutter usa Long también, sintaxis casi idéntica a Compose. Casi |

Lo importante no son las diferencias. Es que las diferencias **existen**, son sutiles, y son exactamente donde los humanos se equivocan al traducir a mano. Un dev iOS que copie a ojo el hex acaba con `Color(red: 0, green: 82, blue: 204)` en vez de los floats normalizados, y el azul sale completamente apagado. Un dev Android que se olvide del `0xFF` acaba con un color transparente. Cero de estos errores ocurre cuando el pipeline traduce.

## Por qué este ejemplo es solo un script casero

Style Dictionary, la herramienta real que automatiza esto en producción, llega en `paso-02`. Aquí uso un generador propio en Node sin dependencias para enseñar la idea sin la ceremonia de instalación de SD. Cuando veas `paso-02` con la config completa de Style Dictionary, los outputs van a ser prácticamente idénticos a los que produce este script. Esa es la prueba de que SD no es magia, es disciplina aplicada al mismo problema.

## Lo que vale la pena tocar

Cambia `#0052CC` por `#1F6FEB` en `tokens/colors.json`. Corre el build. Mira los 4 archivos en `build/`. El hex cambió en CSS, los floats Swift se recalcularon, los longs Kotlin y Dart cambiaron sus 6 dígitos hex internos. Una edición, cuatro plataformas actualizadas, sin tocar código de aplicación.

Añade un nuevo color en `tokens/colors.json`, por ejemplo `color.feedback.success = "#22C55E"`. Corre el build. Aparece en los 4 outputs con el nombre `colorFeedbackSuccess` (Swift, Kotlin, Dart) o `--color-feedback-success` (CSS). El naming se convierte automáticamente al estilo idiomático de cada plataforma.

Mira el `build.mjs`. Verás tres conversiones: hex a RGB normalizado para Swift, hex a Long con `0xFF` para Kotlin y Dart, hex literal para CSS. Esa es la lógica que Style Dictionary tiene baked in para docenas de plataformas más. El paso-02 te lo monta.

## Diferencia con caps anteriores

Hasta ahora todos los ejemplos generaban un solo output (CSS, o Dart, o ambos). Este genera cuatro outputs distintos desde un único set de tokens. El JSON deja de ser "tokens para CSS" y se convierte en "tokens para el sistema, sea cual sea la plataforma".

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-07-multi-plataforma-y-sync.md`, sección "Por qué cada plataforma pide el mismo token con sintaxis distinta"
- Donde se monta el pipeline real con Style Dictionary: `paso-02`
- Donde se conecta con Figma: misma sección, "Mirada de diseñador"

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
