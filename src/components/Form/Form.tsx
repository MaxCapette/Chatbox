import { useDispatch } from 'react-redux';
import { FormEvent, useEffect, useRef } from 'react';
import './Form.scss';
import { Send } from 'react-feather';
import { useAppSelector } from '../../hooks/hooks';

import {
  actionAddMessage,
  actionChangeNewMessageContent,
} from '../../reducers/chatReducer';
import { sendMessageToServer } from '../../socket/chat';

/*
ENONCé exo cours ref
après le premier rendu du composant Form (dans un useEffect), placer le focus sur l'input
pour ça il nous faut le node input
on fait pas un querySelector on va mettre en place une ref
et appeler la méthode .focus()

BONUS: faire en sorte que si newMessageContent est vide au moment ou on veut ajouter le message, il ne soit pas ajouté..
*/

function Form() {
  // 1. on prepare la ref
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 3. on utilise notre ref
    inputRef.current?.focus();
  }, []);

  // on recupère la valeur du state pour faire le controle en lecture de l'input
  const value = useAppSelector((state) => state.chat.newMessageContent);
  // on recupere la fonction dispatch du store , on ne peut pas utiliser directement useDispatch dan sune callback, c'est un hook ça s'utilise QUE à la racine du composant (pas dans des boucles, dans des conditions, ou dans des sous fonction)
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // console.log('on a validé le form on veut ajouter le message dans le state');
    // comment avoir le contenu du message : faut aller le chercher dans le dom
    // on veut que cette données soit dispo dans le state, 2 options :
    // - input controlé par state local avec useState : avantage c'est plus leger que le state global et plus simple à mettre à coder
    // - input controlé par state global avec redux : avantage c'est que la donnée sera alors dispo dans le reducer (puisque le reducer à accès au state global)

    // on peut envoyer au reducer une demande d'ajout de message, y'aura pas besoin de payload puiqu'il saura quelle message ajouter

    // on verifie que le message n'est pas vide avant de demander l'ajout au reducer
    if (value.trim()) {
      // au lieu d'ajouter direct le message dans le state du store comme ça :
      // dispatch(actionAddMessage('la valeur du paramètre _ de la callback du thunk'));

      // on va plutot envoyer le message au serveur back (il ajoutera un id et le renverra à tout le monde)
      // on l'ajoutera dans le state au moment ou on le re reçoit du serveur
      sendMessageToServer();

      // j'ai envoyé mon message au serveur , je vais vider le input
      // modif de state du store = dispatch d'action !!!
      dispatch(actionChangeNewMessageContent(''));
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        value={value}
        onChange={(event) => {
          dispatch(actionChangeNewMessageContent(event.target.value));
        }}
        // 2. on lie la ref avec un element du JSX
        ref={inputRef}
      />
      <button className="form-btn" type="submit">
        <Send size={42} />
      </button>
    </form>
  );
}

export default Form;
