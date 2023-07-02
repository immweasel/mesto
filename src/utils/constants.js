const initialCards = [ 
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formEdit = document.querySelector(".popup__form_edit"); //форма редактирования
const formAdd = document.querySelector(".popup__form_add"); // форма добавления
const formAvatar = document.querySelector(".popup__form_avatar");

const editButton = document.querySelector(".profile__edit"); //кнопка для редактирования профиля
const addButton = document.querySelector(".profile__add"); //кнопки сохранить и создать
const avatarButton = document.querySelector(".profile__avatar_button");
const avatarElement = document.querySelector(".profile__avatar");

const selectorTemplate = "#card-template"; //темплейт карточек
const popupProfileSelector = ".popup_type_edit";
const popupFigureSelector = ".popup_type_figure";
const listElementSelector = ".photo-grid";
const popupAddCardSelector = ".popup_type_add";
const popupAvatarSelector = ".popup_type_avatar";
const popupDeleteSelector = ".popup_type_delete";


const configInfo = {
  nameOfProfileSelector: ".profile__name",
  descriptionOfProfileSelector: ".profile__description",
  profileAvatar: ".profile__avatar"
};

const validationConfig = {
  allforms: document.forms,
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save_add",

  invalidationErrorSelector: ".popup__invalid_type_",

  inactiveButtonClass: "popup__save_add_disabled",
  inputErrorClass: "popup__text_invalid"
}

export {
  initialCards,
  formEdit, 
  formAdd,
  formAvatar,
  editButton,
  addButton,
  avatarButton,
  avatarElement,
  selectorTemplate,
  popupProfileSelector,
  popupFigureSelector,
  listElementSelector,
  popupAddCardSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  configInfo,
  validationConfig
};