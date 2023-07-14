import {isFocusedElement} from './util.js';
import {createUploadImageHandler} from './upload-img-listeners.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

isFocusedElement(hashTagInput);
isFocusedElement(commentField);

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const defaultConfig = {
  classTo: 'img-upload__form',
  errorClass: 'img-upload__form--error',
  successClass: 'img-upload__form--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__help'
};

const pristine = new Pristine(uploadForm, defaultConfig);

const uploadImage = createUploadImageHandler(uploadOverlay, uploadForm, pristine, cancelUploadButton);

uploadImageInput.addEventListener('change', uploadImage);

const checkHashtag = (hashtagElement) => {
  if (hashtag.test(hashtagElement)) {
    return true;
  }
  return false;
};

const checkAllHashtags = () => {
  const inputArray = hashTagInput.value.trim().split(' ');
  return inputArray.every(checkHashtag);
};

pristine.addValidator(hashTagInput, checkAllHashtags, 'Проверьте правильность хэштегов');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


