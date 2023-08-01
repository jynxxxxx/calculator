// Adjust event listeners and formulas
// Create new formulas and event listeners to accommodate keyboard input

// Add snarky comments for operate errors

// Adjust result to fit screenBottom

// Create display
const display = document.querySelector('.screenTop');
const answer = document.querySelector('.screenBottom');

// Variables for calculation
let firstValue = "";
let secondValue = "";
let operatorClicked = 0;
let operator ="";

// Calculation function
function operate(firstValue, secondValue, operator) {
    switch (operator) {
        case '+':
            if (secondValue == ""){
                alert("Gotta add something dumbass, lol")
            }
            else {
                return +firstValue + +secondValue;
            };
            break;
        case '-':
            if (secondValue == ""){
                alert("Gotta subtract something dumbass, lol")
            }
            else {
                return +firstValue - +secondValue;
            };
            break;
        case '*':
            if (secondValue == ""){
                alert("Gotta mulitply by something dumbass, lol")
            }
            else {
                return +firstValue * +secondValue;
            };
            break;
        case '/':
            if (secondValue == ""){
                alert("Gotta divide by something dumbass, lol")
            }
            else if (secondValue == 0) {
                alert("Everyone has the right to be stupid, but you seem to be abusing that privilege." )
            }
            else {
                return +firstValue / +secondValue;
            };
            break;
    }
};

// Event lister for +/- button
const plusMinus = document.querySelector('.negative');

function togglePlusMinus(){
    if(operator == '') {
        if(!firstValue.toString().includes('-')){
            firstValue = -firstValue;
            display.textContent = firstValue;
        }
        else {
            firstValue = Math.abs(firstValue);
            display.textContent = firstValue;
        }
    }
    else {
        if(!secondValue.toString().includes('-')){
            secondValue = -secondValue;
            display.textContent = firstValue + " " + operator + " " + `(${ secondValue })`;
        }
        else {
            secondValue = Math.abs(secondValue);
            display.textContent = firstValue + " " + operator + " " + secondValue;
        }
    };
};

plusMinus.addEventListener('click',togglePlusMinus);


// Event listener for clear
const clear = document.querySelector('.clear');
clear.addEventListener('click',(e)=>{
    firstValue = "";
    secondValue = "";
    operatorClicked = 0;
    operator = "";
    display.textContent = "";
    decimalReset();
    document.querySelector('.screenTop').innerHTML = "";
    document.querySelector('.screenBottom').innerHTML = "";
});



// Event listener to disable decimal button after 1 click
const decimal = document.querySelector('#decimal');
decimal.addEventListener('click',(e)=> {
    displayInput(e.target.value);
    document.getElementById('decimal').value='';
    document.getElementById('period').dataset.value = '';

});

// Event listener to disable decimal button after 1 click
document.addEventListener('keydown', (e) => {
    if (e.key === ".") { 
        const periodValue = document.getElementById('period').dataset.value;
        displayInput(periodValue);
        document.getElementById('period').dataset.value = '';
        document.getElementById('decimal').value='';
    }
});


// Reset decimal
function decimalReset() {
    document.getElementById('decimal').value='.';
    document.getElementById('period').dataset.value = '.';
};


// Event listener for operator keys
document.addEventListener('keydown', (e) => {
    const key = document.querySelector(`.key.operator[value="${e.key}"]`);
    const isShift = e.shiftKey;

    if (key || (isShift && e.key === "8")) {
        e.preventDefault();
        operatorInput(key.getAttribute('value'));
        console.log(key.getAttribute('value'));
    }
});


// Event listener for operator buttons
const operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
    button.addEventListener('click', () => {
    operatorInput(button.value);
  });
});

// Function for operator input
function operatorInput(value) {
    if (operatorClicked === 0) {
        operatorClicked++;
        operator = value;
        display.textContent = firstValue + " " + operator;
        decimalReset();
      } 
    else {
        // Perform the calculation
        const result = operate(firstValue, secondValue, operator);
        let formattedResult;

        // Check if the result is greater than 16 characters before a decimal and limit display
        if (Math.abs(result) >= 1e16 || (Math.abs(result) >= 1 && Math.abs(result) < 1e-16)) {
            formattedResult = result.toExponential(10);
        } 
        else {
            formattedResult = result.toString().slice(0, 16);
        }

        answer.textContent = formattedResult;

        // Update values for the next calculation
        firstValue = formattedResult;
        secondValue = "";
        operator = value;
        display.textContent = firstValue + " " + operator;
        decimalReset();
      }
    };


// Event listeners for enter key
document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        equals();
    }
});

// Event listener for equal button
const equal = document.querySelector('.equals');
equal.addEventListener('click', equals);

// Equal function
function equals(input) {
    // Perform the calculation
    const result = operate(firstValue, secondValue, operator);
    let formattedResult;

    // Check if the result is greater than 16 characters before a decimal and limit display
    if (Math.abs(result) >= 1e16 || (Math.abs(result) >= 1 && Math.abs(result) < 1e-16)) {
        formattedResult = result.toExponential(10);
    } 
    else {
        formattedResult = result.toString().slice(0, 16);
    }

        answer.textContent = formattedResult;

    // Reset everything 
    firstValue = "";
    secondValue = "";
    operator = "";
    operatorClicked = 0;
    decimalReset();
};

// Event listeners for backspace key
document.addEventListener('keydown', (e) => {
    if (e.key === "Backspace") {
        backSpace();
    }
});

//Event listener for backspace button
const backspace = document.querySelector('.delete');
backspace.addEventListener('click', backSpace);

function backSpace(input) {
if( operator == "") {
        if (firstValue[firstValue.length - 1] == ".") {
            firstValue = firstValue.slice(0,-1);
            display.textContent = firstValue;
            decimalReset();
        }
        else {
            firstValue = firstValue.slice(0,-1);
            display.textContent = firstValue;
        }
    }
    else if (!operator == "" && secondValue == ""){
        operator = "";
        operatorClicked--;
        display.textContent = firstValue + " " + operator + " " + secondValue;
    }
    else {
        if (secondValue[secondValue.length - 1] == ".") {
            secondValue = secondValue.slice(0,-1);
            display.textContent = firstValue + " " + operator + " " + secondValue;
            decimalReset();
        }
        else {
            secondValue = secondValue.slice(0,-1);
            display.textContent = firstValue + " " + operator + " " + secondValue;
        }
    }
};

//Event listeners for operand buttons
const numbers = document.querySelectorAll('.operand');
numbers.forEach((button) => {
    button.addEventListener('click', (e) => {
    displayInput(e.target.value)
  });
});


// Event listeners for operand keys
document.addEventListener('keydown', (e) => {
    const key = document.querySelector(`.key.operand[data-key="${e.code}"]`);
    const isShift = e.shiftKey;
    if (key && !isShift) {
        e.preventDefault();
        displayInput(key.getAttribute('value'));
    }
});


// Function to handle both keyboard and button input
function displayInput(input) {
  if (operator === "") {
    if (firstValue === "" && input === ".") {
      answer.textContent = "";
      firstValue += "0" + input;
      display.textContent = firstValue;
    } else {
      answer.textContent = "";
      firstValue += input;
      display.textContent = firstValue;
    }
  } else {
    if (secondValue === "" && input === ".") {
      document.querySelector('.screenBottom').innerHTML = "";
      secondValue += "0" + input;
      display.textContent = firstValue + " " + operator + " " + secondValue;
    } else {
      document.querySelector('.screenBottom').innerHTML = "";
      secondValue += input;
      display.textContent = firstValue + " " + operator + " " + secondValue;
    }
  }
}
