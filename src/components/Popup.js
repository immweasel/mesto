export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__close");
    this._form = this._popup.querySelector(".popup__form");
  }

  _closePopupByEsc = (evt) => {
    const escapeButton = 27;
    if (evt.keyCode === escapeButton) {
      this.close()
    }
  }

  _closePopup = () => {
    this.close()
  }

  _closePopupByOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this._closePopup);
    this._popup.addEventListener("click", this._closePopupByOverlayClick);
  }

  open() {
    window.addEventListener("keydown", this._closePopupByEsc);
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._closePopupByEsc);
  }
}