/* eslint-disable prettier/prettier */
import { Plus } from 'react-feather';

import './Settings.scss';
import { FormEvent, useState } from 'react';
import ControlledInput from './ControlledInput';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { actionCheckLogin } from '../../middlewares/settingsMiddleware';
import { getActionDisconnect } from '../../reducers/settingsReducer';
import useSound from '../../hooks/useSound';
import boing from '../../assets/sound/boing.mp3';

function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  useSound(boing, isOpen);
  const dispatch = useAppDispatch();

  // on recupere l'info dans le state de redux isConnected pour savoir si on est connecté ou pas
  // si oui : on affiche un bouton de deconnexion
  // si non : on affiche le formulaire de connexion
  const isConnected = useAppSelector((state) => state.settings.isConnected);

  // On place isOpen dan le state local du composant Settings parce qu'on se dit que l'info qui pilote le fait que le bloc soit affiché ou caché n'interesse pas forcement les autres composants
  // c'est pas parce qu'on a mit en place redux que tout doit aller dans redux
  // on peut faire aussi des useState pour des infos locales

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // par default submit de form = rechargement de page
    // ne pas oublier le preventDefault !!!!
    event.preventDefault();

    // on veut envoyer au back l'email et le password pour savoir si ils sont corrects :
    // - si oui on va recevoir une 200 OK et un pseudo , on va stocker quelque part une info qui atteste qu'on est connecté et le pseudo reçu
    // - si non on va recevoir une 401 Unauthorized et on va afficher un message d'erreur
    // on pourrait très bien recuperer les infos du state du store et faire notre requete ici dans le handler
    // mais ça ne respecte pas vraiment la separation des concepts, un composant n'est pas le mieux placé pour faire nos effets de bord : ça serait bien de confier la resposabilité de nos requete à un autre acteur
    // on pourrait dispatcher une intention vers le reducer pour qu'il aille faire la requete et mettre à jour le state en concéquence : soit enregistrer le pseudo reçu soit enregistrer un message d'erreur dans le state
    // sauf qu'un reducer ne peux pas faire d'action asynchrone (il ne doit jamais laisser sa classe)
    // on va donc faire la requete dan sun middleware (une tierce personne qui recevra l'action avant le reducer et qui lui pourra faire de l'asynchrone)
    // on pourrait ecrire nos middleware à la main : https://redux.js.org/tutorials/fundamentals/part-4-store#middleware
    // mais on va plutot utiliser les thunk-middleware de redux : https://github.com/reduxjs/redux-thunk
    // avec redux-toolkit c'est installé par defaut !
    // on va dispatcher une intention pour que la requete soit effectuée dans le thunk
    dispatch(actionCheckLogin());
  };

  const handleDisconnect = () => {
    // on veut se deconnecter : modif de state
    // passer isConnected à false
    // vider le pseudo
    // je veux modifier le state de redux = je dispatch une demande
    dispatch(getActionDisconnect());
  };

  return (
    <div className={isOpen ? 'settings settings--open' : 'settings '}>
      <button
        className="settings-button"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Plus size="30" />
      </button>

      {isConnected ? (
        <button
          className="settings-submit"
          type="button"
          onClick={handleDisconnect}
        >
          Deconnexion
        </button>
      ) : (
        <form className="settings__form" onSubmit={handleSubmit}>
          {/* on utilise le CustomInput qui genere un input controlé par redux */}
          <ControlledInput name="email" />
          <ControlledInput name="password" type="password" />

          <button className="settings-submit" type="submit">
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}

export default Settings;
