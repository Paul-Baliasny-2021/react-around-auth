import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatar = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatar.current.value,
        })
    };

    return (
        <PopupWithForm name="avatar" title="Change profile picture" submitButtonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit = {handleSubmit} isSaving={props.isSaving}>
        <input ref={avatar} id="image-url-input" className="popup__input popup__input_text_link" type="url" name="avatar" placeholder="https://somewebsite.com/someimage.jpg" required />
        <span id="image-url-input-error" className="popup__error-message"></span>
    </PopupWithForm>
    )
}