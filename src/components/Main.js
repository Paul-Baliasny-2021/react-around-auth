import React, { useContext } from 'react';
import pen from '../images/VectorPen.svg';
import plus from '../images/VectorPlus.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card';

function Main(props) {
    const currentUser = useContext(CurrentUserContext)
    return (
        <div className="main-content">
            <section className="profile">
                <button className="profile__avatar-container" onClick={props.onEditAvatarClick}>
                    <img src={currentUser.avatar} alt="Avatar" className="profile__image" />
                    <div className="profile__avatar-overlay">
                        <img src={pen} alt="pen" className="profile__avatar-pen" />
                    </div>
                </button>
                <div className="profile__info">
                    <div className="profile__name-line">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfileClick}>
                            <img src={pen} alt="pen" className="profile__edit-pen" />
                        </button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlaceClick}>
                    <img src={plus} alt="plus" className="profile__plus" />
                </button>
            </section>
        
            <section className="places">
                {props.cards.map((cardInfo) => (
                    <Card
                        cardData={cardInfo}
                        key={cardInfo._id}
                        link={cardInfo.link}
                        name={cardInfo.name}
                        likesCounter={cardInfo.likes.length}
                        ownerId={cardInfo.owner._id}
                        likes={cardInfo.likes}
                        cardId={cardInfo._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </div>
    )
}

export default Main;