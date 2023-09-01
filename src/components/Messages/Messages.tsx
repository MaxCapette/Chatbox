// https://redux-toolkit.js.org/api/other-exports
import { nanoid } from '@reduxjs/toolkit';
import { useRef, useEffect } from 'react';

import './Messages.scss';
import Message from '../Message/Message';
import { useAppSelector } from '../../hooks/hooks';

function Messages() {
  const messagesDivRef = useRef<HTMLDivElement>(null);
  const messageList = useAppSelector((state) => state.chat.messages);
  console.log(messageList);

  useEffect(() => {
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
        <Message {...message} key={nanoid()} />
      ))}
    </div>
  );
}

export default Messages;
