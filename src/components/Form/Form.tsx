import { FormEvent, useEffect, useRef } from 'react';
import './Form.scss';
import { useDispatch } from 'react-redux';
import { Send } from 'react-feather';
import { useAppSelector } from '../../hooks/hooks';
import {
  actionAddMessage,
  actionChangeNewMessageContent,
} from '../../reducers/chatReducer';

function Form() {
  const value = useAppSelector((state) => state.chat.newMessageContent);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('on a validé le form on veut ajouter le message dans le state');
    if (value.trim()) {
      dispatch(actionAddMessage());
    }
  }
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="form-input"
        type="text"
        value={value}
        onChange={(event) => {
          dispatch(actionChangeNewMessageContent(event.target.value));
        }}
      />
      <button className="form-btn" type="submit">
        <Send size={42} />
      </button>
    </form>
  );
}

export default Form;
