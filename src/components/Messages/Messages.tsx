import { IMessage } from '../../@types';
import { useAppSelector } from '../../hooks/hooks';
import Message from '../Message/Message';

function Messages() {
  const messages = useAppSelector((state) => state.messages);
  return messages.map((message: IMessage) => (
    <Message
      key={message.id}
      author={message.author}
      newMessage={message.content}
    />
  ));
}

export default Messages;
