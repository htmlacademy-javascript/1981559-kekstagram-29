import {isEscapeKey, isFocusedElement} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const onEscapeClick = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    doAfterClose();
  }
};

const doAfterClose = () => {
  document.removeEventListener('keydown', onEscapeClick);
  cancelUploadButton.removeEventListener('click', doAfterClose);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
};

const onUploadButtonClick = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  cancelUploadButton.addEventListener('click', doAfterClose);
  document.addEventListener('keydown', onEscapeClick);
};

uploadImage.addEventListener('change', onUploadButtonClick);

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


