/* eslint-disable import/prefer-default-export */
// --- ici nos action asynchrones pour les appel AJAX ---
// au lieu d'ecrire les middleware à la main on utilise createAsyncThunk de toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store/store';

// on créé et on exporte le thunk
// fonction asynchrone executée au moment du dispatch d'une action vers le store
// qui va faire son job puis laisser passer l'action vers le reducer
// https://d33wubrfki0l68.cloudfront.net/08d01ed85246d3ece01963408572f3f6dfb49d41/4bc12/assets/images/reduxasyncdataflowdiagram-d97ff38a0f4da0f327163170ccc13e80.gif
export const actionCheckLogin = createAsyncThunk(
  // le nom de l'action
  'setting/CHECK_LOGIN',
  // la fonction asynchrone à executer
  // une fonction asynchrone renvoie une promesse
  // une promesse a 3 états possible : pending, fullfilled, failed
  // donc le reducer va recevoir automatiquement des actions à chaque état
  // la callback peut ne pas prendre de paramètres
  // mais si jamais on a besoin d'infos du state on peut ajouter les paramètres pour avoir :
  // _ : la valeur passée en param au moment de l'execution du actionCreator
  // thunkAPI : un objet avec plein de fonctions nottement la getState
  async (_, thunkAPI) => {
    // on veut recuperer email et password depuis le state
    // on ne peut pas utiliser le hook useSelector on est pas dans un composant
    // mais on pourrait avoir accès au store et faire un bon vieux store.getState ?
    // avec thunkAPI on a accès au getState
    const state = thunkAPI.getState() as RootState;

    // on fait la requete , on peut attendre le resultat on est dans une fonction async
    // 1 - pendant que je fais le job au tout debut il reçoit setting/CHECK_LOGIN/pending
    const result = await axios.post('http://localhost:3001/login', {
      email: state.settings.email,
      password: state.settings.password,
    });

    // si on a reussit la requete et reçu une 200 on est connecté
    // on pourrait ici ouvrir le canal de communication avec le serveur websocket

    // 2.1 - si jamais axios throw une erreur (par exemple si l'adresse du back ne repond pas, ou si on reçoit une 401) alors l'action setting/CHECK_LOGIN/rejected sera dispatché vers le reducer

    // 2.2 - si la requete se passe bien (si on reçoit une 200 OK), quand elle sera terminée
    // le reducer va recevoir une action setting/CHECK_LOGIN/fullfilled

    // si on veut faire passer des infos supplémentaires dans les actions qui vont aller au reducer on les retourne avec return monInfo;
    // les info reournées par le thunk iront directement dans le payload de l'action fullfilled
    return result.data.pseudo;
  }
);
