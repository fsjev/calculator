// global variables
let firstOperand = 0;
let secondOperand = 0;
let operator = "";
let display = document.querySelector(".display");
let buttons = document.querySelectorAll(".key");
let clearAllButton = document.querySelector(".clear-all");
let clearButton = document.querySelector(".clear");
let zeroButton = document.querySelector(".zero");
let equalButton = document.getElementById("equal");
let plusButton = document.getElementById("add");
let minusButton = document.getElementById("subtract");
let multiplyButton = document.getElementById("multiply");
let divideButton = document.getElementById("divide");
let negButton = document.getElementById("negative");
let squareButton = document.getElementById("square");
let decimalButton = document.getElementById("decimal");
let keysContainer = document.querySelector(".keys-container");


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

buttons.forEach(button => button.addEventListener("click", () => {
    let liveOperator = keysContainer.getElementsByClassName("operator-click");
    if(display.textContent.length <= 12){
        if(button === clearAllButton){
            clearDisplay();
            clearOpVariabes();
        }else if(button === multiplyButton){
            // if(liveOperator.length === 0){
            //     multiplyButton.setAttribute("class", "key operator operator-click");
            // }else{
            //     multiplyButton.setAttribute("class", "key operator");
            // }
            firstOperand = display.textContent;
        }
        
        
        else if(button === clearButton){
            if(display.textContent.length === 1){
                display.textContent = 0;
            }else{
                display.textContent = clearLast();
            }
        }else if(button === negButton){
            if(display.textContent.includes("-")){
                display.textContent = removeNegative();
            }else{
                display.textContent = makeNegative();
            }
        }else if(button === squareButton){
            if(display.textContent !== "0"){
                firstOperand = display.textContent;
                display.textContent = square(firstOperand);

            }
        }
        
        
        else if(button === decimalButton){
            if(!display.textContent.includes(".")){
                display.textContent = `${display.textContent}${button.textContent}`;
            }else{
                display.textContent = clearLast();
            }
            
        }
        
        
        
        else if(button === equalButton){
            // outputResult();
        }else if(button === zeroButton){
            if(display.textContent === "0"){
                display.textContent === 0;
            }else{
                display.textContent = `${display.textContent}${button.textContent}`;
            }
        }else{
            if(display.textContent === "0"){
                display.textContent = button.textContent;
            }else if(display.textContent === "-0"){
                display.textContent = button.textContent;
            }
            
            
            else{
                display.textContent = `${display.textContent}${button.textContent}`;
            }
        }
    }else{
        if(button === multiplyButton && button === divideButton && button === plusButton && button === minusButton){
            console.log("yap");
            // code for processing opers
        }else if(button === clearAllButton){
            clearDisplay();
            clearOpVariabes();
        }else if(button === clearButton){
            if(display.textContent.length === 1){
                display.textContent = 0;
            }else{
                display.textContent = clearLast();
            }
        }   
    }
}));


function clearDisplay(){
    display.textContent = 0;
};

function clearOpVariabes(){
    firstOperand = 0;
    secondOperand = 0;
    operator = "";
    
};

function clearLast(){
    let str = display.textContent;
    let array = Array.from(str);
    array.pop()
    return array.join("");
};

function makeNegative(){
    let str = display.textContent;
    let array = Array.from(str);
    array.splice(0, 0, "-");
    return array.join("");
};

function removeNegative(){
    let str = display.textContent;
    let array = Array.from(str);
    array.splice(0, 1);
    return array.join("");
};

