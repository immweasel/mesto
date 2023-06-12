export default class FormValidator {
  constructor(config, form) {
    this._allforms = config.allforms;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;

    this._invalidationErrorSelector = config.invalidationErrorSelector;

    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
  }

  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorTextElement.textContent = '';
  }

  _showInputError(errorTextElement, input) {
    input.classList.add(this._inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
  }

  _checkInputValidity(input) {
    const errorTextElement = document.querySelector(`${this._invalidationErrorSelector}${input.name}`);
    input.validity.valid ? this._hideInputError(errorTextElement, input) : this._showInputError(errorTextElement, input);
  }

  _hasValidInput() {
    return Array.from(this._inputList).every((input) => input.validity.valid);
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  _toggleButtonState() {
    this._hasValidInput() ? this._enableButton() : this._disableButton(this._button);
  }

  _hangEventListener() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    const forms = Array.from(this._allforms);
    forms.forEach((form) => {
      this._button = form.querySelector(this._submitButtonSelector);
      this._inputList = form.querySelectorAll(this._inputSelector);
      this._hangEventListener();
    })
  }

  resetErrorForOpenPopup(form) {
    form.querySelectorAll(this._inputSelector).forEach((input) => {
      const errorTextElement = document.querySelector(`${this._invalidationErrorSelector}${input.name}`);
      if (!input.validity.valid) {
        this._hideInputError(errorTextElement, input);
      }
    })
    this._disableButton(this._button);
  }
}