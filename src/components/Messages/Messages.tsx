// https://redux-toolkit.js.org/api/other-exports
import { useRef, useEffect } from 'react';

import './Messages.scss';
import Message from '../Message/Message';
import { useAppSelector } from '../../hooks/hooks';
import {
  subscribeToMessagesFromServer,
  unSubscribeFromServer,
} from '../../socket/chat';
import msnSound from '../../assets/sound/msnmessenger.mp3';
import useSound from '../../hooks/useSound';

function Messages() {
  // quand le composant est rendu pour la première fois : c'est qu'on est connecté !
  // donc on va s'abonner aux messages du back pour les afficher si il y en a
  useEffect(() => {
    // ici on met en place un abonnement : un effet de bord
    subscribeToMessagesFromServer();

    // quand on met en place un effet de bord au montage du composant il faut penser à le nettoyer au demontage du composant
    // la fonction qu'on return dans notre effet sera la fonction de nettoyage, elle sera executée au moment du demontage du composant
    return unSubscribeFromServer;
  }, []);

  // on prepare notre ref (une variable) avec useRef on lui donne en param la valeur initiale
  // dans notre cas la valeur initiale est vide car le DOM n'est pas pret , le node n'existe pas encore
  // dans le JSX on a précisé <div className="messages" ref={messagesDivRef}>
  // que cette ref doit etre liée avec le div .messages
  const messagesDivRef = useRef<HTMLDivElement>(null);

  // on veut recuperer la liste des messages du state pour afficher un composant Messsage pour chaque message du state
  // on va recuperer le state avec useSelector mais il sera pas typé, on voudrait recuperer son type avec donc on va plutot utiliser un hook custom qui type le state renvoyé
  const messageList = useAppSelector((state) => state.chat.messages);

  useSound(msnSound, messageList);
  /*
  A chaque fois qu'un message est ajouté dans le state le composant Messages est re rendu
  parce qu'il est abonné à la liste des messages
  on veut scroller,  on va placer notre modification du DOM dan sun useEffect comme il s'agit de modifier le DOM il faut attendre que la reconciliation au eu lieu, donc on le fait APRES le rendu
  */

  useEffect(() => {
    // on joue cet effet après chaque rendu aucours duquel messageList a changé
    // la variable ici est re creée à chaque effet, on va re chercher le div dans le DOM à chaque effet
    // const divMessages = document.querySelector('.messages');
    // plutot que d'aller chercher dans le DOM un div on va plutot associer une ref à sa version JSX
    // et quand le DOM sera pret react viendra placer le node dans la ref
    // la ref gardera sa valeur d'un rendu à l'autre
    // dans la ref, la valeur est placée sous un propriété appelée current
    const divMessages = messagesDivRef.current; // on recupere le div depusi la ref
    const divMessageHeight = divMessages?.scrollHeight; // on recupere la hauteur du div
    document.querySelector('.messages')?.scrollTo({
      top: divMessageHeight, // on scroll ke div de toute sa hauteur
      behavior: 'smooth',
    });
  }, [messageList]);

  return (
    <div className="messages" ref={messagesDivRef}>
      {messageList.map((message) => (
        // avec le spread operator on fait passer toutes les propriétés de l'objet message en prop dans le composant Message
        // {...message}
        // équivalent à :
        // author={message.author} content={message.content} id={message.id}
        <Message {...message} key={message.id} />
      ))}
    </div>
  );
}

export default Messages;
