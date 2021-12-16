import React from 'react';
import bin from '../images/Trash.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.ownerId === currentUser._id;
    const isLiked = props.likes.some(i => i._id === currentUser._id);

    function handleCardClick() {
        props.onCardClick(props.cardData)
    }
    function handleLikeClick() {
        props.onCardLike(props.cardData);
    };

    function handleDeleteClick() {
        props.onCardDelete(props.cardData);
    };

    return (
        <div className="place">
            <button type="button" className={isOwn ? "place__delete" : "place__delete_hidden"} onClick={handleDeleteClick}><img src={bin} alt="trash bin" /></button>
            <img className="place__image" src={`${props.link}`} alt="user content cards" onClick={handleCardClick} />
            <div className="place__description">
                <h2 className="place__title">{props.name}</h2>
                <div className="place__like-box">
                    <button type="button" className={isLiked ? "place__like_active" : "place__like"} onClick={handleLikeClick}></button>
                    <span className="place__like-counter">{props.likesCounter}</span>
                </div>
            </div>
        </div>
    )
}

export default Card