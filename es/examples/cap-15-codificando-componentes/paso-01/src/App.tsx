import { useState } from 'react';
import { Button } from './Button';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', padding: 'var(--space-5)' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-5)',
        }}
      >
        <h1 style={{ margin: 0, font: 'var(--font-body-lg)' }}>
          Ejemplo 15_01, Button + theming runtime
        </h1>
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Tema: {theme}
        </Button>
      </header>

      <section style={section}>
        <h2 style={h2}>Variantes</h2>
        <div style={row}>
          <Button variant="primary">Guardar</Button>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="ghost">Volver</Button>
          <Button variant="danger">Eliminar</Button>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Tamaños</h2>
        <div style={row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Estados</h2>
        <div style={row}>
          <Button variant="primary" loading>
            Guardando
          </Button>
          <Button variant="primary" disabled>
            Deshabilitado
          </Button>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Polimorfismo, as={'{anchor}'}</h2>
        <div style={row}>
          <Button as="a" href="https://example.com" variant="primary">
            Link-as-button
          </Button>
          <Button as="a" href="#detalle" variant="ghost">
            Ancla interna
          </Button>
        </div>
      </section>
    </div>
  );
}

const section: React.CSSProperties = {
  marginBottom: 'var(--space-5)',
  padding: 'var(--space-4)',
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-border)',
};

const h2: React.CSSProperties = {
  margin: '0 0 var(--space-3) 0',
  color: 'var(--color-muted)',
  font: 'var(--font-body-sm)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const row: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--space-3)',
  flexWrap: 'wrap',
  alignItems: 'center',
};
