// Добавляем обработчик событий на изменение типа шифрования
document.querySelectorAll('input[name="cipherType"]').forEach((el) => {
    el.addEventListener('change', function () {
      // Показываем или скрываем настройки для шифра Цезаря
      document.getElementById('caesarOptions').style.display =
        this.value === 'caesar' ? 'block' : 'none';
    });
  });
  
  // Сохраняем регистр символов текста после преобразования
  function preserveCase(original, transformed) {
    return original
      .split('') // Разбиваем исходный текст на массив символов
      .map((char, i) => {
        const isLower = char === char.toLowerCase(); // Проверяем, является ли символ строчным
        const transformedChar = transformed[i] || char; // Берем преобразованный символ или оставляем исходный
        return isLower ? transformedChar.toLowerCase() : transformedChar.toUpperCase(); // Восстанавливаем регистр
      })
      .join(''); // Собираем строку обратно
  }
  
  // Шифр Атбаш
  function atbash(text, isRussian) {
    const alphabet = isRussian
      ? 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' // Русский алфавит
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Английский алфавит
    const reversed = alphabet.split('').reverse().join(''); // Создаем перевернутый алфавит
    const map = new Map(
      alphabet.split('').map((char, i) => [char, reversed[i]]) // Создаем словарь для сопоставления символов
    );
    const transformed = text
      .toUpperCase() // Преобразуем весь текст в верхний регистр
      .split('') // Разбиваем текст на символы
      .map((char) => map.get(char) || char) // Заменяем символ на зеркальный, если он есть в словаре
      .join(''); // Собираем обратно в строку
    return preserveCase(text, transformed); // Возвращаем текст с сохранением регистра
  }
  
  // Шифр Цезаря
  function caesar(text, shift, isRussian, decrypt = false) {
    const alphabet = isRussian
      ? 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' // Русский алфавит
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Английский алфавит
    const offset = decrypt ? -shift : shift; // Определяем направление сдвига (для шифрования или дешифрования)
    const transformed = text
      .toUpperCase() // Преобразуем текст в верхний регистр
      .split('') // Разбиваем текст на символы
      .map((char) => {
        const index = alphabet.indexOf(char); // Находим индекс символа в алфавите
        if (index === -1) return char; // Если символ не найден, возвращаем его как есть
        return alphabet[(index + offset + alphabet.length) % alphabet.length]; // Вычисляем новый индекс с учетом сдвига и возвращаем символ
      })
      .join(''); // Собираем обратно в строку
    return preserveCase(text, transformed); // Возвращаем текст с сохранением регистра
  }
  
  // Определяем выбранный язык
  function detectLanguage() {
    return document.querySelector('input[name="language"]:checked').value === 'russian';
  }
  
  // Шифрование текста
  function encrypt() {
    const text = document.getElementById('textInput').value; // Получаем текст для шифрования
    const cipherType = document.querySelector('input[name="cipherType"]:checked').value; // Определяем тип шифра
    const isRussian = detectLanguage(); // Проверяем, выбран ли русский язык
    let result = ''; // Инициализируем переменную для результата
  
    if (cipherType === 'atbash') {
      result = atbash(text, isRussian); // Шифруем текст шифром Атбаш
    } else if (cipherType === 'caesar') {
      const shift = parseInt(document.getElementById('shiftInput').value, 10); // Получаем значение сдвига
      if (isNaN(shift)) {
        alert('Введите корректное значение для сдвига!'); // Если сдвиг не задан, показываем ошибку
        return;
      }
      result = caesar(text, shift, isRussian); // Шифруем текст шифром Цезаря
    }
  
    document.getElementById('result').textContent = result; // Выводим результат шифрования
  }
  
  // Дешифрование текста
  function decrypt() {
    const text = document.getElementById('textInput').value; // Получаем текст для дешифрования
    const cipherType = document.querySelector('input[name="cipherType"]:checked').value; // Определяем тип шифра
    const isRussian = detectLanguage(); // Проверяем, выбран ли русский язык
    let result = ''; // Инициализируем переменную для результата
  
    if (cipherType === 'atbash') {
      result = atbash(text, isRussian); // Дешифрование Атбаш идентично шифрованию
    } else if (cipherType === 'caesar') {
      const shift = parseInt(document.getElementById('shiftInput').value, 10); // Получаем значение сдвига
      if (isNaN(shift)) {
        alert('Введите корректное значение для сдвига!'); // Если сдвиг не задан, показываем ошибку
        return;
      }
      result = caesar(text, shift, isRussian, true); // Дешифруем текст шифром Цезаря
    }
  
    document.getElementById('result').textContent = result; // Выводим результат дешифрования
  }
  