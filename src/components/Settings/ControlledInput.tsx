import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getActionSetInput } from '../../reducers/settingsReducer';

interface ControlledInputProps {
  name: 'email' | 'password';
  // on précise qu'il peut y avoir d'autres props mais on ne sait pas lesquelles
  [prop: string]: unknown;
}

/**
 * Ce composant est un input générique il est utilisé à la fois pour l'input email et l'input password
 * on reçoit le nom de l'input en props, ce nom correspond à une donnée dans le state de redux
 * le input est donc controlé par cette valeur dans le state de redux
 */
function ControlledInput({ name, ...otherProps }: ControlledInputProps) {
  // on recupère la fonction dispatch du store avec notre hook useAppDispatch
  const dispatch = useAppDispatch();

  // on récupère la valeur de l'input depuis le state du store
  // useQuelqueChose c'est un hook
  const valueFromRedux = useAppSelector((state) => state.settings[name]);

  return (
    <input
      type="text"
      className="settings-input"
      placeholder={name}
      value={valueFromRedux} // control en lecture : on affiche la donnée de redux
      onChange={(event) => {
        // modifier l'email ou le password dans le state de redux
        // on dispatch une action renvoyée par notre actionCreator actionSetInput
        dispatch(
          getActionSetInput({
            // on précise en payload :
            value: event.target.value, // le contenu de l'input
            inputName: name, // le nom de l'input pour que le reducer sache quelle donnée mettre à jour
          })
        );
      }}
      // on deverse toutes les ptotentielles props reçues en + de name
      // par exemple type='password' ou id='toto'
      {...otherProps}
    />
  );
}

export default ControlledInput;
