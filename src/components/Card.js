export default class Card {
  constructor(cardData, selectorTemplate, openFigurePopup, openDeletePopup) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._selectorTemplate = selectorTemplate;
    this._openFigurePopup = openFigurePopup;
    this._cloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.photo-grid__item').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.photo-grid__photo');
    this._likeElement = this._cloneElement.querySelector('.photo-grid__like');
    this._deleteElement = this._cloneElement.querySelector('.photo-grid__delete');
    this._subtitle = this._cloneElement.querySelector('.photo-grid__description');
    this._openDeletePopup = openDeletePopup;
  }

  _handleLike = () => {
    this._likeElement.classList.toggle("photo-grid__like_active");
  }

  _handleDelete = () => {
    this._openDeletePopup(this);
  }

  _handleOpenPopupImage = () => {
    this._openFigurePopup(this._cardData);
  }
  
  _setEventListener() {
    this._likeElement.addEventListener("click", this._handleLike);
    this._deleteElement.addEventListener("click", this._handleDelete);
    this._imageElement.addEventListener("click", this._handleOpenPopupImage);
  }

  removeCard() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._subtitle.textContent = this._name;
    this._setEventListener();
    return this._cloneElement; 
  }
}