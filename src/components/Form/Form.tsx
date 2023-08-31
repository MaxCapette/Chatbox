import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import store from '../../store/store';
import { actionChangeMessage } from '../../reducers/messageReducer';
import { useAppSelector } from '../../hooks/hooks';

function Form() {
  const newMessage = useAppSelector((state) => state.newMessage);
  const dispatch = useDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actionChangeMessage(event.target.value));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // useDispatch(actionSendMessage(event.target.value));
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
