import {
  chromeValues,
  sepiaValues,
  marvinValues,
  phobosValues,
  heatValues
} from './constats.js';

const addEffectsSetting = (container, value, image, list) => {
  let nameOfFilterEffect = '';
  let unitOfFilterEffect = '';

  container.noUiSlider.on('update', () => {
    value = container.noUiSlider.get();
    image.style.filter = `${nameOfFilterEffect}(${value}${unitOfFilterEffect})`;
  });


  const updateImageEffect = (valuesOfEffect) => {
    if (nameOfFilterEffect !== valuesOfEffect.effect) {
      container.classList.remove('hidden');
      nameOfFilterEffect = valuesOfEffect.effect;
      unitOfFilterEffect = valuesOfEffect.unit;
      container.noUiSlider.updateOptions({
        range: {
          'min': valuesOfEffect.min,
          'max': valuesOfEffect.max
        },
        start: valuesOfEffect.start,
        step: valuesOfEffect.step,
      });
    }
  };

  const onEffectClick = (evt) => {
    const selectedEffect = evt.target.closest('.effects__radio');
    if (selectedEffect !== null) {
      const nameOfEffect = selectedEffect.getAttribute('id');
      switch (nameOfEffect) {
        case 'effect-none':
          container.classList.add('hidden');
          image.style.removeProperty('filter');
          nameOfFilterEffect = '';
          unitOfFilterEffect = '';
          break;

        case 'effect-chrome':
          updateImageEffect(chromeValues);
          break;

        case 'effect-sepia':
          updateImageEffect(sepiaValues);
          break;

        case 'effect-marvin':
          updateImageEffect(marvinValues);
          break;

        case 'effect-phobos':
          updateImageEffect(phobosValues);
          break;

        case 'effect-heat':
          updateImageEffect(heatValues);
          break;
      }
    }
  };

  return list.addEventListener('click', onEffectClick);
};

export {addEffectsSetting};
