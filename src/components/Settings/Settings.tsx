import './Settings.scss';

function Settings() {
  return (
    <div className="settings">
      <button type="button" className="settings-closeButton">
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
