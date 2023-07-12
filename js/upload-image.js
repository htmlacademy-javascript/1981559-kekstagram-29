import {isEscapeKey} from "./util.js";

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');


const createClosePictureHandle = (pictureContainer, closeButton) => {
  const onEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onEscapeClick);
      pictureContainer.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  return (evt) => {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    pictureContainer.classList.remove('hidden');
    closeButton.addEventListener('click', () => {
      document.removeEventListener('keydown', onEscapeClick);
      pictureContainer.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });
    document.addEventListener('keydown', onEscapeClick);
  }
}

const cancelUpload = createClosePictureHandle(uploadOverlay, cancelUploadButton);

uploadImage.addEventListener('click', cancelUpload);
