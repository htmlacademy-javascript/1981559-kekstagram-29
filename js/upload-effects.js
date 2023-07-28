// const addEffectsControl = (container, adjustingEffectResult, image, containerItems) => {
//   const createNoUiSlider = (isSliderVisibleState, minValue, maxValue, start, step, filter, unit = '') => {
//     if (isSliderVisibleState) {
//       container.classList.remove('hidden');
//       noUiSlider.create(container, {
//         range: {
//           min: minValue,
//           max: maxValue,
//         },
//         start: start,
//         step: step,
//         connect: 'lower',
//         format: {
//           to(value) {
//             if (Number.isInteger(value)) {
//               return value.toFixed(0);
//             }
//             return value.toFixed(1);
//           },
//           from(value) {
//             return parseFloat(value);
//           },
//         },
//       });
//
//       container.noUiSlider.on('update', () => {
//         adjustingEffectResult.value = container.noUiSlider.get();
//         image.style.filter = `${filter}(${adjustingEffectResult.value}${unit})`;
//       });
//     }
//   };
//
//   const onEffectClick = (evt) => {
//     const selectedEffectInput = evt.target.closest('.effects__radio');
//     const isSliderHiddenState = container.classList.contains('hidden');
//     const sliderShownState = !isSliderHiddenState;
//
//     if (sliderShownState) {
//       container.noUiSlider.destroy();
//       container.classList.add('hidden');
//     }
//
//     if (selectedEffectInput) {
//       const nameOfEffect = selectedEffectInput.getAttribute('id');
//
//       switch (nameOfEffect) {
//         case 'effect-none':
//           container.classList.add('hidden');
//           image.style.filter = 'none';
//           adjustingEffectResult.value = '';
//           break;
//
//         case 'effect-chrome':
//           createNoUiSlider(isSliderHiddenState, 0, 1, 1, 0.1, 'grayscale');
//           break;
//
//         case 'effect-sepia':
//           createNoUiSlider(isSliderHiddenState, 0, 1, 1, 0.1, 'sepia');
//           break;
//
//         case 'effect-marvin':
//           createNoUiSlider(isSliderHiddenState, 0, 100, 100, 1, 'invert', '%');
//           break;
//
//         case 'effect-phobos':
//           createNoUiSlider(isSliderHiddenState, 0, 3, 3, 0.1, 'blur', 'px');
//           break;
//
//         case 'effect-heat':
//           createNoUiSlider(isSliderHiddenState, 1, 3, 3,0.1, 'brightness');
//           break;
//       }
//     }
//   };
//
//   containerItems.addEventListener('click', onEffectClick);
// };
//
// // export {addEffectsControl};
