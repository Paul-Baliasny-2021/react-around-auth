import * as React from 'react'
import crossIcon from '../images/CloseIcon.svg';
import successIcon from '../images/Check.svg';
import failureIcon from '../images/Oops.svg';

function InfoTooltip(props) {
 
    return (
        <div className={props.isOpen ? 'popup_active' : 'popup'}>
            <div className="popup__window">
                <button type="button" className="popup__closer" onClick={props.onClose}><img src={crossIcon} alt="Closing cross" className="popup__x" /></button>
                <img src={props.isSuccessful ? successIcon : failureIcon} alt="registration status icon" className="popup__icon" />
                <p className="popup__register-message">{props.isSuccessful ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}</p>
                </div>
        </div>
    )
}

export default InfoTooltip;
