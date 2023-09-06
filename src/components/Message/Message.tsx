import { IMessage } from '../../@types/chat';
import { useAppSelector } from '../../hooks/hooks';
import './Message.scss';

function Message({ author, content, id }: IMessage) {
  const isMine = useAppSelector((state) => {
    return state.settings.pseudo === author;
  });
  return (
    <div className={isMine ? 'message message--mine' : 'message'}>
      <div className="message-author">{author}</div>
      <div className="message-content">{content}</div>
    </div>
  );
}

export default Message;
