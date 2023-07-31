import {disableEscHandling, isEscapeKey} from './util.js';
import {createValidation} from './upload-validation.js';
import {addEffectsSetting} from './upload-effects.js';
import {addScalingController} from './upload-scale-image.js';
import {pristineDefaultConfig, SubmitButtonText, FILE_TYPES} from './constats.js';
import {showError} from './upload-error.js';
import {showSuccess} from './upload-success.js';
import {sendData} from './load-data.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const scaleContainer = uploadForm.querySelector('.img-upload__scale');
const increaseScaleButton = scaleContainer.querySelector('.scale__control--bigger');
const decreaseScaleButton = scaleContainer.querySelector('.scale__control--smaller');
const scaleControlInput = scaleContainer.querySelector('.scale__control--value');
const imageToUpload = uploadForm.querySelector('.img-upload__preview img');
const sliderWrapper = uploadForm.querySelector('.effect-level');
const sliderControlContainer = uploadForm.querySelector('.effect-level__slider');
const effectsList = uploadForm.querySelector('.effects__list');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const uploadWrapper = uploadForm.querySelector('.img-upload__wrapper');

addScalingController(scaleControlInput, imageToUpload, increaseScaleButton, decreaseScaleButton);

const pristine = new Pristine(uploadForm, pristineDefaultConfig);

let clearUpload = () => {};
const cancelUploadByKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    clearUpload();
  }
};

const uploadImage = () => {
  const file = uploadImageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imageToUpload.src = URL.createObjectURL(file);
  }

  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', cancelUploadByKeydown);
  imageToUpload.style.filter = 'none';
  imageToUpload.style.transform = 'none';

  const isSliderControlShown = sliderControlContainer.classList.contains('hidden') === false;
  if (isSliderControlShown) {
    sliderControlContainer.classList.add('hidden');
    sliderWrapper.classList.add('hidden');
  }
};

clearUpload = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', cancelUploadByKeydown);
  uploadForm.reset();
  pristine.reset();
};

uploadImageInput.addEventListener('change', uploadImage);
cancelUploadButton.addEventListener('click', clearUpload);

noUiSlider.create(sliderControlContainer, {
  connect: 'lower',
  range: {
    'min': 0,
    'max': 0
  },
  start: 0,
  step: 0,
  format: {
    to(value) {
      if (Number.isInteger(value)) {
        return value.toFixed(2);
      }
      return value.toFixed(2);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});

addEffectsSetting(sliderControlContainer, imageToUpload, effectsList, sliderWrapper);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const initUploadImageForm = () => {
  disableEscHandling(hashTagInput);
  disableEscHandling(commentField);

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createValidation(hashTagInput, commentField, pristine);
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(
          () => {
            showSuccess();
          }
        )
        .catch(
          (err) => {
            showError(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export {
  initUploadImageForm,
  uploadWrapper,
  cancelUploadByKeydown,
  uploadOverlay,
  clearUpload,
  uploadImageInput,
  uploadForm
};
