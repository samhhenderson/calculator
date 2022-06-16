//var dataArray = new Array[{previousValue:``}, {currentValue:``}, {operator:``}]

var previousValue = 0;
var currentValue = ``;
var activeOperator = ``;

const display = document.querySelector(`.display`);



window.add = function(a, b) {
    console.log(a)
    console.log(b)
    return a + b;
}

window.subtract = function(a, b) { 
    return a - b;
}

window.equals = function(a, b) { 
    return;
}

window.allClear = function(a, b) {
    previousValue = 0;
    currentValue = ``;
    activeOperator = ``;
    return ``;
}

//Main function that handles user interaction
const handleClicks = function(event) {
    const buttonClass = event.target.className;
    const buttonID = event.target.id;
    switch(buttonClass) {
        case `numbers`:
            currentValue = `${currentValue}${buttonID}`;
            writeDisplay(currentValue);
            break;
        case `operators`: 
            if (activeOperator === buttonID) return;
            if (activeOperator === ``) activeOperator = `add`;
            previousValue = parseInt(previousValue, 10);
            currentValue = parseInt(currentValue, 10);
            writeDisplay(window[activeOperator](previousValue, currentValue))
            previousValue = currentValue;
            currentValue = ``;
            activeOperator = buttonID;
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

//1. When clicked, store the value of the button
//2. Display the value of the button
//3. Perform the desired operations when = is pressed
//4. Display the resultant