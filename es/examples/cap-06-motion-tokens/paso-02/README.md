# ejemplo_06_02

**Capítulo 6: Motion tokens** · paso 02

Los mismos motion tokens que `paso-01`, esta vez compilados de JSON a Dart para Flutter. Mismo `tokens/primitive.json` (literalmente la misma fuente de verdad). Solo cambia el target del `build.mjs`: en vez de emitir CSS, emite una clase Dart con `Duration` y `Cubic` constants listas para consumir desde cualquier widget.

```
tokens/primitive.json   →  motion.duration (5 valores) + motion.ease (4 curvas)
                              ↓
                       build.mjs (parsea ms y cubic-bezier, emite codigo Dart)
                              ↓
lib/motion_tokens.dart  →  class MotionTokens { static const ... }
                              ↓
example/main.dart       →  AnimatedContainer(duration: MotionTokens.durationNormal,
                                              curve:    MotionTokens.easeOut, ...)
```

## Cómo regenerar los tokens

```bash
cd es/examples/cap-06-motion-tokens/paso-02
node build.mjs        # genera lib/motion_tokens.dart
```

## Cómo correr el ejemplo Flutter

Esta parte requiere Flutter SDK instalado en tu máquina. Si lo tienes:

```bash
# Crea un proyecto Flutter cualquiera
flutter create motion_demo
cd motion_demo

# Copia los dos archivos de este folder al proyecto
cp ../es/examples/cap-06-motion-tokens/paso-02/lib/motion_tokens.dart lib/
cp ../es/examples/cap-06-motion-tokens/paso-02/example/main.dart lib/main.dart

# Corre
flutter run
```

Verás dos demos: un AnimatedContainer que cambia de tamaño con `durationNormal` y `easeOut`, y un AnimatedOpacity con `durationSlow` y `easeEmphasized`. Los nombres de los tokens son idénticos a los de la versión web del `paso-01`.

Si no tienes Flutter, no pasa nada: lee `lib/motion_tokens.dart` y `example/main.dart`. El punto del ejemplo es enseñar que **el mismo JSON puede producir CSS o Dart** sin que el equipo de diseño tenga que mantener dos verdades. Ese es el valor del pipeline multi-plataforma del que habla el capítulo 7.

## Lo que hace el build

El script Node lee `tokens/primitive.json` y traduce dos tipos de valor:

1. **Duraciones tipo `"250ms"`** → `Duration(milliseconds: 250)`. Flutter expone `Duration` como tipo nativo, así que el mapeo es directo.
2. **Curvas tipo `"cubic-bezier(0.16, 1, 0.3, 1)"`** → `Cubic(0.16, 1, 0.3, 1)`. Flutter tiene una clase `Cubic` que acepta los cuatro parámetros de un Bézier de tercer orden, exactamente como CSS.

El nombre de cada constante sale del path del token. `motion.duration.normal` → `durationNormal`. `motion.ease.in-out` → `easeInOut`. Convención simple y predecible.

## Lo mismo para Swift y Kotlin

El patrón es idéntico, solo cambia el target. Para Swift, las constantes serían `TimeInterval` y `CAMediaTimingFunction`. Para Kotlin, `Long` (en milisegundos) y `androidx.compose.animation.core.CubicBezierEasing`. El capítulo 7 cubre esa pieza completa con Style Dictionary, donde añadir un nuevo target es una transformer file y nada más.

## Diferencia con paso-01

`paso-01` emite CSS. Este emite Dart. El JSON fuente es el mismo. Si en seis meses el equipo decide que `motion.duration.normal` debe ser 200ms en vez de 250, edita el JSON y regenera. La web cambia. El Flutter cambia. iOS y Android cambian. Cero divergencia entre plataformas. Cero PRs en cinco repos. Esa es la promesa real del pipeline.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-06-motion-tokens.md`, sección "Mirada de dev" (snippet Flutter)
- Donde se monta el pipeline multi-plataforma de verdad: capítulo 7 (Style Dictionary)
- Donde se añade reduced motion: `paso-03`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
