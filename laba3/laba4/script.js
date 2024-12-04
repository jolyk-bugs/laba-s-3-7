// Функция расширенного алгоритма Евклида
function extendedGcd(a, b) {
    if (b === 0) {
      return { gcd: a, x: 1, y: 0 };
    }
    const { gcd, x: x1, y: y1 } = extendedGcd(b, a % b);
    return { gcd: gcd, x: y1, y: x1 - Math.floor(a / b) * y1 };
  }
  
  // Функция для вычисления решения
  function calculate() {
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    const d = parseInt(document.getElementById('d').value);
    const output = document.getElementById('output');
    const tableBody = document.querySelector('#steps-table tbody');
    tableBody.innerHTML = ""; // Очистка таблицы
  
    // Проверка ввода
    if (isNaN(a) || isNaN(b) || isNaN(d)) {
      output.textContent = "Пожалуйста, введите корректные значения!";
      return;
    }
  
    // Расширенный алгоритм Евклида
    const { gcd, x, y } = extendedGcd(a, b);
  
    // Проверяем делимость d на gcd(a, b)
    if (d % gcd !== 0) {
      output.textContent = "Невозможно найти целочисленное решение для введенных данных.";
      return;
    }
  
    // Вычисление частного решения
    const x0 = x * (d / gcd);
    const y0 = y * (d / gcd);
    output.textContent = `Решение найдено: x = ${x0}, y = ${y0}`;
  
    // Построение таблицы решений (пример для демонстрации)
    for (let k = -5; k <= 5; k++) {
      const xk = x0 + k * (b / gcd);
      const yk = y0 - k * (a / gcd);
      const axBy = a * xk + b * yk;
      const row = `<tr><td>${xk}</td><td>${yk}</td><td>${axBy}</td></tr>`;
      tableBody.innerHTML += row;
    }
  }
  