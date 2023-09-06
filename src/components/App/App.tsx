// install de redux : le package core
// + react-redux : le package pour avoir les hooks useDispatch et useSelector
// + @reduxjs/toolkit : le package pour avoir le configureStore (qui est plus facil à utiliser que le createStore de redux core), le createAction pour generer nos action creators, le createReducer qui nous permet de faire un reducer avec le builder sans se soucier de l'immutabilité
import { useAppSelector } from '../../hooks/hooks';
import Form from '../Form/Form';
import Messages from '../Messages/Messages';
import Settings from '../Settings/Settings';

import './App.scss';

function App() {
  // on recupere l'info du state pour savoir si on est connecté
  // si non on affcihe pas le formulaire (on ne peux pas poster de message si on est pas connecté)
  const isConnected = useAppSelector((state) => state.settings.isConnected);

  return (
    <div className="app">
      <Settings />
      {
        // si on est pas connecté on affiche pas le composant Messages ni Form
        isConnected ? (
          <>
            <Messages />
            <Form />
          </>
        ) : (
          <div>Veuillez vous connecter</div>
        )
      }
    </div>
  );
}

export default App;
