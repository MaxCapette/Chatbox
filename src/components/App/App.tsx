import { useState } from 'react';
import Form from '../Form/Form';

import Messages from '../Messages/Messages';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Messages />
      <Form />
    </div>
  );
}

export default App;
