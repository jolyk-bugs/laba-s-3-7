// script.js

// Функция для поиска НОД перебором (способ 1)
function findGCDByBruteForce() { // функция нахождения НОД 2 чисел перебором всех возможных делителей
    const num1 = parseInt(document.getElementById("num1").value); // == парс нужен для преобразования строк в целые числа НЕЛЬЗЯ ТРОГАТЬ !!! 
    // переменные, которые извлекают значения из "interface.html" id="num1/2"
    const num2 = parseInt(document.getElementById("num2").value);
    let gcd = 1; // тут храним нод, изначально = 1, тк нод любых чисел 1
  
    for (let i = 1; i <= Math.min(num1, num2); i++) { // перебираем все числа i от 1 до мин из num1/2 и делаем ограничение на отсутствие проверки делителей, которые заведомо больше меньшего из 2 чисел, тк они не могут быть общ делителями
      if (num1 % i === 0 && num2 % i === 0) { // проверяем, делится ли num1/2 на i без остатка -> если да — i общ делитель
        gcd = i; // это нужно, если i является общ делителем, то обновляем gcd переменной i
        // цикл завершен, gcd будет содержать наибольший общий делитель, тк перебор идет от меньших значений к большим.
      }
    }
  
    displayResult(gcd, "перебором"); // показываем найденное НОД, где gcd - НОД
  }
  
  // Функция для поиска НОД через разложение на простые множители (способ 2) 
  function findGCDByPrimeFactorization() { // находиv НОД 2 чисел с использованием разложения чисел на простые множители.
    const num1 = parseInt(document.getElementById("num1").value);
    const num2 = parseInt(document.getElementById("num2").value);
  
    function primeFactors(n) { //this функция возвращает массив всех простых множителей числа n
      const factors = []; // массив, куда будут добавляться простые множители
      let divisor = 2; // текущий делитель, начиная с 2 (наименьшего простого числа)
      while (n > 1) {  //цикл работает, пока число n > 1 
        while (n % divisor === 0) { // проверяем, делится ли  n на текущий делитель divisor
          factors.push(divisor); // если делится пушим(добавляем)  дивизор в факторс
          n /= divisor; // если делится, то делим n  на дивизор, при этом убирая найденный множитель из числа
        }
        divisor++; // если не делится, то увеличим дивизора на 1
      }
      return factors; // когда цикл завершится, факторы будут содержать все простые множители числа.
    }
  
    const factors1 = primeFactors(num1); // вызываем нашу любимую функцию, чтобы разложить каждое число на простые множители 
    const factors2 = primeFactors(num2);
  
    const commonFactors = factors1.filter(factor => { // проверяем, какие множители из factors1 присутствуют в factors2
      const index = factors2.indexOf(factor); // ищем позицию первого появления factor в factors2
      if (index !== -1) { // если factor найден (index !== -1), значит, что он общий
        factors2.splice(index, 1); // удаляем найденный множитель из factors2, чтобы избежать повторного использования одного и того же множителя
        return true; // 
      }
      return false;
    });
  
    const gcd = commonFactors.reduce((a, b) => a * b, 1); // функция reduce умножает все элементы массива commonFactors, чтобы найти НОД
    // если массив пуст, результат будет 1
  
    displayResult(gcd, "разложением на множители");
  }
  
  // Функция для поиска НОД методом Евклида (способ 3)
  function findGCDByEuclid() {
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
  
    while (num2 !== 0) { // цикл продолжается, пока num2 не станет равным 0.
      const temp = num2; 
      num2 = num1 % num2;// вычисляем остаток от деления num1 % num2 и присваиваем  переменной num2
      // значение num2 до обновления сохраняется в temp и затем присваивается num1
      num1 = temp;// когда num2 становится 0, в переменной num1 остается НОД
    }
  
    displayResult(num1, "методом Евклида");
  }
  
  // функция для отображения результата
  function displayResult(gcd, method) { // gcd - нод, method: строка, указывающая метод вычисления (здесь — "методом Евклида").
    document.getElementById("result").textContent = `НОД (найден ${method}): ${gcd}`;
  }
  

  