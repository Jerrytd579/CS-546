function checkInput(val, variableName){
    if(typeof val != 'number') throw `${variableName} is not a number`;
}

function addTwoNumbers(num1, num2){
    checkInput(num1, 'Number 1');
    checkInput(num2, 'Number 2');
    return num1 + num2;
}

function subtractTwoNumbers(num1, num2){
    checkInput(num1, 'Number 1');
    checkInput(num2, 'Number 2');
    return num1 - num2;
}

function multiplyTwoNumbers(num1, num2){
    checkInput(num1, 'Number 1');
    checkInput(num2, 'Number 2');
    return num1 * num2;
}

function divideTwoNumbers(num1, num2){
    checkInput(num1, 'Number 1');
    checkInput(num2, 'Number 2');
    if(num2 === 0) throw 'Cannot divide by zero';
    return num1 / num2;
}

module.exports = {addTwoNumbers, subtractTwoNumbers, multiplyTwoNumbers, divideTwoNumbers};