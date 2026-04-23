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
          Example 15_01, Button + runtime theming
        </h1>
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Theme: {theme}
        </Button>
      </header>

      <section style={section}>
        <h2 style={h2}>Variants</h2>
        <div style={row}>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="ghost">Back</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Sizes</h2>
        <div style={row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>States</h2>
        <div style={row}>
          <Button variant="primary" loading>
            Saving
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Polymorphism, as={'{anchor}'}</h2>
        <div style={row}>
          <Button as="a" href="https://example.com" variant="primary">
            Link-as-button
          </Button>
          <Button as="a" href="#detail" variant="ghost">
            Internal anchor
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
