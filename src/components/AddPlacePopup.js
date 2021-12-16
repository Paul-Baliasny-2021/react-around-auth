import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");

   useEffect(() => {
        setTitle('');
        setLink('');
    }, [props.isOpen]);
    
    function handleLinkUpdate(e) {
        setLink(e.target.value);
    };

    function handleTitleUpdate(e) {
        setTitle(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlaceSubmit({
            link,
            name: title
        });
    };

    return (
        <PopupWithForm name="add" title="New place" submitButtonText="Create" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving}>
        <input id="toponym-input" className="popup__input popup__input_text_toponym" type="text" name="name" placeholder="Title" minLength="1" maxLength="30" value={title} required onChange={handleTitleUpdate}/>
        <span id="toponym-input-error" className="popup__error-message"></span>
        <input id="url-input" className="popup__input popup__input_text_link" type="url" name="link" placeholder="Image URL" value={link} required onChange={handleLinkUpdate}/>
        <span id="url-input-error" className="popup__error-message"></span>
    </PopupWithForm>
    )
}