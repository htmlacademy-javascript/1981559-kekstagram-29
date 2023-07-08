import {getRandomValue} from './util.js';

const OBJECTS_NUMBER = 25;
const MIN_LIKE_VALUE = 15;
const MAX_LIKE_VALUE = 200;
const MIN_COMMENTS_VALUE = 11;
const MAX_COMMENTS_VALUE = 11;
const MIN_USER_ID = 0;
const MAX_USER_ID = 999;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_RANDOM_MESSAGES = 1;
const MAX_RANDOM_MESSAGES = 2;
const DEFAULT_SHOWN_COMMENTS = 5;
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Артём',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let photoId = 1;

const createRandomIdGenerator = () => {
  const generatedIdArray = [];

  return () => {
    let newUserId = getRandomValue(MIN_USER_ID, MAX_USER_ID);
    while (generatedIdArray.includes(newUserId)) {
      newUserId = getRandomValue(MIN_USER_ID, MAX_USER_ID);
    }
    generatedIdArray.push(newUserId);
    return generatedIdArray;
  };
};

const userIdGenerator = createRandomIdGenerator();

const generateMassageText = () => {
  let generatedResult = '';

  for (let i = 1; i <= getRandomValue(MIN_RANDOM_MESSAGES, MAX_RANDOM_MESSAGES); i++) {
    const randomMessage = MESSAGES[getRandomValue(0, MESSAGES.length - 1)];
    generatedResult = (i > 1) ? generatedResult += ` ${randomMessage}` : generatedResult += randomMessage;
  }

  return generatedResult;
};

const createComment = () => ({
  id: userIdGenerator().at(-1),
  avatar: `img/avatar-${getRandomValue(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: generateMassageText(),
  name: NAMES[getRandomValue(0, NAMES.length - 1)],
});

const createCommentArray = () => {
  const commentArray = [];
  const valueOfComments = getRandomValue(MIN_COMMENTS_VALUE, MAX_COMMENTS_VALUE);

  for (let i = 0; i < valueOfComments; i++) {
    commentArray.push(createComment());
  }

  return commentArray;
};

const createObject = () => {
  const newId = photoId++;
  const newLikeValue = getRandomValue(MIN_LIKE_VALUE, MAX_LIKE_VALUE);

  return {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: `${newId} фото.`,
    likes: newLikeValue,
    comments: createCommentArray(),
  };
};

const newArrayOfObjects = Array.from({length: OBJECTS_NUMBER}, createObject);

export {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS};
