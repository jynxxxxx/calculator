
//create display
const display = document.querySelector('.screenTop');
const answer = document.querySelector('.screenBottom');

// Variables for calculation
let firstValue = "";
let secondValue = "";
let operatorClicked = 0;
let operator ="";

//calculation function
function operate(firstValue, secondValue, operator) {
    switch (operator) {
        case '+':
            return +firstValue + +secondValue;
        case '-':
            return +firstValue - +secondValue;
        case '*':
            return +firstValue * +secondValue;
        case '/':
            return +firstValue / +secondValue;
    }
};

//Event lister for +/- button
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


//Event lister for clear
const clear = document.querySelector('.clear');
clear.addEventListener('click',(e)=>{
    firstValue = "";
    secondValue = "";
    operatorClicked = 0;
    operator = "";
    display.textContent = 
    document.querySelector('.screenTop').innerHTML = "";
    document.querySelector('.screenBottom').innerHTML = "";
});

//Event listener for backspace
const backspace = document.querySelector('.delete');
backspace.addEventListener('click',()=> {
    if( operator == "") {
        firstValue = firstValue.slice(0,-1);
        display.textContent = firstValue;
    }
    else if (!operator == "" && secondValue == ""){
        operator = "";
        operatorClicked--;
        display.textContent = firstValue + " " + operator + " " + secondValue;
    }
    else {
        secondValue = secondValue.slice(0,-1);
        display.textContent = firstValue + " " + operator + " " + secondValue;
    }
});

// Event listeners for number
const numbers = document.querySelectorAll('.operand');
numbers.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (operator === "") {
        if(firstValue=='' && button.value == '.') {
            answer.textContent = "";
            firstValue += '0' + e.target.value;
            display.textContent = firstValue;
        }
        else {
            answer.textContent = "";
            firstValue += e.target.value;
            display.textContent = firstValue;
        }
    } else {
        if(secondValue=='' && button.value == '.') {
            document.querySelector('.screenBottom').innerHTML = "";
            secondValue += '0' + e.target.value;
            display.textContent = firstValue + " " + operator + " " + secondValue;
        }
        else {
            document.querySelector('.screenBottom').innerHTML = "";
            secondValue += e.target.value;
            display.textContent = firstValue + " " + operator + " " + secondValue;
        }
    }
  });
});

//Event listener to disable decimal button after 1 click
const decimal = document.querySelector('#decimal');

decimal.addEventListener('click',()=> {
    document.getElementById('decimal').value='';
});

//reset decimal
function decimalReset() {
    document.getElementById('decimal').value='.';
};


// Event listener for operator buttons
const operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
button.addEventListener('click', (e) => {
    if (operatorClicked === 0) {
        operatorClicked++;
        operator = e.target.value;
        display.textContent = firstValue + " " + operator;
        decimalReset();
      } 
    else {
        // Perform the calculation
        const result = operate(firstValue, secondValue, operator);
        answer.textContent = result;

        // Update values for the next calculation
        firstValue = result.toString();
        secondValue = "";
        operator = e.target.value;
        display.textContent = firstValue + " " + operator;
        decimalReset();
      }
    });
});

// Event listener for equal button
const equal = document.querySelector('.equals')
equal.addEventListener('click', (e) => {
    // Perform the calculation
    const result = operate(firstValue, secondValue, operator);
    answer.textContent = result;

    // reset everything 
    firstValue = "";
    secondValue = "";
    operator = "";
    operatorClicked = 0;
    decimalReset();
});
