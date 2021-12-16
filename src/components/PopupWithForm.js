import * as React from 'react'
import crossIcon from '../images/CloseIcon.svg';

function PopupWithForm(props) {
    return (
        <div className={props.isOpen ? 'popup_active' : `popup popup_type_${props.name}`}>
            <div className="popup__window">
                <h2 className="popup__title">{props.title}</h2>
                <button type="button" className="popup__closer" onClick={props.onClose}><img src={crossIcon} alt="Closing cross" className="popup__x" /></button>
                <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__submit">{props.isSaving ? "Saving..." : props.submitButtonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;