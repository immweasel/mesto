import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
} from '../utils/constants.js';
import '../pages/index.css';

const userInfo = new UserInfo(configInfo);

const popupFigure = new PopupWithImage(popupFigureSelector);
popupFigure.setEventListeners()

const section = new Section({
  items: initialCards,
  renderer: (cardData) => { 
    const card = new Card(cardData, selectorTemplate, popupFigure.open);
    section.addItem(card.createCard());
  }
}, listElementSelector)

section.renderItems();

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
  section.renderer(data);
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

