export const createFetchTemplate = (url, headers) =>
    fetch(url, headers)
        .then(res => res.ok ? res.json() : Promise.reject(`Error ${res.status}`));
       
class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return createFetchTemplate(`${this._baseUrl}/cards`, { headers: this._headers })
    };

    getUserInfo() {
        return createFetchTemplate(`${this._baseUrl}/users/me`, { headers: this._headers })
    };

    editUserInfo(userData) {
        const { name, about } = userData;
        return createFetchTemplate(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name,
                about,
            })
        })
    }

    uploadUserAvatar(link) {
        return createFetchTemplate(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(link)
        })
    }
    postNewCard(data) {
        return createFetchTemplate(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    deleteCard(cardId) {
        return createFetchTemplate(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: "DELETE"
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return createFetchTemplate(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: !isLiked ? "DELETE" : "PUT",
        })
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;
