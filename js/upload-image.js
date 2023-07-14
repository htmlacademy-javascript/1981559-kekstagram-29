import {isEscapeKey, isFocusedElement} from "./util.js";

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const doAfterClose = () => {
  document.removeEventListener('keydown', onEscapeClick);
  cancelUploadButton.removeEventListener('click', doAfterClose);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
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

uploadImage.addEventListener('change', onUploadButtonClick);

isFocusedElement(hashTagInput);
isFocusedElement(commentField);


// const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
// // console.log(hashtag.test('#azs@'))
//
// const pristine = new Pristine(uploadForm);
//
// const checkHashtag = () => {
//   return hashtag.test(hashTagInput.value);
// }
//
// pristine.addValidator(hashTagInput, checkHashtag, 'неверный hashtag');
//
// uploadForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// });

