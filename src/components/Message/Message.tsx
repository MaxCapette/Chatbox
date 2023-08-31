import './Message.scss';

interface MessageProps {
  newMessage: string;
  author: string;
}

function Message({ newMessage, author }: MessageProps) {
  return (
    <>
      <h2>{author}</h2>
      <div className="chatBox">{newMessage}</div>
    </>
  );
}

export default Message;
