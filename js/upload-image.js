import {disableEscHandling} from './util.js';
import {createUploadImageHandler} from './upload-img-listeners.js';
import {createValidation} from './upload-validation.js';
import {createScaleControlling} from './upload-scale-contol.js';
import {addEffectsControl} from './upload-effects.js';
import {sendData} from './load-data.js';

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
const submitButton = uploadForm.querySelector('.img-upload__submit');
const uploadWrapper = uploadForm.querySelector('.img-upload__wrapper');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};


const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__help'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const initUploadImageForm = () => {
  createScaleControlling(scaleControlValue, imageToUpload, decreaseScaleButton, increaseScaleButton);
  addEffectsControl(sliderControlContainer, effectValue, imageToUpload, effectsList);

  disableEscHandling(hashTagInput);
  disableEscHandling(commentField);
  const pristine = new Pristine(uploadForm, defaultConfig);

  const uploadImage = createUploadImageHandler(uploadOverlay, uploadForm, pristine, cancelUploadButton);

  uploadImageInput.addEventListener('change', uploadImage);

  createValidation(hashTagInput, commentField, pristine);

  const showSuccess = () => {
    const successElement = successTemplate.cloneNode(true);
    const successButton = successElement.querySelector('.success__button');
    uploadWrapper.classList.add('hidden');

    const removeSuccessMessage = () => {
      successButton.removeEventListener('click', removeSuccessMessage);
      uploadWrapper.classList.remove('hidden');
      successElement.remove();
    };

    successButton.addEventListener('click', removeSuccessMessage);

    uploadOverlay.appendChild(successElement);
  };

  const showError = (message) => {
    const errorElement = errorTemplate.cloneNode(true);
    const errorTitle = errorElement.querySelector('.error__title');
    const errorButton = errorElement.querySelector('.error__button');
    errorTitle.textContent = message;
    uploadWrapper.classList.add('hidden');

    const removeErrorMessage = () => {
      errorButton.removeEventListener('click', removeErrorMessage);
      uploadWrapper.classList.remove('hidden');
      errorElement.remove();
    };

    errorButton.addEventListener('click', removeErrorMessage);

    uploadOverlay.appendChild(errorElement);
  };

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

export {initUploadImageForm};
