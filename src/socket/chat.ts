// on impotre le store pour fair eun getState dessus et recuperer les infos du state
import { actionAddMessage } from '../reducers/chatReducer';
import store from '../store/store';
import { socket } from './socket';

/**
 * fonction executée quand on va vouloir ajouter un message (à la valid du form)
 * on envoyer le message au serveur en lui envoyant client_send_message
 */
export const sendMessageToServer = () => {
  // on veut envoyer un message avec le content du input et le author du state de redux
  // on peut ici importer le store et faire un getState
  const state = store.getState();

  socket.emit('client_send_message', {
    author: state.settings.pseudo,
    content: state.chat.newMessageContent,
  });
  // le serveur va recuperer notre message et lui ajouter un id
  // le serveur va ensuite le broadcaster en envoyant l'evenement server_send_message
};

/**
 * fonction executée quand on est connecté pour s'abonner aux messages du serveur
 * pour s'abonner à l'evenement server_send_message
 */
export const subscribeToMessagesFromServer = () => {
  // console.log('on vient de se connecter, on s\'abonne aux messages du back');

  // on s'abonne à server_send_message
  socket.on('server_send_message', (message) => {
    // si on reçoit un message on fait un log
    console.log('on a reçu un message du serveur', message);
    // on devra l'ajouter dans le state du store :
    // modif de state = dispatch d'action
    // avant on prepare un actionCreator
    // il va falloir envoyer le message reçu en payload au reducer sinon il ne saura pas quoi ajouter dans le state
    store.dispatch(actionAddMessage(message));
  });
};

/**
 * fonction executée à la deconnexion : quand le composant Messages est démonté
 */
export const unSubscribeFromServer = () => {
  // console.log('on vient de se DEconnecter, on se DEabonne du back');

  // on se déabonne à server_send_message
  socket.off('server_send_message');
};
