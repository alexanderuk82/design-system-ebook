# ejemplo_07_02

**Capítulo 7: Multi-plataforma y sync** · paso 02

Style Dictionary configurado de verdad. La misma config que aparece literalmente en el snippet del capítulo 7. Corre `npm install && npm run build` y obtienes los cuatro archivos del `paso-01`, esta vez no generados por un script casero, sino por la herramienta de Amazon que sostiene los pipelines de tokens en producción desde 2016.

```
tokens/colors.json              →  3 colores (mismo set que paso-01)
                              ↓
                       style-dictionary build (config en style-dictionary.config.js)
                              ↓
build/css/tokens.css            :root { --color-brand-primary: #0052cc; ... }
build/ios/Tokens.swift          public class DSTokens { static let colorBrandPrimary = UIColor(...) }
build/android/Tokens.kt         object DSTokens { val colorBrandPrimary = Color(0xff0052cc) }
build/flutter/tokens.dart       class DSTokens { static const colorBrandPrimary = Color(0xFF0052CC) }
```

## Cómo correrlo

A diferencia de los ejemplos anteriores, este sí necesita `npm install`.

```bash
cd es/examples/cap-07-multi-plataforma-y-sync/paso-02
npm install           # instala style-dictionary
npm run build         # corre style-dictionary build
```

Los outputs aparecen en `build/`. Cuatro carpetas, cuatro archivos, todo desde un único JSON en `tokens/`.

## La config, paso a paso

`style-dictionary.config.js` es el documento entero. Cinco bloques:

1. **`source`**: dónde están los tokens fuente. Aquí, todos los `.json` debajo de `tokens/`.
2. **`platforms.css`**: usa el `transformGroup: "css"` (un preset que aplana referencias y formatea nombres en kebab-case), construye en `build/css/`, emite un archivo en formato `css/variables`.
3. **`platforms.ios`**: usa el `transformGroup: "ios-swift"` (convierte hex a `UIColor` con floats), construye en `build/ios/`, emite Swift en formato `ios-swift/class.swift` con className `DSTokens`.
4. **`platforms.android`**: `transformGroup: "compose"`, formato `compose/object`, packageName `com.miempresa.ds`, className `DSTokens`. El object es el equivalente Kotlin de un namespace.
5. **`platforms.flutter`**: `transformGroup: "flutter"`, formato `flutter/class.dart`, className `DSTokens`. La clase Dart con constructor privado y constantes estáticas.

Cada plataforma reusa el mismo `source`. Esa es la pieza fundamental: una sola fuente, cuatro destinos.

## Diferencia con paso-01

`paso-01` hace exactamente lo mismo con un `build.mjs` casero de 80 líneas. Este folder lo hace con Style Dictionary, una herramienta con cientos de transformers preconstruidos, soporte para más plataformas (CSS, SCSS, JSON, Swift, Objective-C, Kotlin, Java, Dart, Android XML, JavaScript, TypeScript), y una comunidad activa que mantiene los formatos.

¿Por qué tener los dos pasos? Porque `paso-01` te enseña la idea sin la ceremonia, y `paso-02` te enseña la herramienta real. La progresión funciona mejor que arrancar directamente con SD configurado.

## Lo que vale la pena tocar

Cambia `#0052CC` por `#1F6FEB` en `tokens/colors.json`. Corre `npm run build`. Mira los cuatro archivos en `build/`. Todos cambiaron, sin tocar config.

Añade un nuevo color en `tokens/colors.json`, por ejemplo `color.feedback.success` con valor `#22C55E`. Corre el build. Aparece en los cuatro outputs con el naming idiomático de cada plataforma (`colorFeedbackSuccess` en Swift/Kotlin/Dart, `--color-feedback-success` en CSS).

Mira el output Swift y compáralo con el output Kotlin. Mismo color, dos sintaxis. Una hace `UIColor(red: 0.122, green: 0.435, blue: 0.922, alpha: 1)`. La otra hace `Color(0xff1f6feb)`. Esa diferencia, multiplicada por todos los tokens del sistema, multiplicado por los cambios de un año, es exactamente lo que NO quieres mantener a mano.

## Spacing requiere transforms extra

La config de este folder usa solo colores porque, para spacing, los transformGroups por defecto necesitan un transform extra (`size/dp` para Compose, etc.) y la config crece sin aportar mucho al concepto. Si quieres extenderlo: añade `tokens/spacing.json` con valores numéricos puros (no `"4px"`, solo `4`), y modifica cada plataforma del config para concatenar el transform de spacing apropiado al transformGroup base. La forma exacta vive en la documentación de Style Dictionary v3.

En `paso-01` ya viste ese ejercicio resuelto con un script casero, que es más explícito sobre las conversiones por plataforma.

## Style Dictionary v3, no v4

Este folder usa Style Dictionary v3. La v4 cambió mucho la API (formats con espacios de nombres, schema W3C tokens por defecto en lugar del schema clásico). El snippet del capítulo 7 está pensado para v3 y este `package.json` lo pinea explícitamente. Cuando el ecosistema termine de migrar a v4 (alrededor de 2026 / 2027) este folder se actualizará.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-07-multi-plataforma-y-sync.md`, sección "Style Dictionary, el cuchillo suizo básico"
- Donde se conecta con CI: capítulo 12 (DS Sync, automatización del pipeline)
- Documentación oficial de SD v3: https://amzn.github.io/style-dictionary/

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
