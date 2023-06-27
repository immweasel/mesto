import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFigure = this._popup.querySelector(".popup__figure-photo");
    this._figurePopupCaption = this._popup.querySelector(".popup__figure-caption");
  }

  open = (cardData) => {
    console.log(cardData)
    this._popupFigure.src = cardData.link;
    this._popupFigure.alt = cardData.name;
    this._figurePopupCaption.textContent = cardData.name;
    super.open();
  }
}