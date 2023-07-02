import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import {
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
} from '../utils/constants.js';
import '../pages/index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '1a325d4c-959b-42a2-8e6f-2cd070905828',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo(configInfo);

const popupFigure = new PopupWithImage(popupFigureSelector);
popupFigure.setEventListeners();

const deletePopupCard = new PopupDeleteCard(popupDeleteSelector, ({ element, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      element.removeCard();
      deletePopupCard.close();
    })
      .catch((error => console.error(`Ошибка при убирании карточки ${error}`)))
      .finally(() => deletePopupCard.setupDefaultText())
});

deletePopupCard.setEventListeners();

function createNewCard (cardData) {
  const card = new Card(cardData, selectorTemplate, popupFigure.open, deletePopupCard.open, (likeElement, cardId) => {
    if (likeElement.classList.contains("photo-grid__like_active")) {
      api.deleteLike(cardId)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch((error => console.error(`Ошибка при убирании лайка ${error}`)))
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch((error => console.error(`Ошибка при добавлении лайка ${error}`)))
    }
  });
  return card.createCard();
}

const section = new Section((element) => {
    section.addItemAppend(createNewCard(element));
}, listElementSelector)



const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, description: res.about, avatar: res.avatar });
      popupProfile.close();
    })
    .catch((error => console.error(`Ошибка при редактировании профиля ${error}`)))
    .finally(() => popupProfile.setupDefaultText())
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      section.addItemPrepend(createNewCard(dataCard))
      popupAddCard.close()
    })
      .catch((error => console.error(`Ошибка при создании новой карточки ${error}`)))
      .finally(() => popupAddCard.setupDefaultText())
});

popupAddCard.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setNewAvatar(data)
    .then(res => {
      console.log(res)
      userInfo.setUserInfo({ name: res.name, description: res.about, avatar: res.avatar });
      popupAvatar.close();
    })
      .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
      .finally(() => popupAvatar.setupDefaultText())
});

popupAvatar.setEventListeners();

function openAvatarPopup() {
  formAvatarValidator.resetErrorForOpenPopup()
  popupAvatar.open();
}

//открытие попапа для редактирования профиля
function openEditPopup() {
  formPersonalDataValidator.resetErrorForOpenPopup();
  popupProfile.setInputValue(userInfo.getUserInfo());
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

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id)
    userInfo.setUserInfo({ name: dataUser.name, description: dataUser.about, avatar: dataUser.avatar })
    section.renderItems(dataCard);
  })
  .catch((error) => console.error(`Ошибка при создании начальных данных страницы${error}`))