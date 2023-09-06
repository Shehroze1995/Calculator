function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if (num2 == "0") {
        return;
      }
      return divide(num1, num2);
  }
}

let firstNum = "";
let secondNum = "";
let currentOperator = null;

const btns = document.querySelectorAll("button");
const prevScreen = document.querySelector("#prevScreen");
const currentScreen = document.querySelector("#currentScreen");

btns.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
    btnPress = btn.target.textContent;
    if (
      btnPress == "0" ||
      btnPress == "1" ||
      btnPress == "2" ||
      btnPress == "3" ||
      btnPress == "4" ||
      btnPress == "5" ||
      btnPress == "6" ||
      btnPress == "7" ||
      btnPress == "8" ||
      btnPress == "9"
    ) {
      if (currentScreen.textContent == "0") {
        currentScreen.textContent = "";
      }
      currentScreen.textContent += btnPress;
    }
    if (btnPress == '.') {
      if (currentScreen.textContent.includes('.')) {
        return
      }
      currentScreen.textContent += '.'
    }
    if (
      btnPress == "/" ||
      btnPress == "*" ||
      btnPress == "-" ||
      btnPress == "+"
    ) {
      if (currentOperator !== null) {
        secondNum = currentScreen.textContent;
        currentScreen.textContent = operate(
          currentOperator,
          firstNum,
          secondNum
        );
      }
      firstNum = parseFloat(currentScreen.textContent);
      currentScreen.textContent = "0";
      currentOperator = btnPress;
      prevScreen.textContent = `${firstNum} ${currentOperator}`;
    }
    if (btnPress == "=") {
      if (currentOperator == null) {
        return;
      }
      if (currentScreen.textContent == "0" && currentOperator == "/") {
        alert("You cannot divide by 0!!");
        return;
      }
      secondNum = currentScreen.textContent;
      currentScreen.textContent = operate(currentOperator, firstNum, secondNum);
      prevScreen.textContent = `${firstNum} ${currentOperator} ${secondNum} =`;
      currentOperator = null;
    }
    if (btnPress == "AC") {
      firstNum = "";
      secondNum = "";
      currentOperator = null;
      currentScreen.textContent = "0";
      prevScreen.textContent = "";
    }
    if (btnPress == "DEL") {
      currentScreen.textContent = currentScreen.textContent.slice(0, -1);
    }
  });
});
