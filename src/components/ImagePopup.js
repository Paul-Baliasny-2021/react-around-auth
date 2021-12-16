import * as React from 'react'
import crossIcon from '../images/CloseIcon.svg';

function ImagePopup(props) {
 
    return (
        <div className={props.isOpen ? 'popup_active' : 'popup popup_type_picture'}>
            <figure className="popup__pic-container">
                <button type="button" className="popup__closer" onClick={props.onClose}><img src={crossIcon} alt="Closing cross" className="popup__x" /></button>
                <img src={props.fullViewLink} alt="user's place" className="popup__image" />
                <figcaption className="popup__image-title">{props.fullViewTitle}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;