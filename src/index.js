import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import {
  initialCards,
  formEdit, 
  formAdd,
  editButton,
  addButton,
  selectorTemplate,
  popupProfileSelector,
  popupFigureSelector,
  listElementSelector,
  popupAddCardSelector,
  configInfo,
  validationConfig
} from './scripts/utils/constants.js';
import '../src/pages/index.css';

const userInfo = new UserInfo(configInfo);

const popupFigure = new PopupWithImage(popupFigureSelector);
popupFigure.setEventListeners()

const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, selectorTemplate, popupFigure.open);
    return card.createCard();
  }
}, listElementSelector)

section.addCard();

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValue());
  popupProfile.close();
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValue()));
  popupAddCard.close();
});

popupAddCard.setEventListeners();

//открытие попапа для редактирования профиля
function openEditPopup() {
  formPersonalDataValidator.resetErrorForOpenPopup();
  popupProfile.setInputValue(userInfo.getUserUnfo());
  popupProfile.open();
};

//открытие попапа карточек
function openAddPopup() {
  formAdd.reset();
  formAddCardValidator.resetErrorForOpenPopup();
  popupAddCard.open();
}

//создание экземпляра класса FormValidator для formEdit и запуск валидации
const formPersonalDataValidator = new FormValidator(validationConfig, formEdit);
formPersonalDataValidator.enableValidation();

//создание экземпляра класса FormValidator для formAdd и запуск валидации
const formAddCardValidator = new FormValidator(validationConfig, formAdd);
formAddCardValidator.enableValidation();

editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);

