import { Button } from '@ds/react';

export function App() {
  const currentIntent = 'primary';

  return (
    <div className="app">
      <Button intent="primary">Save</Button>
      <Button intent="secondary" onClick={() => console.log('cancel')}>
        Cancel
      </Button>
      <Button intent={currentIntent} disabled>
        Confirm
      </Button>
      <Button intent="danger">Delete account</Button>
    </div>
  );
}
