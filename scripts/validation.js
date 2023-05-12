const config = {
  allforms: document.forms,
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save_add",

  invalidationErrorSelector: ".popup__invalid_type_",

  inactiveButtonClass: "popup__save_add_disabled",
  inputErrorClass: "popup__text_invalid",
  errorClass: "popup__invalid_visible"
}

const log = console.log;

enableValidation(config);

function enableValidation(config) {
  const forms = Array.from(config.allforms);
  forms.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector);
    hangEventListener(inputList, button, config.invalidationErrorSelector, config.inactiveButtonClass, config.inputErrorClass, config.errorClass);
  })
}

function hangEventListener(inputList, button, invalidationErrorSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, invalidationErrorSelector, inputErrorClass, errorClass);
      toggleButtonState(inputList, button, inactiveButtonClass);
    })
  })
}

function checkInputValidity(input, invalidationErrorSelector, inputErrorClass, errorClass) {
  const errorTextElement = document.querySelector(`${invalidationErrorSelector}${input.name}`);
  input.validity.valid ? hideInputError(input, errorTextElement, inputErrorClass, errorClass) : showInputError(input, errorTextElement, inputErrorClass, errorClass);
}

function hideInputError(input, errorTextElement, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(errorClass);
}

function showInputError(input, errorTextElement, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorTextElement.textContent = input.validationMessage;
  errorTextElement.classList.add(errorClass);
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  hasValidInput(inputList) ? enableButton(button, inactiveButtonClass) : disableButton(button, inactiveButtonClass);
}

function hasValidInput(inputList) {
  return Array.from(inputList).every((input) => input.validity.valid)
}

/*

//если делать через some() (для себя):

function toggleButtonState(inputList, button, inactiveButtonClass) {
  hasValidInput(inputList) ? disableButton(button, inactiveButtonClass) : enableButton(button, inactiveButtonClass);
}

function hasInValid(inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid)
}

*/

function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass)
  button.disabled = false;
}

function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

//закончилась живая валивация, поэтому нам надо обращаться потом к конфигу 

//функция, отслеживающая инпуты на момент открытия попапа

function resetErrorForOpenPopup(form) {
  form.querySelectorAll(config.inputSelector).forEach((input) => {
    const errorTextElement = document.querySelector(`${config.invalidationErrorSelector}${input.name}`);
    if (!input.validity.valid) {
      hideInputError(input, errorTextElement, config.inputErrorClass, config.errorClass);
    }
  })
}