import {isFocusedElement, checkRepeat} from './util.js';
import {createUploadImageHandler} from './upload-img-listeners.js';
import {MAX_AVAILABLE_HASHTAGS} from './data.js';

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

const checkHashtag = (hashtagElement) => hashtag.test(hashtagElement);

const checkMaxHashtags = () => {
  const inputArray = hashTagInput.value.trim().split(' ');
  return inputArray.length <= MAX_AVAILABLE_HASHTAGS;
};

const checkAllHashtags = () => {
  const inputArray = hashTagInput.value.trim().split(' ');
  return inputArray.every(checkHashtag);
};

const isHashtagRepeat = () => {
  const inputArray = hashTagInput.value.toLowerCase().trim().split(' ');
  return checkRepeat(inputArray);
};

pristine.addValidator(hashTagInput, checkMaxHashtags, `Указано больше ${MAX_AVAILABLE_HASHTAGS} хэштэгов`, 3, true);
pristine.addValidator(hashTagInput, checkAllHashtags, 'Проверьте правильность хэштегов', 2, true);
pristine.addValidator(hashTagInput, isHashtagRepeat, 'Хэштэги повторяются', 1, true);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


