// Функция для проверки длины строки

function stringСheck(string, length) {
  if (string.length <= length) {
    return true;
  }

  return false;
}

// Примеры использования функции
stringСheck('какая то рандомная строка', 30);
stringСheck('какая то рандомная строка', 25);
stringСheck('какая то рандомная строка', 20);


// Функция для проверки, является ли строка палиндромом

function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^a-zа-яё]/g, '');

  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

// Примеры использования функции

isPalindrome('Лёша на полке клопа нашёл');
isPalindrome('ДоВод');
isPalindrome('A man, a plan, a canal, Panama');


// Дополнительная функция

function extractNumbers(str) {
  str = str.toString();
  let extractedDigits = '';

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i], 10))) {
      extractedDigits += str[i];
    }
  }

  return parseInt(extractedDigits, 10);
}

// Примеры использования функции

extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона, 20 яиц');
extractNumbers('Минут пять, десять пятого');
extractNumbers(2023);
extractNumbers(-115);

// Функция "Делу — время"

function timeCheck(startDay, endDay, startMeet, meetDuration) {
  function timeToMinutes(time) {
    var parts = time.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }

  startDay = timeToMinutes(startDay);
  endDay = timeToMinutes(endDay);
  startMeet = timeToMinutes(startMeet);

  let meetEnd = startMeet + meetDuration;

  if (startMeet >= startDay && meetEnd <= endDay) {
      return true;
  } else {
      return false;
  }
}

// Примеры использования функции

timeCheck('08:00', '17:30', '14:00', 90);
timeCheck('8:0', '10:0', '8:0', 120);
timeCheck('08:00', '14:30', '14:00', 90);
timeCheck('14:00', '17:30', '08:0', 90);
timeCheck('8:00', '17:30', '08:00', 900);

console.log(timeCheck('08:00', '17:30', '14:00', 90))
