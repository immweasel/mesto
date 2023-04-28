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
const addButton = document.querySelector(".profile__add"); //кнопка редактирования профиля
const photoGrid = document.querySelector(".photo-grid"); //секция фотогрид
const popupEditObject = document.querySelector(".popup_type_edit"); //попап редактирования
const popupAddObject = document.querySelector(".popup_type_add"); //попап добавления
const closeEditObject = popupEditObject.querySelector(".popup__close"); //кнопка закрытия формы редактирования
const closeAddObject = popupAddObject.querySelector(".popup__close"); //кнопка закрытия формы добавления
const figurePopup = document.querySelector(".popup_type_figure");
const closeFigureObject = figurePopup.querySelector(".popup__close");
const figurePopupPhoto = figurePopup.querySelector(".popup__figure-photo");
const figurePopupCaption = figurePopup.querySelector(".popup__figure-caption");

function popupEditSubmit(evt) {
  evt.preventDefault();
  nameObject.textContent = textNameObject.value;
  descriptionObject.textContent = textDescriptionObject.value;
  closePopup(popupEditObject);
}

function openEditPopup() {
  openPopupOverlay(popupEditObject);
  const nameText = nameObject.textContent; //задаем и получаем текстовое содержимое
  const descriptionText = descriptionObject.textContent;
  textNameObject.value = nameText;
  textDescriptionObject.value = descriptionText;
}

function openFigurePopup(link, name) {
  openPopupOverlay(figurePopup);
  figurePopupPhoto.src = link;
  figurePopupCaption.alt = name;
  figurePopupCaption.textContent = name;
}

function openPopupOverlay(popupObj) {
  popupObj.classList.add("popup_opened");
}

function closePopup(popupObj) {
  popupObj.classList.remove("popup_opened");
}

function likeOnClick (object) {
  object.classList.toggle("photo-grid__like_active");
}

function deleteOnClick (event) {
  event.target.parentNode.remove();
}

function createCard(name, link) { //извините пожалуйста, но я пока что не знаю ничего про объекты и не знаю, как заменить всё на один параметр
  const firstCard = cardTemplate.querySelector(".photo-grid__item").cloneNode(true);
  const cardPhoto = firstCard.querySelector(".photo-grid__photo");
  cardPhoto.alt = name;
  cardPhoto.src = link;
  firstCard.querySelector(".photo-grid__description").textContent = name;
  const deleteButton = firstCard.querySelector(".photo-grid__delete");
  const likeButton = firstCard.querySelector(".photo-grid__like");
  cardPhoto.addEventListener("click", () => openFigurePopup(link, name));
  likeButton.addEventListener("click", () => likeOnClick(likeButton));
  deleteButton.addEventListener("click", event => deleteOnClick(event));

  return firstCard
}

initialCards.forEach(element => photoGrid.prepend(createCard(element.name, element.link)));

function popupAddSubmit(evt) {
  evt.preventDefault();
  photoGrid.prepend(createCard(placeNameObject.value, placeLinkObject.value));
  closePopup(popupAddObject);
}

function openAddPopup() {
  placeNameObject.value = "";
  placeLinkObject.value = "";
  openPopupOverlay(popupAddObject);
}

editObject.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
closeEditObject.addEventListener("click", () => closePopup(popupEditObject));
closeAddObject.addEventListener("click", () => closePopup(popupAddObject));
closeFigureObject.addEventListener("click", () => closePopup(figurePopup));
formEditObject.addEventListener("submit", popupEditSubmit);
formAddObject.addEventListener("submit", popupAddSubmit);