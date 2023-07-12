import {isEscapeKey} from "./util.js";

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');


const onEscapeClick = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscapeClick);
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const onImageClick = (evt) => {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  cancelUploadButton.addEventListener('click', () => {
    document.removeEventListener('keydown', onEscapeClick);
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', onEscapeClick);
}

uploadImage.addEventListener('click', onImageClick);
