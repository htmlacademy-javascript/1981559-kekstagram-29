const imgFilters = document.querySelector('.img-filters');

const showFiltersButtons = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

// const Default = {
//   COAT_COLOR: 'rgb(101, 137, 164)',
//   EYES_COLOR: 'black',
// };
//
//
// const getImageRank = (image, comments, likes) => {
//   const comments = document.querySelector('[name="coat-color"]');
//   const likes = document.querySelector('[name="eyes-color"]');
//
//   let rank = 0;
//
//   if (wizard.colorCoat === (coatColorInput.value || Default.COAT_COLOR)) {
//     rank += 2;
//   }
//   if (wizard.colorEyes === (eyesColorInput.value || Default.EYES_COLOR)) {
//     rank += 1;
//   }
//
//   return rank;
// };
//
// const compareWizards = (wizardA, wizardB) => {
//   const rankA = getWizardRank(wizardA);
//   const rankB = getWizardRank(wizardB);
//
//   return rankB - rankA;
// };

export {showFiltersButtons};
