const nameObject = document.querySelector(".profile__name"); //имя профиля
const descriptionObject = document.querySelector(".profile__description"); //описание профиля
const editObject = document.querySelector(".profile__edit"); //кнопка для редактирования профиля
const textNameObject = document.querySelector("#name"); //инпут имени профиля
const textDescriptionObject = document.querySelector("#description"); //инпут описания профиля
const placeNameObject = document.querySelector("#place-name"); //импут названия места
const placeLinkObject = document.querySelector("#place-link"); //импут ссылки на картинку места
const formEditObject = document.querySelector(".popup__form_edit"); //форма редактирования
const formAddObject = document.querySelector(".popup__form_add"); // форма добавления
const cardTemplate = document.querySelector("#card-template").content; //темплейт карточек
const addButton = document.querySelector(".profile__add");
const photoGrid = document.querySelector(".photo-grid"); //секция фотогрид
const popupEditObject = document.querySelector(".popup_type_edit"); //попап редактирования
const popupAddObject = document.querySelector(".popup_type_add"); //попап добавления
const closeEditObject = popupEditObject.querySelector(".popup__close"); //кнопка закрытия формы редактирования
const closeAddObject = popupAddObject.querySelector(".popup__close"); //кнопка закрытия формы добавления
const figurePopup = document.querySelector(".popup_type_figure");
const closeFigureObject = figurePopup.querySelector(".popup__close");
const figurePopupPhoto = figurePopup.querySelector(".popup__figure-photo");
const figurePopupCaption = figurePopup.querySelector(".popup__figure-caption");

//константы для валидации
const submitButtonFromProfileForm = formEditObject.querySelector(".popup__save");
const inputFromProfileForm = formEditObject.querySelectorAll(".popup__text");
const submitButtonFromAddForm = formAddObject.querySelector(".popup__save");
const inputFromAddForm = formAddObject.querySelectorAll(".popup__text");

function popupEditSubmit(evt) {
  evt.preventDefault();
  nameObject.textContent = textNameObject.value;
  descriptionObject.textContent = textDescriptionObject.value;
  closePopup(popupEditObject);
}

//открытие попапа для редактирования профиля
function openEditPopup() {
  openPopupOverlay(popupEditObject);
  formEditObject.reset();
  resetErrorForOpenPopup(formEditObject); //очищаем при следующем открытии попапа
  const nameText = nameObject.textContent; //задаем и получаем текстовое содержимое
  const descriptionText = descriptionObject.textContent;
  textNameObject.value = nameText;
  textDescriptionObject.value = descriptionText;
  toggleButtonState(inputFromProfileForm, submitButtonFromProfileForm, config.inactiveButtonClass);
}

function openFigurePopup(link, name) {
  openPopupOverlay(figurePopup);
  figurePopupPhoto.src = link;
  figurePopupCaption.alt = name;
  figurePopupCaption.textContent = name;
}

//закрытие на ESC
const formsArray = Array.from(document.querySelectorAll(".popup"))

function closePopupByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupByEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopupOverlay(popupObj) {
  window.addEventListener("keydown", closePopupByEsc);
  popupObj.classList.add("popup_opened");
}

function closePopup(popupObj) {
  popupObj.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByEsc)
}

function likeOnClick (object) {
  object.classList.toggle("photo-grid__like_active");
}

function deleteClosestOnClick (event, elementSelector) {
  event.target.closest(elementSelector).remove();
}

function createCard(object) {
  const firstCard = cardTemplate.querySelector(".photo-grid__item").cloneNode(true);
  const cardPhoto = firstCard.querySelector(".photo-grid__photo");
  cardPhoto.alt = object.name;
  cardPhoto.src = object.link;
  firstCard.querySelector(".photo-grid__description").textContent = object.name;
  const deleteButton = firstCard.querySelector(".photo-grid__delete");
  const likeButton = firstCard.querySelector(".photo-grid__like");
  cardPhoto.addEventListener("click", () => openFigurePopup(object.link, object.name));
  likeButton.addEventListener("click", () => likeOnClick(likeButton));
  deleteButton.addEventListener("click", event => deleteClosestOnClick(event, ".photo-grid__item"));

  return firstCard
}

initialCards.forEach(element => prependElementInContainer(photoGrid, createCard(element)));

function prependElementInContainer(container, element) {
  container.prepend(element);
}

function popupAddSubmit(evt) {
  evt.preventDefault();
  const constants = {
    name: placeNameObject.value,
    link: placeLinkObject.value
  }
  prependElementInContainer(photoGrid, (createCard(constants)));
  closePopup(popupAddObject);
}

//открытие попапа карточек
function openAddPopup() {
  formAddObject.reset();
  resetErrorForOpenPopup(formAddObject);
  openPopupOverlay(popupAddObject);
  toggleButtonState(inputFromAddForm, submitButtonFromAddForm, config.inactiveButtonClass); //очищение ошибок при открытии
}

editObject.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
closeEditObject.addEventListener("click", () => closePopup(popupEditObject));
closeAddObject.addEventListener("click", () => closePopup(popupAddObject));
closeFigureObject.addEventListener("click", () => closePopup(figurePopup));
formEditObject.addEventListener("submit", popupEditSubmit);
formAddObject.addEventListener("submit", popupAddSubmit);
popupEditObject.addEventListener("click", (e) => closePopupByOverlayClick(e));
popupAddObject.addEventListener("click", (e) => closePopupByOverlayClick(e));
figurePopup.addEventListener("click", (e) => closePopupByOverlayClick(e));