//var dataArray = new Array[{num1:``}, {num2:``}, {operator:``}]

var num1 = `0`;
var num2 = `0`;
var tempOperator = `none`;
var operator = `none`;
var calcStatus = `clear`;

const display = document.querySelector(`.display`);

window.allClear = () => {
    num1 = `0`;
    num2 = `0`;
    operator = `none`;
    tempOperator = `none`;
    writeDisplay(num1);
}

window.deleteLast = () => {
    num1 = num1.slice(0, -1);
    if (num1 === ``) num1 = `0`;
    writeDisplay(num1);
}

window.add = (a, b) => a + b;
window.subtract = (a, b) => a - b;
window.multiply = (a, b) => a * b;
window.divide = (a, b) => {
    if (b == 0) return `Please don't do that`;
    else return a / b;
}

//Main function that handles user interaction
const handleClicks = function(event) {
    const buttonClass = event.target.className;
    const buttonID = event.target.id;
    switch (buttonClass) {
        case `numbers`:
            switch (buttonID) {
                case `.`:
                    if (num1.includes(`.`)) return;
                    num1 = `${num1}${buttonID}`
                    break;
                case (`+/-`):
                    if (num1 == `0`) return;
                    if (num1.includes(`-`)) num1 = num1.slice(1);
                    else num1 = `-${num1}`;
                    break;
                default: 
                    if (num1 == `0`) num1 = ``;
                    num1 = `${num1}${buttonID}`;
                    break;
            }
            writeDisplay(num1);
            /* operator = tempOperator;
            tempOperator = `none`; */
            calcStatus = ready;
            break;

        case `operators`:
            //handle the first entries after a clear
            if (operator === `none` && tempOperator === `none`) {
                tempOperator = buttonID;

                num2 = num1;
                num1 = `0`;
                break;
            }
            else if (operator === `none`) {
                tempOperator = buttonID;
                break;
            }
            num1 = Number(num1);
            num2 = Number(num2);
            num2 = window[operator](num2, num1);
            writeDisplay(num2);
            tempOperator = buttonID;
            operator = `none`;
            num1 = '0';
            break;
        case `dataMgt`:
            window[buttonID]();
            break;

    }

}


//Function that puts stuff on the Display
const writeDisplay = function(input) {
    display.textContent = input;
}

//Add event listeners and direct each click to handleClicks
document.querySelectorAll(`.buttons`).forEach((button) => {
    button.addEventListener('click', (event) => handleClicks(event))
})
writeDisplay(num1);
//1. When clicked, store the value of the button
//2. Display the value of the button
//3. Perform the desired operations when = is pressed
//4. Display the resultant