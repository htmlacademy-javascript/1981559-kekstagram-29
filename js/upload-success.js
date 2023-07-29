import {uploadOverlay, uploadWrapper, uploadImageInput, clearUpload} from './upload-image.js';
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const successInnerContainer = successElement.querySelector('.success__inner');
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

  const onOutsideErrorContainerClick = (evt) => {
    const outsideErrorContainerClick = evt.composedPath().includes(successInnerContainer) === false;
    if (outsideErrorContainerClick) {
      document.removeEventListener('click', onOutsideErrorContainerClick);
      removeSuccessMessage();
    }
  };

  document.addEventListener('click', onOutsideErrorContainerClick);

  uploadOverlay.appendChild(successElement);
};

export {showSuccess};
