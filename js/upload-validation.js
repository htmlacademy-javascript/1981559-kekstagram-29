import {MAX_AVAILABLE_HASHTAGS, MAX_COMMENT_WORDS} from './constats.js';
import {checkRepeat} from './util.js';

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const createValidation = (inputField, comment, pristineConstructor) => {
  const checkHashtag = (hashtagElement) => hashtag.test(hashtagElement);

  const checkMaxHashtags = () => {
    const inputArray = inputField.value.trim().split(' ').filter((tag) => tag.length !== 0);
    return inputArray.length < MAX_AVAILABLE_HASHTAGS + 1;
  };

  const checkAllHashtags = () => {
    const inputArray = inputField.value.trim().split(' ').filter((tag) => tag.length !== 0);
    if (inputArray.length <= 1 && inputArray[0] === '') {
      return true;
    }
    return inputArray.every(checkHashtag);
  };

  const isHashtagRepeat = () => {
    const inputArray = inputField.value.toLowerCase().trim().split(' ').filter((tag) => tag.length !== 0);
    return checkRepeat(inputArray);
  };

  const checkCommentFieldLength = () => comment.value.length <= MAX_COMMENT_WORDS;

  pristineConstructor.addValidator(inputField, checkMaxHashtags, `Указано больше ${MAX_AVAILABLE_HASHTAGS} хэштэгов`, 3, true);
  pristineConstructor.addValidator(inputField, checkAllHashtags, 'Хэштэги должны состоять из букв и/или цифр. Не более 20 символов', 2, true);
  pristineConstructor.addValidator(inputField, isHashtagRepeat, 'Хэштэги повторяются', 1, true);
  pristineConstructor.addValidator(comment, checkCommentFieldLength, `Разрешено не более ${MAX_COMMENT_WORDS} символов`);
};

export {createValidation};
