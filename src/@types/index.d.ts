// Utilisation des `template literal types` pour un meilleur typage
export type TMessage = string;
export type TAuthor = string;

export interface AppState {
  newMessage: TMessage;
  author: TAuthor;
  messages: IMessage;
}

export interface IMessage {
  map(arg0: (message: IMessage) => JSX.Element): unknown;
  id: number;
  author: string;
  content: string;
}
