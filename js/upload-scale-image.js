import {SCALE_IMAGE_MAX, SCALE_IMAGE_MIN, SCALE_IMAGE_STEP} from './constats.js';

const addScalingController = (input, image, increase, decrease) => {
  const transformImage = (scalableImage, scalingValue) => {
    const percentToMath = 100;
    scalableImage.style.transform = `scale(${scalingValue / percentToMath})`;
  };

  const onDecreaseButtonClick = () => {
    let value = parseInt(input.value, 10);
    if (value > SCALE_IMAGE_MIN) {
      value -= SCALE_IMAGE_STEP;
      transformImage(image, value);
      input.value = `${value}%`;
    }
  };

  const onIncreaseButtonClick = () => {
    let value = parseInt(input.value, 10);
    if (value < SCALE_IMAGE_MAX) {
      value += SCALE_IMAGE_STEP;
      transformImage(image, value);
      input.value = `${value}%`;
    }
  };

  increase.addEventListener('click', onIncreaseButtonClick);
  decrease.addEventListener('click', onDecreaseButtonClick);
};

export {addScalingController};
