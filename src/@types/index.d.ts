// Utilisation des `template literal types` pour un meilleur typage
export type TMessage = string;
export type TAuthor = string;

export interface AppState {
  newMessage: TMessage;
  author: TAuthor;
}

export interface IMessage {
  id: number;
  author: string;
  content: string;
}
