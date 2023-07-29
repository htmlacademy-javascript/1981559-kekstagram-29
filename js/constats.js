const DEFAULT_SHOWN_COMMENTS = 5;
const MAX_AVAILABLE_HASHTAGS = 5;
const MAX_COMMENT_WORDS = 140;
const SCALE_IMAGE_DEFAULT = 100;
const SCALE_IMAGE_STEP = 25;
const SCALE_IMAGE_MAX = 100;
const SCALE_IMAGE_MIN = 25;
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

export {
  DEFAULT_SHOWN_COMMENTS,
  MAX_AVAILABLE_HASHTAGS,
  MAX_COMMENT_WORDS,
  SCALE_IMAGE_MAX,
  SCALE_IMAGE_MIN,
  SCALE_IMAGE_STEP,
  SCALE_IMAGE_DEFAULT,
  chromeValues,
  sepiaValues,
  marvinValues,
  phobosValues,
  heatValues
};
