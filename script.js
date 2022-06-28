//var dataArray = new Array[{num1:``}, {num2:``}, {operator:``}]
//rebuild using RPN

let num1 = `0`;
let num2 = `0`;
let operator = `none`;
let calcStatus = `clear`;
const nums = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `.`, `+/-`];
const operators = [`+`, `-`, `*`, `/`, `Enter`];
let expression = [`none`, `none`, `none`, `none`]

const display = document.querySelector(`.display`);
const upperDisplay = document.querySelector(`.upperDisplay`);

const round = function(numberToRound) {
    return Math.round((numberToRound + Number.EPSILON) * 100000000) / 100000000;
}

const allClear = function() {
    num1 = `0`;
    num2 = `0`;
    operator = `none`;
    calcStatus = `clear`;
    writeDisplay(num1);
}

const deleteLast = function() {
    if (num1 == `0`) return;
    num1 = num1.slice(0, -1);
    if (num1 === ``) num1 = `0`;
    writeDisplay(num1);
}

//Deal with creating numbers and writing them to display
const handleNums = function(buttonID) {
    switch (buttonID) {
        case `.`:
            if (operator === `Enter`) allClear();
            if (num1.includes(`.`)) return;
            num1 = `${num1}${buttonID}`
            break;
        case `+/-`:
            if (num1 === `0`) return;
            if (num1.includes(`-`)) num1 = num1.slice(1);
            else num1 = `-${num1}`;
            break;
        default: 
            if (operator === `Enter`) allClear();
            if (num1 == `0`) num1 = ``;
            num1 = `${num1}${buttonID}`;
            break;
    }
    writeDisplay(num1);
    if (calcStatus === `clear`) calcStatus = `readyForOp`;
    else if (calcStatus === `readyForSecondNum`) calcStatus = `eval`;
    return;
}

//Deal with operators
const handleOperators = function(buttonID) {
    if (calcStatus === `readyForOp` && operator !== `Return` && buttonID !== operator) {
        operator = buttonID;
        num2 = num1;
        num1 = `0`;
        calcStatus = `readyForSecondNum`;
        return;
    }
    else if (calcStatus === `eval`) {
    num1temp = round(Number(num1));
    num2temp = round(Number(num2));
    switch (operator) {
        case `+`:
            num2 = round(num2temp + num1temp).toString();
            break;
        case `-`:
            num2 = round(num2temp - num1temp).toString();
            break;
        case `*`:
            num2 = round(num2temp * num1temp).toString();
            break;
        case `/`:
            num2 = round(num2temp / num1temp).toString();
            break;
        case `=`:
            break;
    }

    if (isNaN(num2)) writeDisplay(`WOOPS!`);

    else writeDisplay(num2);
    operator = buttonID;
    num1 = '0';
    }
}

//Deal with key and click inputs
const handleEvents = function(event) {
    let buttonID = `fail`;
    if (event.type === `click`) buttonID = event.target.id;
    else buttonID = event.key;

    if (nums.includes(buttonID)) {
        handleNums(buttonID);
        return;
    }

    else if (operators.includes(buttonID)) {
        handleOperators(buttonID);
        return;
    }

    switch (buttonID) {
        case `Delete`: 
            allClear();
             break;
        case `Backspace`: 
            deleteLast();
            break;
        case `rpnToggle`: 
            rpnToggle();
            break;
    }
}

//Function that puts stuff on the Display
const writeDisplay = function(input) {
    if (input.toString().length > 18) input = `ERR`;
    display.textContent = input;
}

//Add event listeners and direct each click to handleEvents
document.querySelectorAll(`.buttons`).forEach((button) => {
    button.addEventListener('click', (event) => handleEvents(event))
})

document.addEventListener(`keydown`, (event) => handleEvents(event))

writeDisplay(num1);
