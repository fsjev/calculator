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
const decimalButton = document.getElementById("decimal");
const keysContainer = document.querySelector(".keys-container");
const msg = document.querySelector(".info");
let is14digits = false;
let storedDigits = new Array();
let completeNumberGlobal;



clearAllButton.addEventListener("click", clear);
decimalButton.addEventListener("click", clear);
negButton.addEventListener("click", makeNegative)

digitButtons.forEach(button => button.addEventListener("click", () => appendDigit(button.textContent)));


// window.addEventListener("keydown", (e) => {
//     console.log(e.key);
// });




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

function square(x){
    return x ** 2;
};

function operate(x, y, operator){
    x = Number(x);
    y = Number(y);
    switch(operator){
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    };
};

function clear(){
    display.textContent = 0;
    firstOperand = 0;
    secondOperand = 0;
    operator = "";
    storedDigits = [];
    is14digits = false;
    setDisplayControls(is14digits);
};

// function clearLast(){
//     if(storedDigits.length === 0){
//         let str = display.textContent;
//         let array = Array.from(str);
//         if(array.length === 2 && array.includes("-")){
//             display.textContent = "0";
//         }else if(array.length === 1){
//             display.textContent = "0";
//         }else{
//             array.pop();
//             display.textContent = array.join("");
//         }
//     }else{
//         completeNumberGlobal.pop();
//         let setdisplay = completeNumberGlobal.slice(-13);
//         display.textContent =  setdisplay.join("");
//         is14digits = false;
//         setDisplayControls(is14digits);
//     }
// };

function makeNegative(){
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

function appendDigit(digit){
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


