const nameOfProfile = document.querySelector(".profile__name"); //h1 имя профиля
const descriptionOfProfile = document.querySelector(".profile__description"); //p описание профиля
const editButton = document.querySelector(".profile__edit"); //кнопка для редактирования профиля
const inputNameOfProfile = document.querySelector("#name"); //инпут имени профиля
const inputDescriptionOfProfile = document.querySelector("#description"); //инпут описания профиля
const inputNameOfPlace = document.querySelector("#place-name"); //импут названия места
const inputLinkOfPlace = document.querySelector("#place-link"); //импут ссылки на картинку места
const formEdit = document.querySelector(".popup__form_edit"); //форма редактирования
const formAdd = document.querySelector(".popup__form_add"); // форма добавления
const cardTemplate = document.querySelector("#card-template").content; //темплейт карточек
const addButton = document.querySelector(".profile__add"); //кнопки сохранить и создать
const photoGrid = document.querySelector(".photo-grid"); //секция фотогрид
const popupEdit = document.querySelector(".popup_type_edit"); //попап редактирования
const popupAdd = document.querySelector(".popup_type_add"); //попап добавления
const closeButtonEdit = popupEdit.querySelector(".popup__close"); //кнопка закрытия формы редактирования
const closeButtonAdd = popupAdd.querySelector(".popup__close"); //кнопка закрытия формы добавления
const figurePopup = document.querySelector(".popup_type_figure");
const closeButtonFigure = figurePopup.querySelector(".popup__close");
const figurePopupPhoto = figurePopup.querySelector(".popup__figure-photo");
const figurePopupCaption = figurePopup.querySelector(".popup__figure-caption");
const escapeButton = 27;

//константы для валидации
const submitButtonFromProfileForm = formEdit.querySelector(".popup__save");
const inputFromProfileForm = formEdit.querySelectorAll(".popup__text");
const submitButtonFromAddForm = formAdd.querySelector(".popup__save");
const inputFromAddForm = formAdd.querySelectorAll(".popup__text");

function popupEditSubmit(evt) {
  evt.preventDefault();
  nameOfProfile.textContent = inputNameOfProfile.value;
  descriptionOfProfile.textContent = inputDescriptionOfProfile.value;
  closePopup(popupEdit);
}

//открытие попапа для редактирования профиля
function openEditPopup() {
  openPopupOverlay(popupEdit);
  formEdit.reset();
  resetErrorForOpenPopup(formEdit); //очищаем при следующем открытии попапа
  const nameText = nameOfProfile.textContent; //задаем и получаем текстовое содержимое
  const descriptionText = descriptionOfProfile.textContent;
  inputNameOfProfile.value = nameText;
  inputDescriptionOfProfile.value = descriptionText;
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
    name: inputNameOfPlace.value,
    link: inputLinkOfPlace.value
  }
  prependElementInContainer(photoGrid, (createCard(constants)));
  closePopup(popupAdd);
}

//открытие попапа карточек
function openAddPopup() {
  formAdd.reset();
  resetErrorForOpenPopup(formAdd);
  openPopupOverlay(popupAdd);
  toggleButtonState(inputFromAddForm, submitButtonFromAddForm, config.inactiveButtonClass); //очищение ошибок при открытии
}

editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
closeButtonEdit.addEventListener("click", () => closePopup(popupEdit));
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
closeButtonFigure.addEventListener("click", () => closePopup(figurePopup));
formEdit.addEventListener("submit", popupEditSubmit);
formAdd.addEventListener("submit", popupAddSubmit);
popupEdit.addEventListener("click", (e) => closePopupByOverlayClick(e));
popupAdd.addEventListener("click", (e) => closePopupByOverlayClick(e));
figurePopup.addEventListener("click", (e) => closePopupByOverlayClick(e));