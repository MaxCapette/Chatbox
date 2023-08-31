import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  actionChangeMessage,
  actionSendMessage,
} from '../../reducers/messageReducer';
import { useAppSelector } from '../../hooks/hooks';
import { IMessage } from '../../@types';

function Form() {
  const newMessage = useAppSelector((state) => state.newMessage);
  const dispatch = useDispatch();
  const messageToSend: IMessage = {
    author: 'Super Chat', // Assuming the author remains the same
    content: newMessage, // Use the newMessage string as the content
    // le newMessage est dispo dans le state de redux ... pas besoin de lui filer dans le payload ;)
    // on a fait un .push, pas sur que ce soit la bonne solutio
    // si ça marche pke on a toolkit !! si on avait un reducer classique sans le builder ça marcherai pas !
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actionChangeMessage(event.target.value));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(actionSendMessage(messageToSend));
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newMessage}
        className="form-item"
        placeholder="Ajouter un message"
        onChange={handleChange}
      />
    </form>
  );
}

export default Form;
