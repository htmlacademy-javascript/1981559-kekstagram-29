import {isEscapeKey} from "./util.js";

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');

const doAfterClose = () => {
  document.removeEventListener('keydown', onEscapeClick);
  cancelUploadButton.removeEventListener('click', doAfterClose);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

const onEscapeClick = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    doAfterClose();
  }
};

const onUploadButtonClick = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  cancelUploadButton.addEventListener('click', doAfterClose);
  document.addEventListener('keydown', onEscapeClick);
}

const openUploadOverlay = () => {
  onUploadButtonClick();
}

uploadImage.addEventListener('change', openUploadOverlay);

/*
Остановился на 5 пункте выполнения задания
Возможно можно узнать в нейросети
 */
