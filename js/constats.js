const DEFAULT_SHOWN_COMMENTS = 5;
const MAX_AVAILABLE_HASHTAGS = 5;
const MAX_COMMENT_WORDS = 140;
const SCALE_IMAGE_STEP = 25;
const SCALE_IMAGE_MAX = 100;
const SCALE_IMAGE_MIN = 25;
const UNIQUE_IMAGE_VALUE = 10;
const pristineDefaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__help'
};
const chromeValues = {
  min: 0,
  max: 1,
  start: 1,
  step: 0.1,
  effect: 'grayscale',
  unit: ''
};

const sepiaValues = {
  min: 0,
  max: 1,
  start: 1,
  step: 0.1,
  effect: 'sepia',
  unit: ''
};

const marvinValues = {
  min: 0,
  max: 100,
  start: 100,
  step: 1,
  effect: 'invert',
  unit: '%'
};

const phobosValues = {
  min: 0,
  max: 3,
  start: 3,
  step: 0.1,
  effect: 'blur',
  unit: 'px'
};

const heatValues = {
  min: 1,
  max: 3,
  start: 3,
  step: 0.1,
  effect: 'brightness',
  unit: ''
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

export {
  DEFAULT_SHOWN_COMMENTS,
  MAX_AVAILABLE_HASHTAGS,
  MAX_COMMENT_WORDS,
  SCALE_IMAGE_MAX,
  SCALE_IMAGE_MIN,
  SCALE_IMAGE_STEP,
  UNIQUE_IMAGE_VALUE,
  pristineDefaultConfig,
  chromeValues,
  sepiaValues,
  marvinValues,
  phobosValues,
  heatValues,
  SubmitButtonText
};
