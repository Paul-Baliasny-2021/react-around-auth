import React, { useState, useEffect, useContext } from 'react'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleJobChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        })
    }

    return (
        <PopupWithForm name="edit" title="Edit profile" submitButtonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving}>
            <input id="name-input" className="popup__input popup__input_text_name" type="text" name="name" placeholder="Jacques Cousteau" minLength="2" maxLength="40" required value={name || ""} onChange={handleNameChange} />
            <span id="name-input-error" className="popup__error-message"></span>
            <input id="profession-input" className="popup__input popup__input_text_profession" type="text" name="profession" placeholder="Explorer" minLength="2" maxLength="200" required value={description || ""} onChange={handleJobChange} />
            <span id="profession-input-error" className="popup__error-message"></span>
        </PopupWithForm>
    )
}

