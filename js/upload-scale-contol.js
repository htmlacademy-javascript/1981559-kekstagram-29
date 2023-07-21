import {SCALE_IMAGE_DEFAULT, SCALE_IMAGE_MAX, SCALE_IMAGE_MIN, SCALE_IMAGE_STEP} from './constatnt.js';

const createScaleControlling = (controlValue, image, increase, decrease) => {
  controlValue.value = `${SCALE_IMAGE_DEFAULT}%`;
  let currentValue = parseInt(controlValue.value, 10);

  const decreaseValue = () => {
    if (currentValue <= SCALE_IMAGE_DEFAULT && currentValue > SCALE_IMAGE_MIN) {
      currentValue -= SCALE_IMAGE_STEP;
      controlValue.value = `${currentValue}%`;
      image.style.transform = `scale(${currentValue / 100})`;
    }
  };

  const increaseValue = () => {
    if (currentValue >= SCALE_IMAGE_MIN && currentValue < SCALE_IMAGE_MAX) {
      currentValue += SCALE_IMAGE_STEP;
      controlValue.value = `${currentValue}%`;
      image.style.transform = `scale(${currentValue / 100})`;
    }
  };

  increase.addEventListener('click', decreaseValue);
  decrease.addEventListener('click', increaseValue);
};

export {createScaleControlling};
