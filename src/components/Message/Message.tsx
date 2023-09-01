import { IMessage } from '../../@types/chat';
import './Message.scss';

function Message({ author, content, id }: IMessage) {
  return (
    <div className="message">
      <div className="message-author">{author}</div>
      <div className="message-content">{content}</div>
    </div>
  );
}

export default Message;
