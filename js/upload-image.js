import {disableEscHandling, isEscapeKey} from './util.js';
import {createValidation} from './upload-validation.js';
// import {addEffectsControl} from './upload-effects.js';
import {sendData} from './load-data.js';
import {SCALE_IMAGE_DEFAULT, SCALE_IMAGE_MAX, SCALE_IMAGE_MIN, SCALE_IMAGE_STEP} from './constats.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const scaleContainer = uploadForm.querySelector('.img-upload__scale');
const increaseScaleButton = scaleContainer.querySelector('.scale__control--bigger');
const decreaseScaleButton = scaleContainer.querySelector('.scale__control--smaller');
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

const transformImage = (scalableImage, scalingValue) => {
  const percentToMath = 100;
  scalableImage.style.transform = `scale(${scalingValue / percentToMath})`;
};

scaleControlValue.value = `${SCALE_IMAGE_DEFAULT}%`;
let currentScaleValue = parseInt(scaleControlValue.value, 10);
transformImage(imageToUpload, currentScaleValue);

const decreaseValue = () => {
  if (currentScaleValue > SCALE_IMAGE_MIN) {
    currentScaleValue -= SCALE_IMAGE_STEP;
    scaleControlValue.value = `${currentScaleValue}%`;
    transformImage(imageToUpload, currentScaleValue);
  }
};

const increaseValue = () => {
  if (currentScaleValue < SCALE_IMAGE_MAX) {
    currentScaleValue += SCALE_IMAGE_STEP;
    scaleControlValue.value = `${currentScaleValue}%`;
    transformImage(imageToUpload, currentScaleValue);
  }
};

increaseScaleButton.addEventListener('click', increaseValue);
decreaseScaleButton.addEventListener('click', decreaseValue);

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__help'
};

const pristine = new Pristine(uploadForm, defaultConfig);
createValidation(hashTagInput, commentField, pristine);

let clearUpload = () => {};
const cancelUploadByKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    clearUpload();
  }
};

const uploadImage = () => {
  currentScaleValue = SCALE_IMAGE_DEFAULT;
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

const showError = (message) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorInnerContainer = errorElement.querySelector('.error__inner');
  const errorTitle = errorElement.querySelector('.error__title');
  const errorButton = errorElement.querySelector('.error__button');
  errorTitle.textContent = message;
  uploadWrapper.classList.add('hidden');
  document.removeEventListener('keydown', cancelUploadByKeydown);
  let returnToFormOnEscapeClick = () => {};

  const removeErrorMessage = () => {
    errorButton.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', returnToFormOnEscapeClick);
    document.addEventListener('keydown', cancelUploadByKeydown);
    uploadWrapper.classList.remove('hidden');
    errorElement.remove();
  };

  returnToFormOnEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      removeErrorMessage();
    }
  };

  document.addEventListener('keydown', returnToFormOnEscapeClick);

  const onOutsideErrorContainerClick = (evt) => {
    const outsideErrorContainerClick = evt.composedPath().includes(errorInnerContainer) === false;
    if (outsideErrorContainerClick) {
      removeErrorMessage();
      document.removeEventListener('click', onOutsideErrorContainerClick);
    }
  };

  document.addEventListener('click', onOutsideErrorContainerClick);
  errorButton.addEventListener('click', removeErrorMessage);

  uploadOverlay.appendChild(errorElement);
};

// addEffectsControl(sliderControlContainer, effectValue, imageToUpload, effectsList);
let selectedEffectValueName = '';
const createNoUiSlider = (isSliderVisibleState, minValue, maxValue, start, step, filter, unit = '') => {
  if (isSliderVisibleState) {
    sliderControlContainer.classList.remove('hidden');
    noUiSlider.create(sliderControlContainer, {
      range: {
        min: minValue,
        max: maxValue,
      },
      start: start,
      step: step,
      connect: 'lower',
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

    sliderControlContainer.noUiSlider.on('update', () => {
      effectValue.value = sliderControlContainer.noUiSlider.get();
      imageToUpload.style.filter = `${filter}(${effectValue.value}${unit})`;
    });
  }
};


const onEffectClick = (evt) => {
  const selectedEffect = evt.target.closest('.effects__radio');
  if (selectedEffect !== null && selectedEffectValueName !== selectedEffect.getAttribute('id')) {
    const isSliderHiddenState = sliderControlContainer.classList.contains('hidden');
    const sliderShownState = !isSliderHiddenState;

    if (sliderShownState) {
      sliderControlContainer.noUiSlider.destroy();
      sliderControlContainer.classList.add('hidden');
    }

    if (selectedEffect) {
      const nameOfEffect = selectedEffect.getAttribute('id');

      switch (nameOfEffect) {
        case 'effect-none':
          sliderControlContainer.classList.add('hidden');
          imageToUpload.style.filter = 'none';
          effectValue.value = '';
          selectedEffectValueName = 'effect-none';
          break;

        case 'effect-chrome':
          createNoUiSlider(isSliderHiddenState, 0, 1, 1, 0.1, 'grayscale');
          selectedEffectValueName = 'effect-chrome';
          break;

        case 'effect-sepia':
          createNoUiSlider(isSliderHiddenState, 0, 1, 1, 0.1, 'sepia');
          selectedEffectValueName = 'effect-sepia';
          break;

        case 'effect-marvin':
          createNoUiSlider(isSliderHiddenState, 0, 100, 100, 1, 'invert', '%');
          break;

        case 'effect-phobos':
          createNoUiSlider(isSliderHiddenState, 0, 3, 3, 0.1, 'blur', 'px');
          break;

        case 'effect-heat':
          createNoUiSlider(isSliderHiddenState, 1, 3, 3,0.1, 'brightness');
          break;
      }
    }
  }
};

effectsList.addEventListener('click', onEffectClick);

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

export {initUploadImageForm};
