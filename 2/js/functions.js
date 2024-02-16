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

  if (extractedDigits === '') {
    return NaN;
  }

  return parseInt(extractedDigits, 10);
}

// Примеры использования функции

extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона, 20 яиц');
extractNumbers('Минут пять, десять пятого');
extractNumbers(2023);
extractNumbers(-115);
