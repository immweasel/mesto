const nameObject = document.querySelector(".profile__name"); //имя профиля
const descriptionObject = document.querySelector(".profile__description"); //описание профиля
const editObject = document.querySelector(".profile__edit"); //кнопка для редактирования профиля
const popupObject = document.querySelector(".popup"); //форма редактирования
const closeEditObject = document.querySelector(".popup__close_edit"); //кнопка закрытия формы редактирования
const closeAddObject = document.querySelector(".popup__close_add"); //кнопка закрытия формы добавления
let textNameObject = document.querySelector("#name"); //инпут имени профиля
let textDescriptionObject = document.querySelector("#description"); //инпут описания профиля
let placeNameObject = document.querySelector("#place-name"); //импут названия места
let placeLinkObject = document.querySelector("#place-link"); //импут ссылки на картинку места
const formEditObject = document.querySelector(".popup__form_edit"); 
const formAddObject = document.querySelector(".popup__form_add"); 
const cardTemplate = document.querySelector("#card-template").content;
const editPopup = document.querySelector(".popup__container_edit");
const addPopup = document.querySelector(".popup__container_add");
const addButton = document.querySelector(".profile__add");
const photoGrid = document.querySelector(".photo-grid");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard(name, link) {
  const firstCard = cardTemplate.querySelector(".photo-grid__item").cloneNode(true);
  firstCard.querySelector(".photo-grid__description").textContent = name;
  firstCard.querySelector(".photo-grid__photo").src = link;
  firstCard.querySelector(".photo-grid__photo").alt = name;
  photoGrid.prepend(firstCard);
}

initialCards.forEach(element => addCard(element.name, element.link));

function openPopupOverlay() {
  popupObject.classList.add("popup_opened");
}

function openEditPopup() {
  openPopupOverlay();
  editPopup.classList.add("popup__container_opened");
  const nameText = nameObject.textContent; //задаем и получаем текстовое содержимое
  const descriptionText = descriptionObject.textContent;
  textNameObject.value = nameText;
  textDescriptionObject.value = descriptionText;
}

function openAddPopup() {
  openPopupOverlay();
  addPopup.classList.add("popup__container_opened");
}

function closePopup() {
  popupObject.classList.remove("popup_opened");
  editPopup.classList.remove("popup__container_opened");
  addPopup.classList.remove("popup__container_opened");
}

function popupAddSubmit(evt) {
  evt.preventDefault();
  addCard(placeNameObject.value, placeLinkObject.value);
  closePopup();
}

function popupEditSubmit(evt) {
  evt.preventDefault();
  nameObject.textContent = textNameObject.value;
  descriptionObject.textContent = textDescriptionObject.value;
  closePopup();
}

editObject.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
closeAddObject.addEventListener("click", closePopup);
closeEditObject.addEventListener("click", closePopup);
formAddObject.addEventListener("submit", popupAddSubmit);
formEditObject.addEventListener("submit", popupEditSubmit);