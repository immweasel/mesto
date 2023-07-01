import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import {
  initialCards,
  formEdit, 
  formAdd,
  formAvatar,
  editButton,
  addButton,
  avatarButton,
  selectorTemplate,
  popupProfileSelector,
  popupFigureSelector,
  listElementSelector,
  popupAddCardSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  configInfo,
  validationConfig
} from '../utils/constants.js';
import '../pages/index.css';

const userInfo = new UserInfo(configInfo);

const popupFigure = new PopupWithImage(popupFigureSelector);
popupFigure.setEventListeners()

const deletePopupCard = new PopupDeleteCard(popupDeleteSelector, (element) => {
  element.removeCard();
});

deletePopupCard.setEventListeners();

function createNewCard (cardData) {
  const card = new Card(cardData, selectorTemplate, popupFigure.open, deletePopupCard.open);
  return card.createCard();
}

const section = new Section({
  items: initialCards,
  renderer: (cardData) => { 
    section.addItem(createNewCard(cardData));
  }
}, listElementSelector)

section.renderItems();

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
  section.addItem(createNewCard(data));
  //section.renderer(data);
});

popupAddCard.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  document.querySelector(".profile__avatar").src = data.avatar;
});

popupAvatar.setEventListeners();

/*
Array.from(document.forms).forEach((item) => {
  const form = new FormValidator(validationConfig, item);
  const name = item.getAttribute('name');
  FormValidator[name] = form;
  form.enableValidation();
});
*/

function openAvatarPopup() {
  formAvatarValidator.resetErrorForOpenPopup()
  popupAvatar.open();
}

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

//создание экземпляра класса FormValidator для formAvatar и запуск валидации
const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();

editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
avatarButton.addEventListener("click", openAvatarPopup);

