// on importe la fonction de socketclient qui permet d'ouvir un canal de communication avec le serveur
import { io } from 'socket.io-client';

// on créé un canal avec le serveur back
// eslint-disable-next-line import/prefer-default-export
export const socket = io('http://localhost:3001/');
