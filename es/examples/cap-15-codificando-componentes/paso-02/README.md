# ejemplo_15_02

**Capítulo 15: Codificando componentes** · paso 02 · switch de theme en React

El componente raíz declara `data-theme` en un ancestor y un `useState` lo
cambia. Zero context providers, zero re-renders descendientes. El navegador
repinta solo.

## Archivo

Vive en `paso-01/src/App.tsx`:

```tsx
import { useState } from 'react';
import { Button } from './Button';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-theme={theme}>
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Tema: {theme}
      </Button>
      {/* resto de la app */}
    </div>
  );
}
```

## Por qué importa

Las alternativas (Context con objeto theme, prop drilling, CSS-in-JS con
theme prop) re-renderizan cada descendiente al cambiar tema. Con CSS
variables y `data-theme` el cambio es puramente cosmético a nivel del
navegador. Abre DevTools, pestaña Performance, graba mientras cambias tema,
y verás cero React renders entre el `setState` y el siguiente frame pintado.

## Pares clave

Este archivo trabaja junto con `paso-01/src/tokens.css` (paso 01 del
capítulo), que define las variables por tema. Sin esas variables, el cambio
de `data-theme` no tendría efecto.

## Cómo correrlo

```bash
cd ../paso-01
npm install
npm run dev
# click al boton "Tema: light" arriba a la derecha
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-15-codificando-componentes.md`, sección "Tokens como CSS variables, la capa base"
- App completa: `paso-01/`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
