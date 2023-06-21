//Функция для проверки длины строки.

const checkLength = (string, maxLength) => string.length <= maxLength;

checkLength();

//Тесты для функции для проверки длины строки.
// console.log('Тесты для функции для проверки длины строки.');
// console.log(checkLength('проверяемая строка', 20));
// console.log(checkLength('проверяемая строка', 18));
// console.log(checkLength('проверяемая строка', 10));

//Функция проверки на палиндром

const checkPalindrome = (string) => {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = formattedString.length - 1; i >= 0; i--) {
    newString += formattedString.at(i);
  }

  return formattedString === newString;
};

checkPalindrome();

// Тесты для функции проверки на палиндром.
// console.log('Тесты для функции проверки на палиндром.');
// console.log(checkPalindrome('топот'));
// console.log(checkPalindrome('ДовОд'));
// console.log(checkPalindrome('Кекс'));
// console.log('Палиндром с пробелами.')
// console.log(checkPalindrome('Лёша на полке клопа нашёл '));

//Функция поиска цифр в строке.

const findNumbers = (string) => {
  let newString = string.toString();
  newString = newString.replaceAll(' ', '');
  let newValue = '';

  for (let i = 0; i <= newString.length; i++) {
    const isNumber = +(newString.at(i));
    if (isNaN(isNumber)) {
      continue;
    }
    newValue += isNumber;
  }

  if (newValue === '') {
    return NaN;
  }

  return +newValue;
};

findNumbers();

// Тесты дополниетельного задания.
// console.log('Тесты дополниетельного задания.')
// console.log(findNumbers('2023 год'));
// console.log(findNumbers('ECMAScript 2022'));
// console.log(findNumbers('1 кефир, 0.5 батона'));
// console.log(findNumbers('агент 007'));
// console.log(findNumbers('а я томат'));
// console.log('Усложненное задание.')
// console.log(findNumbers(2023));
// console.log(findNumbers(-1));
// console.log(findNumbers(1.5));
