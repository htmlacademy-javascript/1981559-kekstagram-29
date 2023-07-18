import {disableEscHandling} from './util.js';
import {createUploadImageHandler} from './upload-img-listeners.js';
import {createValidation} from './upload-validation.js';
import {createScaleControlling} from './upload-scale-contol.js';

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

//Управление эффектами

const sliderControlContainer = uploadForm.querySelector('.effect-level');
const effectsList = uploadForm.querySelector('.effects__list');
const effectValue = uploadForm.querySelector('.effect-level__value');

const createNoUiSlider = (sliderVisibleState, minValue, maxValue, step, filter, unit = '') => {
  if (sliderVisibleState) {
    sliderControlContainer.classList.remove('hidden');
    noUiSlider.create(sliderControlContainer, {
      range: {
        min: minValue,
        max: maxValue,
      },
      start: 0,
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
  const selectedEffectInput = evt.target.closest('.effects__radio');
  const sliderHiddenState = sliderControlContainer.classList.contains('hidden');
  const sliderShownState = !sliderHiddenState;

  if (sliderShownState) {
    sliderControlContainer.noUiSlider.destroy();
    sliderControlContainer.classList.add('hidden');
  }

  if (selectedEffectInput) {
    const nameOfEffect = selectedEffectInput.getAttribute('id');

    switch (nameOfEffect) {
      case 'effect-none':
        sliderControlContainer.classList.add('hidden');
        imageToUpload.style.filter = 'none';
        effectValue.value = '';
        break;

      case 'effect-chrome':
        createNoUiSlider(sliderHiddenState, 0, 1, 0.1, 'grayscale');
        break;

      case 'effect-sepia':
        createNoUiSlider(sliderHiddenState, 0, 1, 0.1, 'sepia');
        break;

      case 'effect-marvin':
        createNoUiSlider(sliderHiddenState, 0, 100, 1, 'invert', '%');
        break;

      case 'effect-phobos':
        createNoUiSlider(sliderHiddenState, 0, 3, 0.1, 'blur', 'px');
        break;

      case 'effect-heat':
        createNoUiSlider(sliderHiddenState, 1, 3,0.1, 'brightness');
        break;
    }
  }
};

effectsList.addEventListener('click', onEffectClick);
