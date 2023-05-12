const nameObj = document.querySelector(".profile__name"); //имя профиля
const descriptionObj = document.querySelector(".profile__description"); //описание профиля
const editObj = document.querySelector(".profile__edit"); //кнопка для редактирования профиля
const textNameObj = document.querySelector("#name"); //инпут имени профиля
const textDescriptionObj = document.querySelector("#description"); //инпут описания профиля
const placeNameObj = document.querySelector("#place-name"); //импут названия места
const placeLinkObj = document.querySelector("#place-link"); //импут ссылки на картинку места
const formEditObj = document.querySelector(".popup__form_edit"); //форма редактирования
const formAddObj = document.querySelector(".popup__form_add"); // форма добавления
const cardTemplate = document.querySelector("#card-template").content; //темплейт карточек
const addButton = document.querySelector(".profile__add");
const photoGrid = document.querySelector(".photo-grid"); //секция фотогрид
const popupEditObj = document.querySelector(".popup_type_edit"); //попап редактирования
const popupAddObj = document.querySelector(".popup_type_add"); //попап добавления
const closeEditObj = popupEditObj.querySelector(".popup__close"); //кнопка закрытия формы редактирования
const closeAddObj = popupAddObj.querySelector(".popup__close"); //кнопка закрытия формы добавления
const figurePopup = document.querySelector(".popup_type_figure");
const closeFigureObj = figurePopup.querySelector(".popup__close");
const figurePopupPhoto = figurePopup.querySelector(".popup__figure-photo");
const figurePopupCaption = figurePopup.querySelector(".popup__figure-caption");
const escapeButton = 27;

//константы для валидации
const submitButtonFromProfileForm = formEditObj.querySelector(".popup__save");
const inputFromProfileForm = formEditObj.querySelectorAll(".popup__text");
const submitButtonFromAddForm = formAddObj.querySelector(".popup__save");
const inputFromAddForm = formAddObj.querySelectorAll(".popup__text");

function popupEditSubmit(evt) {
  evt.preventDefault();
  nameObj.textContent = textNameObj.value;
  descriptionObj.textContent = textDescriptionObj.value;
  closePopup(popupEditObj);
}

//открытие попапа для редактирования профиля
function openEditPopup() {
  openPopupOverlay(popupEditObj);
  formEditObj.reset();
  resetErrorForOpenPopup(formEditObj); //очищаем при следующем открытии попапа
  const nameText = nameObj.textContent; //задаем и получаем текстовое содержимое
  const descriptionText = descriptionObj.textContent;
  textNameObj.value = nameText;
  textDescriptionObj.value = descriptionText;
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
  if (evt.keyCode === escapeButton) {
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
  window.removeEventListener("keydown", closePopupByEsc);
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
    name: placeNameObj.value,
    link: placeLinkObj.value
  }
  prependElementInContainer(photoGrid, (createCard(constants)));
  closePopup(popupAddObj);
}

//открытие попапа карточек
function openAddPopup() {
  formAddObj.reset();
  resetErrorForOpenPopup(formAddObj);
  openPopupOverlay(popupAddObj);
  toggleButtonState(inputFromAddForm, submitButtonFromAddForm, config.inactiveButtonClass); //очищение ошибок при открытии
}

editObj.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
closeEditObj.addEventListener("click", () => closePopup(popupEditObj));
closeAddObj.addEventListener("click", () => closePopup(popupAddObj));
closeFigureObj.addEventListener("click", () => closePopup(figurePopup));
formEditObj.addEventListener("submit", popupEditSubmit);
formAddObj.addEventListener("submit", popupAddSubmit);
popupEditObj.addEventListener("click", (e) => closePopupByOverlayClick(e));
popupAddObj.addEventListener("click", (e) => closePopupByOverlayClick(e));
figurePopup.addEventListener("click", (e) => closePopupByOverlayClick(e));