import {disableEscHandling, checkRepeat} from './util.js';
import {createUploadImageHandler} from './upload-img-listeners.js';
import {MAX_AVAILABLE_HASHTAGS, MAX_COMMENT_WORDS} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

disableEscHandling(hashTagInput);
disableEscHandling(commentField);

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
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
  if (inputArray.length <= 1 && inputArray[0] === '') {
    return true;
  }
  return inputArray.every(checkHashtag);
};

const isHashtagRepeat = () => {
  const inputArray = hashTagInput.value.toLowerCase().trim().split(' ');
  return checkRepeat(inputArray);
};

const checkCommentFieldLength = () => commentField.value.length <= MAX_COMMENT_WORDS;

pristine.addValidator(hashTagInput, checkMaxHashtags, `Указано больше ${MAX_AVAILABLE_HASHTAGS} хэштэгов`, 3, true);
pristine.addValidator(hashTagInput, checkAllHashtags, 'Хэштэги должны состоять из букв и/или цифр', 2, true);
pristine.addValidator(hashTagInput, isHashtagRepeat, 'Хэштэги повторяются', 1, true);
pristine.addValidator(commentField, checkCommentFieldLength, `Разрешено не более ${MAX_COMMENT_WORDS} символов`);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.valueOf();
  // const isValid = pristine.validate();
  // if (isValid) {
  //   console.log('Можно отправлять');
  // } else {
  //   console.log('Форма невалидна');
  // }
});


