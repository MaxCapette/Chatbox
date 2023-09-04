import { hideModal, showModal } from '../../reducers/modalReducer'; // Importez l'action hideModal
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'; // Utilisez vos hooks personnalisés
import './Settings.scss';

function Settings() {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideModal()); // Fermez la modale en dispatchant l'action hideModal
  };
  const handleOpenModal = () => {
    dispatch(showModal({ modalType: 'SETTINGS_MODAL' }));
  };
  const modalState = useAppSelector((state) => state.modal);

  if (!modalState.isOpen) {
    return (
      <div className="settings">
        <button type="button" onClick={handleOpenModal}>
          Se connecter
        </button>
      </div>
    );
  }
  return (
    <div className="settings">
      <button
        type="button"
        className="settings-closeButton"
        onClick={handleClose}
      >
        X
      </button>
      <div className="settings-input">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Mot de passe" />
        <button type="button" className="settings-input-send">
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Settings;
