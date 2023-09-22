import {uploadWrapper, uploadImageInput, clearUpload, uploadForm} from './on-upload-image.js';
import {isEscapeKey} from './util.js';
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const successInnerContainer = successElement.querySelector('.success__inner');
  const successButton = successElement.querySelector('.success__button');
  clearUpload();
  let onEscapeClickReturnToForm = () => {};

  const removeSuccessMessage = () => {
    successButton.removeEventListener('click', removeSuccessMessage);
    document.removeEventListener('keydown', onEscapeClickReturnToForm);
    uploadWrapper.classList.remove('hidden');
    successElement.remove();
    uploadImageInput.value = '';
  };

  onEscapeClickReturnToForm = (evt) => {
    if (isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  };

  document.addEventListener('keydown', onEscapeClickReturnToForm);

  successButton.addEventListener('click', removeSuccessMessage);

  const onOutsideSuccessContainerClick = (evt) => {
    const outsideErrorContainerClick = evt.composedPath().includes(successInnerContainer) === false;
    if (outsideErrorContainerClick) {
      document.removeEventListener('click', onOutsideSuccessContainerClick);
      removeSuccessMessage();
    }
  };

  document.addEventListener('click', onOutsideSuccessContainerClick);

  uploadForm.appendChild(successElement);
};

export {showSuccess};
