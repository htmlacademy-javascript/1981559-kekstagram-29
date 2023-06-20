const OBJECTS_NUMBER = 25;
const MIN_LIKE_VALUE = 15;
const MAX_LIKE_VALUE = 200;
const MIN_COMMENTS_VALUE = 0;
const MAX_COMMENTS_VALUE = 30;
const MIN_USER_ID = 0;
const MAX_USER_ID = 999;
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
  'В целом всё неплохо. Но не всё.',
  'Все отлично, давай еще.',
  'Я бы сделал лучше.',
  'Как скачать?',
  'Продолжай делать контент. Мне нравится!',
  'Сохранил себе!',
  'Контент, который нам всем нужен!',
  'Очень круто, пожалуйста, побольше подобного контента!',
  'Спасибо большое',
];

const createIdGenerator = () => {
  let generatedId = 0;

  return function () {
    return ++generatedId;
  };
}
const generateId = createIdGenerator();

const getRandomValue = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdGenerator = () => {
  let generatedIdArray = [];

  return function () {
    let newUserId = getRandomValue(MIN_USER_ID, MAX_USER_ID);
    while (generatedIdArray.includes(newUserId)) {
      newUserId = getRandomValue(MIN_USER_ID, MAX_USER_ID);
    }
    generatedIdArray.push(newUserId);
    return generatedIdArray;
  };
}

let userIdGenerator = createRandomIdGenerator();

const createComment = () => ({
  id: userIdGenerator().at(-1),
  avatar: `img/avatar-${getRandomValue(MIN_USER_ID, MAX_USER_ID)}.svg`,
  message: MESSAGES[getRandomValue(0, MESSAGES.length -1)],
  name: NAMES[getRandomValue(0, NAMES.length -1)],
});

const createCommentArray = () => {
  let commentArray = [];
  let valueOfComments = getRandomValue(MIN_COMMENTS_VALUE, MAX_COMMENTS_VALUE);

  for (let i = 0; i < valueOfComments; i++) {
    commentArray.push(createComment())
  }

  return commentArray;
}

const createObject = () => {
  let newId = generateId();
  let newLikeValue = getRandomValue(MIN_LIKE_VALUE, MAX_LIKE_VALUE);

  return {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: `${newId} фото.`,
    likes: newLikeValue,
    comments: createCommentArray(),
  }
}

let createArrayOfObjects = (valueOfObjects) => {
  let initialArray = [];

  for (let i = 0; i < valueOfObjects; i++) {
    let newObject = createObject();
    initialArray.push(newObject);
  }

  return initialArray;
}


console.log(createArrayOfObjects(2))

