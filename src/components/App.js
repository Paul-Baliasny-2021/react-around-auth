import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header'
import Footer from './Footer'
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isPicturePopupOpen, setIsPicturePopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUserEmail, setLoggedUserEmail] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const history = useHistory();

    const checkToken = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
            setIsLoggedIn(false)
        }
        if (token) {
            auth.checkContent(token)
                .then((res) => {
                    if (res) {
                        history.push('/');
                        setIsLoggedIn(true);
                        setLoggedUserEmail(res.data.email)
                    }
                })
        }
    }, [history]);

    useEffect(() => {
        checkToken()
    }, [checkToken]);

    function openInfoTooltip() {
        setIsInfoTooltipOpen(true);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
        setIsLoggedIn(false);
        closeAllPopups();
    };

    useEffect(() => {
        api.getUserInfo()
            .then(currentUser => {
                setCurrentUser(currentUser)
            })
            .catch(err => {
                console.log("Server returned this error:", err)
            })
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then(custCardData => {
                setCards(custCardData)
            })
            .catch(err => {
                console.log(`Server returned this error: ${err.status}`)
            })
    }, []);

    function openEditProfilePopup() {
        setIsEditProfilePopupOpen(true);
    };

    function openAddPlacePopup() {
        setIsAddPlacePopupOpen(true);
    };

    function openEditAvatarPopup() {
        setIsEditAvatarPopupOpen(true);
    };

    function openPicturePopup() {
        setIsPicturePopupOpen(true)
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsPicturePopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    };

    function handleUpdateUser(userData) {
        setIsSaving(true)
        api.editUserInfo(userData)
            .then(newUserData => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch(err => {
                console.log("Server returned this error:", err)
            })
            .finally(() => { setIsSaving(false) });
    };

    function handleUpdateAvatar(link) {
        setIsSaving(true)
        api.uploadUserAvatar(link)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => {
                console.log("Server returned this error:", err)
            })
            .finally(() => { setIsSaving(false) });
    };

    function handleAddPlaceSubmit(placeInfo) {
        setIsSaving(true)
        api.postNewCard(placeInfo)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log("Server returned this error:", err)
            })
            .finally(() => { setIsSaving(false) });
    };

    function handleCardClick(card) {
        setSelectedCard(card);
        openPicturePopup();
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log("Server returned this error:", err)
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => item._id !== card._id));
            })
            .catch(err => {
                console.log("Server returned this error:", err)
            })
    };

    return (
        <div className="page-container">
            <Switch>
                <Route path='/register'>
                    <Header
                        logText="Log in"
                        path={'/login'}
                    />
                    <Register
                        handleError={() => {
                            setIsSuccessful(false);
                            openInfoTooltip()
                        }
                        }
                        onSuccess={() => {
                            setIsSuccessful(true);
                            openInfoTooltip()
                        }} />
                    <InfoTooltip isOpen={isInfoTooltipOpen} isSuccessful={isSuccessful} onClose={closeAllPopups} />
                </Route>
                <Route path='/login'>
                    <Header
                        logText="Sign up"
                        path={'/register'}
                    />
                    <Login
                        onSuccess={() => {
                            setIsSuccessful(true);
                            openInfoTooltip()
                        }}
                        handleError={() => {
                            setIsSuccessful(false);
                            openInfoTooltip()
                        }
                        }
                        checkToken={checkToken}
                        handleLogin={handleLogin} />
                    <InfoTooltip isOpen={isInfoTooltipOpen} isSuccessful={isSuccessful} onClose={closeAllPopups} />
                </Route>

                <CurrentUserContext.Provider value={currentUser}>
                    <ProtectedRoute path='/' isLoggedIn={isLoggedIn}>
                        <Header
                            loggedUserEmail={loggedUserEmail}
                            logText="Log out"
                            path={'/login'}
                            onLogClick={handleLogout}
                        />

                        <Main
                            onEditAvatarClick={openEditAvatarPopup}
                            onEditProfileClick={openEditProfilePopup}
                            onAddPlaceClick={openAddPlacePopup}
                            cards={cards}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />

                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSaving={isSaving} />

                        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSaving={isSaving} />

                        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} isSaving={isSaving} />

                        <ImagePopup isOpen={isPicturePopupOpen} onClose={closeAllPopups} fullViewTitle={selectedCard.name} fullViewLink={selectedCard.link} />
                    </ProtectedRoute>
                </CurrentUserContext.Provider>

                <Route path='/'>
                    {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/login' />}
                </Route>
            </Switch>
            <Footer />
        </div >
    );
};

export default App;