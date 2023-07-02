import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__form");
    this.submitButton = this._form.querySelector(".popup__submit");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitFunction({ element: this._element, cardId: this._cardId });
    })
  }

  open = ({ element, cardId }) => {
    super.open();
    this._element = element;
    this._cardId = cardId;
  }

  // setupDefaultText() {
  //   this._submitButton.textContent = this._defaultTextButton;
  // }
}