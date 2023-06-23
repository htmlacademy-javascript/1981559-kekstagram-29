//Функция рабочего дня.
const MINUTES_IN_HOUR = 60;

const checkWorkdayTime = (workdayStart, workdayEnd, meetingStartTime, meetingDuration) => {
  const workdayTimeArray = [...workdayStart.split(':'), ...workdayEnd.split(':'), ...meetingStartTime.split(':')];

  for (let i = 0; i < workdayTimeArray.length; i++) {
    workdayTimeArray[i] = +workdayTimeArray[i];
    if (i === 0 || i % 2 === 0) {
      workdayTimeArray[i] *= MINUTES_IN_HOUR;
    }
  }

  workdayStart = workdayTimeArray[0] + workdayTimeArray[1];
  workdayEnd = workdayTimeArray[2] + workdayTimeArray[3];
  meetingStartTime = workdayTimeArray[4] + workdayTimeArray[5];

  if (meetingStartTime < workdayStart || meetingStartTime > workdayEnd) {
    return false;
  }

  const timeAfterMeeting = meetingStartTime + meetingDuration;

  if (timeAfterMeeting > workdayEnd) {
    return false;
  }

  return true;
};

checkWorkdayTime('08:00', '17:30', '14:00', 90);

//Тесты функции рабочего дня.
// console.log(checkWorkdayTime('08:00', '17:30', '14:00', 90)); // true
// console.log(checkWorkdayTime('8:0', '10:0', '8:0', 120));  // true
// console.log(checkWorkdayTime('08:00', '14:30', '14:00', 90)); // false
// console.log(checkWorkdayTime('14:00', '17:30', '08:0', 90));  // false
// console.log(checkWorkdayTime('8:00', '17:30', '08:00', 900)); // false

//Функция для проверки длины строки.
/*
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
*/
