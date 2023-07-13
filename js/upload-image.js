import {createClosePictureHandle} from "./util.js";

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');

const openUploadOverlay = () => {
  const cancelUpload = createClosePictureHandle(uploadOverlay, cancelUploadButton);
  uploadForm.reset();
  return cancelUpload();
}

uploadImage.addEventListener('change', openUploadOverlay);
