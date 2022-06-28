//var dataArray = new Array[{num1:``}, {num2:``}, {operator:``}]
//rebuild using RPN

var num1 = `0`;
var num2 = `0`;
var operator = `none`;
var calcStatus = `clear`;
const display = document.querySelector(`.display`);

let round = function(numberToRound) {
    return Math.round((numberToRound + Number.EPSILON) * 100000000) / 100000000;
}

window.allClear = () => {
    num1 = `0`;
    num2 = `0`;
    operator = `none`;
    calcStatus = `clear`;
    writeDisplay(num1);
}

window.deleteLast = () => {
    if (num1 == `0`) return;
    num1 = num1.slice(0, -1);
    if (num1 === ``) num1 = `0`;
    writeDisplay(num1);
}

window.equals = (a, b) => a;
window.add = (a, b) => a + b;
window.subtract = (a, b) => a - b;
window.multiply = (a, b) => a * b;
window.divide = (a, b) => a / b;

//Main function that handles user interaction
const handleClicks = function(event) {
    const buttonClass = event.target.className;
    const buttonID = event.target.id;
    switch (buttonClass) {
        case `numbers`:
            switch (buttonID) {
                case `.`:
                    if (operator === `equals`) allClear();
                    if (num1.includes(`.`)) return;
                    num1 = `${num1}${buttonID}`
                    break;
                case (`+/-`):
                    if (num1 === `0`) return;
                    if (num1.includes(`-`)) num1 = num1.slice(1);
                    else num1 = `-${num1}`;
                    break;
                default: 
                    if (operator === `equals`) allClear();
                    if (num1 == `0`) num1 = ``;
                    num1 = `${num1}${buttonID}`;
                    break;
            }
            writeDisplay(num1);
            if (calcStatus === `clear`) calcStatus = `readyForOp`;
            else if (calcStatus === `readyForSecondNum`) calcStatus = `eval`;
            break;

        case `operators`:
            if (calcStatus === `readyForOp`) {
                operator = buttonID;
                num2 = num1;
                num1 = 0;
                calcStatus = `readyForSecondNum`;
            }
            else if (calcStatus === `eval`) {
            num1 = round(Number(num1));
            num2 = round(Number(num2));
            num2 = round(window[operator](num2, num1));
            if (!Number.isFinite(num2)) writeDisplay(`WOOPS!`);
            else writeDisplay(num2);
            operator = buttonID;
            num1 = '0';
            }
            break;
        case `dataMgt`:
            window[buttonID]();
            break;
    }
}

//Function that puts stuff on the Display
const writeDisplay = function(input) {
    if (input.toString().length > 18) input = `ERR`;
    display.textContent = input;
}

//Add event listeners and direct each click to handleClicks
document.querySelectorAll(`.buttons`).forEach((button) => {
    button.addEventListener('click', (event) => handleClicks(event))
})

writeDisplay(num1);
