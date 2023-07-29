import {disableEscHandling, isEscapeKey} from './util.js';
import {createValidation} from './upload-validation.js';
import {addEffectsSetting} from './upload-effects.js';
import {addScalingController} from './upload-scale-image.js';
import {pristineDefaultConfig, SubmitButtonText} from './constats.js';
import {showError} from './upload-error.js';
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
const sliderControlContainer = uploadForm.querySelector('.effect-level');
const effectsList = uploadForm.querySelector('.effects__list');
const effectValue = uploadForm.querySelector('.effect-level__value').value;
const submitButton = uploadForm.querySelector('.img-upload__submit');
const uploadWrapper = uploadForm.querySelector('.img-upload__wrapper');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

addScalingController(scaleControlInput, imageToUpload, increaseScaleButton, decreaseScaleButton);

const pristine = new Pristine(uploadForm, pristineDefaultConfig);
createValidation(hashTagInput, commentField, pristine);

let clearUpload = () => {};
const cancelUploadByKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    clearUpload();
  }
};

const uploadImage = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', cancelUploadByKeydown);
  imageToUpload.style.filter = 'none';
  imageToUpload.style.transform = 'none';

  const isSliderControlShown = sliderControlContainer.classList.contains('hidden') === false;
  if (isSliderControlShown) {
    sliderControlContainer.classList.add('hidden');
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

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');
  uploadWrapper.classList.add('hidden');

  const removeSuccessMessage = () => {
    successButton.removeEventListener('click', removeSuccessMessage);
    uploadWrapper.classList.remove('hidden');
    successElement.remove();
    uploadImageInput.value = '';
    clearUpload();
  };

  successButton.addEventListener('click', removeSuccessMessage);

  uploadOverlay.appendChild(successElement);
};

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
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});

addEffectsSetting(sliderControlContainer, effectValue, imageToUpload, effectsList);

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
    } else {
      showError('Форма не валидна');
    }
  });
};

export {initUploadImageForm, uploadWrapper, cancelUploadByKeydown, uploadOverlay};
