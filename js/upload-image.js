import {disableEscHandling} from './util.js';
import {createUploadImageHandler} from './upload-img-listeners.js';
import {createValidation} from './upload-validation.js';
import {createScaleControlling} from './upload-scale-contol.js';
import {addEffectsControl} from './upload-effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const scaleContainer = uploadForm.querySelector('.img-upload__scale');
const decreaseScaleButton = scaleContainer.querySelector('.scale__control--smaller');
const increaseScaleButton = scaleContainer.querySelector('.scale__control--bigger');
const scaleControlValue = scaleContainer.querySelector('.scale__control--value');
const imageToUpload = uploadForm.querySelector('.img-upload__preview img');
const sliderControlContainer = uploadForm.querySelector('.effect-level');
const effectsList = uploadForm.querySelector('.effects__list');
const effectValue = uploadForm.querySelector('.effect-level__value');

disableEscHandling(hashTagInput);
disableEscHandling(commentField);

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

createValidation(hashTagInput, commentField, pristine);

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

createScaleControlling(scaleControlValue, imageToUpload, decreaseScaleButton, increaseScaleButton);

addEffectsControl(sliderControlContainer, effectValue, imageToUpload, effectsList);
