// global variables
let firstOperand = 0;
let secondOperand = 0;
let operator = "";
const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearAllButton = document.querySelector(".clear-all");
const zeroButton = document.querySelector(".zero");
const equalButton = document.getElementById("equal");
const negButton = document.getElementById("negative");
const squareButton = document.getElementById("square");
const cubeButton = document.getElementById("cube");
const decimalButton = document.getElementById("decimal");
const msg = document.querySelector(".info");
let is14digits = false;
let shouldResetDisplay = false;
let storedDigits = new Array();
let completeNumberGlobal;



digitButtons.forEach(button => button.addEventListener("click", () => appendDigit(button.textContent)));
operatorButtons.forEach(button => button.addEventListener("click", () => initiateOperation(button.textContent)));

clearAllButton.addEventListener("click", clear);
negButton.addEventListener("click", setNegative);
squareButton.addEventListener("click", square);
cubeButton.addEventListener("click", cube);
decimalButton.addEventListener("click", setDecimal);
equalButton.addEventListener("click", evaluate);


window.addEventListener("keydown", getKeyboardInput);

function getKeyboardInput(e){
    if(e.key >= 0 && e.key <= 9) appendDigit(e.key);
    if(e.key === "Escape") clear();
};

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

function square(){
    display.textContent = Number(display.textContent) ** 2;
};

function cube(){
    display.textContent = Number(display.textContent) ** 3;
};

function initiateOperation(sign){
    if(operator === ""){
        operator = sign;
        if(storedDigits.length === 0){
            firstOperand = display.textContent;
        }else{
            firstOperand = completeNumberGlobal.join("");
        }
        shouldResetDisplay = true;
    }else{
        evaluate();
        operator = sign;
        firstOperand = display.textContent;
        shouldResetDisplay = true;
    }
    
};

function operate(firstOperand, secondOperand, operator){
    x = Number(firstOperand);
    y = Number(secondOperand);

    switch(operator){
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "×":
            return multiply(x, y);
        case "÷":
            return divide(x, y);
        default:
            return null;
    };
};

function evaluate(){
    if(operator !== ""){
        secondOperand = display.textContent;
        display.textContent = roundEvaluation(operate(firstOperand, secondOperand, operator));
    }else alert("No current calculation!")
    operator = "";
};

function roundEvaluation(number){
    return Math.round(number * 1000) / 1000;
};

function clear(){
    display.textContent = 0;
    firstOperand = 0;
    secondOperand = 0;
    operator = "";
    storedDigits = [];
    is14digits = false;
    shouldResetDisplay = false;
    setDisplayControls(is14digits);
};

function setNegative(){
    let str = display.textContent;
    let array = Array.from(str);
    if(str.includes("-")){
        array.splice(0, 1);
        display.textContent = array.join("");
    }else{
        array.splice(0, 0, "-");
        display.textContent = array.join("");
    }
};

function setDecimal(){
    let str = display.textContent;
    let array = Array.from(str);
    if(!str.includes(".")){
        array.push(".");
        display.textContent = array.join("");
    }
};

function appendDigit(digit){
    if(shouldResetDisplay){
        resetDisplay(digit);
    }else{
        if (display.textContent.length === 13){
            is14digits = true;
            updateLongNum(digit);
            setDisplayControls(is14digits);
        }else{
            is14digits = false;
            setDisplayControls(is14digits);
            if(display.textContent === "0"){
                display.textContent = digit;
            }else{
                display.textContent = `${display.textContent}${digit}`;
            }
        }
    }
};

function resetDisplay(digit){
    display.textContent = digit;
    shouldResetDisplay = false;
};

function updateLongNum(digit){
    let displayValue = `${display.textContent}${digit}`;
    let array = Array.from(displayValue);
    let firstNum = array.shift();
    let displayArray = Array.from(display.textContent);
    if(storedDigits.length === 0){
        let completeNumber = storeLongNum(firstNum, displayValue);
        completeNumberGlobal = completeNumber;
        display.textContent =  array.join("");
    }else{
        let displayLastElemIndex = completeNumberGlobal.lastIndexOf(displayArray[12]);
        if(displayLastElemIndex === completeNumberGlobal.length -1){
            let completeNumber = storeLongNum(firstNum, displayValue);
            completeNumberGlobal = completeNumber;
            display.textContent =  array.join("");
        }else{
            let setdisplay = completeNumberGlobal.slice(-13);
            display.textContent =  setdisplay.join("");
            displayValue = `${display.textContent}${digit}`;
            array = Array.from(displayValue);
            firstNum = array.shift();
            completeNumber = storeLongNum(firstNum, displayValue);
            completeNumberGlobal = completeNumber;
            display.textContent =  array.join("");
        }  
    }
};

function storeLongNum(firstNum, displayValue){
    storedDigits.push(firstNum);
    let restOfNum = Array.from(displayValue);
    let restOfNumToJoin = restOfNum.slice(1);
    return storedDigits.concat(restOfNumToJoin);
};

function setDisplayControls(is14digits){
    if(is14digits){
        msg.style.visibility = "visible";
        window.addEventListener("keydown", controlDisplay);
    }else{
        msg.style.visibility = "hidden";
        window.removeEventListener("keydown", controlDisplay);
    }
};

function controlDisplay(e){
    let displayArray = Array.from(display.textContent);
    if(e.key === "ArrowLeft"){
        let displayFirstElemIndex = completeNumberGlobal.indexOf(displayArray[0]);
        if(displayFirstElemIndex === 0){
            alert("Can't move left!")
        }else{
            let leftStepIndex = displayFirstElemIndex - 1;
            let leftStepElem = completeNumberGlobal.join("").charAt(leftStepIndex);
            displayArray.unshift(leftStepElem);
            displayArray.pop();
            display.textContent = displayArray.join("");
        }
    }else if(e.key === "ArrowRight"){
        let displayLastElemIndex = completeNumberGlobal.lastIndexOf(displayArray[12]);
        if(displayLastElemIndex === completeNumberGlobal.length -1){
            alert("Can't move right!")
        }else{
            let rightStepIndex = displayLastElemIndex + 1;
            let rightStepElem = completeNumberGlobal.join("").charAt(rightStepIndex);
            displayArray.push(rightStepElem);
            displayArray.splice(0,1);
            display.textContent = displayArray.join("");
        }
    }
};


