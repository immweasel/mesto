const nameObject = document.querySelector('.profile__name'); //имя профиля
const descriptionObject = document.querySelector('.profile__description'); //описание профиля

const nameText = nameObject.textContent; //задаем и получаем текстовое содержимое
const descriptionText = descriptionObject.textContent;

const editObject = document.querySelector('.profile__edit') //кнопка для редактирования профиля
const popupObject = document.querySelector('.popup') //форма редактирования
const closeObject = document.querySelector('.popup__close') //кнопка закрытия формы редактирования
const textNameObject = document.querySelector('#name') //инпут имени профиля
const textDescriptionObject = document.querySelector('#description') //инпут описания профиля
const saveObject = document.querySelector('.popup__save') //кнопка для сохранения изменений

function openPopup() {
  popupObject.classList.add('popup_opened');
}

function closePopup() {
	popupObject.classList.remove('popup_opened');
}

function popupSubmit(evt) {
	evt.preventDefault();
	nameObject.textContent = textNameObject.value;
	descriptionObject.textContent = textDescriptionObject.value;
	closePopup(); 
}

editObject.addEventListener('click', openPopup)
closeObject.addEventListener('click', closePopup)
saveObject.addEventListener('click', popupSubmit)