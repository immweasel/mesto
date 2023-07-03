export default class Card {
  constructor(cardData, selectorTemplate, openFigurePopup, openDeletePopup, changeLike) {
    this._myId = cardData.myid;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._selectorTemplate = selectorTemplate;
    this._openFigurePopup = openFigurePopup;
    this._openDeletePopup = openDeletePopup;
    this._changeLike = changeLike;
    this._isLike = false;
    this._cloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.photo-grid__item').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.photo-grid__photo');
    this._likeElement = this._cloneElement.querySelector('.photo-grid__like');
    this._deleteElement = this._cloneElement.querySelector('.photo-grid__delete');
    this._subtitle = this._cloneElement.querySelector('.photo-grid__description');
    this._counter = this._cloneElement.querySelector('.photo-grid__counter');
  }

  _handleLike = () => {
    this._changeLike(this._isLike, this._cardId);
  }

  _handleDelete = () => {
    this._openDeletePopup({ element: this, cardId: this._cardId });
  }

  _handleOpenPopupImage = () => {
    this._openFigurePopup(this._cardData);
  }
  
  _setEventListener() {
    this._likeElement.addEventListener("click", this._handleLike);
    this._deleteElement.addEventListener("click", this._handleDelete);
    this._imageElement.addEventListener("click", this._handleOpenPopupImage);
  }

  _changeVisibleForDelete() {
    if (this._myId != this._ownerId) {
      this._deleteElement.remove();
      }
    //this._myId === this._ownerId ? this._deleteElement.style.display = 'block' : this._deleteElement.style.display = 'none'
  }

  removeCard() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._subtitle.textContent = this._name;
    this.checkStatusLike();
    this._changeVisibleForDelete();
    this._setEventListener();
    return this._cloneElement; 
  }

  checkStatusLike() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._isLike = true;
        this._likeElement.classList.add("photo-grid__like_active");
        return
      }
    })
    this._counter.textContent = this._likesLength;
  }

  toggleLike(likes) {
    this._likeElement.classList.toggle("photo-grid__like_active");
    this._counter.textContent = likes.length;
    this._isLike = !this._isLike;
  }
}