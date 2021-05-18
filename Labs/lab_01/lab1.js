/*
Jerry Cheng
CS-496 Lab 1
*/
const questionOne = function questionOne(arr) {
    let object = {}; 
    for(let x in arr) object[arr[x]] = questionOneHelper(arr[x]);

    return object;
}

function questionOneHelper(num){
    if(num <= 1) return false;
    else for(i = 2; i < (num / 2); i++) if(num % i == 0) return false;
    
    return true;
}
//console.log(questionOneHelper(2));

const questionTwo = function questionTwo(arr) { 
    if(arr.length == 0) return 0;
    let x = 0;
    for(let a in arr) arr[a] = Math.pow(arr[a], 2);
    for(let b in arr) x += arr[b];
    x = Math.pow(x, 5);
    x = Math.sqrt(x);

    x = x.toFixed(2);
    return Number(x);
}

const questionThree = function questionThree(text) {
    // Inspired from https://stackoverflow.com/questions/37503929/javascript-counting-vowels-consonants-and-show-the-occurrance
    let object = {
        consonants: 0,
        vowels: 0,
        numbers: 0,
        spaces: 0,
        punctuation: 0,
        specialCharacters: 0
    };

    for(let x of text){
        if(x.match(/[aeiouAEIOU]/)) object.vowels++;
        else if(x.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/)) object.consonants++;
        else if (x.match(/[1234567890]/)) object.numbers++;
        else if (x.match(/[ ]/)) object.spaces++;
        else if (x.match(/[.,?!'":;{}[\]-—()]/)) object.punctuation++;
        // Using this to determine punctuation https://grammar.yourdictionary.com/punctuation/what/fourteen-punctuation-marks.html
        else object.specialCharacters++;
    }
    return object;
}

const questionFour = function questionFour(num1, num2,num3) {
    let P = num1;
    let R = num2 / 100 / 12;
    let N = num3 * 12;

    return Number((P * ((R * Math.pow(1 + R, N)) / (Math.pow(1+R,N)-1))).toFixed(2));
}

module.exports = {
    firstName: "Jerry", 
    lastName: "Cheng", 
    studentId: "10437904",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
