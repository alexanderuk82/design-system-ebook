import { Button } from '@ds/react';

export function App() {
  const currentIntent = 'primary';

  return (
    <div className="app">
      <Button intent="primary">Guardar</Button>
      <Button intent="secondary" onClick={() => console.log('cancel')}>
        Cancelar
      </Button>
      <Button intent={currentIntent} disabled>
        Confirmar
      </Button>
      <Button intent="danger">Eliminar cuenta</Button>
    </div>
  );
}
