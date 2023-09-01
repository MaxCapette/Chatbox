import Settings from '../Settings/Settings';
import Form from '../Form/Form';
import Messages from '../Messages/Messages';

import './App.scss';

function App() {
  const isSettings = true;
  return (
    <div className="app">
      {isSettings && <Settings />}
      <Messages />
      <Form />
    </div>
  );
}

export default App;
