// global variables
let firstOperand = 15;
let secondOperand = 5;
let operator = "-";


function add(x, y){
    return x + y;
};

function subtract(x, y){
    return x - y;
};

function multiply(x, y){
    return x * y;
};

function divide(x, y){
    return x / y;
};

function operate(firstOperand, secondOperand, operator){
    switch(operator){
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multiply(firstOperand, secondOperand);
        case "/":
            return divide(firstOperand, secondOperand);
    };
};

console.log(operate(firstOperand,secondOperand,operator));