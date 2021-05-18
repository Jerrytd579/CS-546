/********************************************************
* stringUtils.js
* 
* 
* Jerry Cheng
*********************************************************/
function stringChecker(string){
    if(string == undefined) throw 'Error: no input.';
    if(string.length <= 0) throw 'Error: string length is not greater than 0';
    if(typeof(string) != 'string') throw 'Error: input is not a string';
    if(string.trim() == '') throw 'Error: string is only white space';
}

function camelCase(string){
    stringChecker(string);
    // https://stackoverflow.com/questions/7743582/trying-to-capitalize-the-first-character-in-array-of-strings-why-this-is-not-wo
    if(/\d/.test(string)) throw 'Error: string cannot contain numbers';

    string = string.toLowerCase();
    splitString = string.split(' ');

    for(let i = 1; i < splitString.length; i++) splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substr(1);
    //console.log(splitString);
    //console.log(joinedString);
    
    return joinedString = splitString.join("");
}

//console.log(camelCase("my   function rocks"))
// console.log(camelCase('my function rocks')); // Returns: "myFunctionRocks"
// console.log(camelCase('FOO BAR')); // Returns: "fooBar"
// console.log(camelCase("How now brown cow")); // Returns: "howNowBrownCow"
// console.log(camelCase()); // Throws Error
// console.log(camelCase('   ')); // Throws Error
// console.log(camelCase(123)); // Throws Error
// console.log(camelCase(["Hello", "World"])); // Throws Error

function replaceChar(string){
    stringChecker(string);

    string = string.trim();
    let startingCharacter = string.charAt(0);
    splitString = string.split('');
    nextInstanceFlag = 0;

    for(let i = 1; i < splitString.length; i++){
        if(splitString[i].toLowerCase() == (startingCharacter).toLowerCase()){
            if(nextInstanceFlag == 0){
                splitString[i] = '*';
                nextInstanceFlag = 1;
            }
            else if(nextInstanceFlag == 1){
                splitString[i] = '$'
                nextInstanceFlag = 0;
            }
        }
    }
    x = splitString.join('');    

    return x;
}

// console.log(replaceChar("Daddy")); // Returns: "Da*$y"
// console.log(replaceChar("            Mommy")); // Returns: "Mo*$y" 
// console.log(replaceChar("Hello, How are you? I hope you are well")); // Returns: "Hello, *ow are you? I $ope you are well"
// console.log(replaceChar("babbbbble")); // Returns: "ba*$*$*le"
// replaceChar(""); // Throws Error
// replaceChar(123); // Throws Error

function mashUp(string1, string2){
    if(string1 == undefined || string2 == undefined) throw 'Error: input(s) missing.';
    if(typeof string1 != 'string' || typeof string2 != 'string') throw 'Error: input(s) is not a string.';
    if(string1.length < 2 || string2.length < 2) throw 'Error: input(s) must be at least 2 characters long.';
    if(string1.trim() == '' || string2.trim() == '') throw 'Error: strings must not be only white space.';

    string1 = string1.trim();
    string2 = string2.trim();

    let temp1 = string1.charAt(0);
    let temp2 = string1.charAt(1);
    let temp3 = string2.charAt(0);
    let temp4 = string2.charAt(1);

    let newString1 = temp3+temp4+string1.substr(2);
    let newString2 = temp1+temp2+string2.substr(2);

    return `${newString1} ${newString2}`;
}

// console.log(mashUp("Patrick", "Hill")); //Returns "Hitrick Pall"
// console.log(mashUp("hello", "world")); //Returns "wollo herld"
// console.log(mashUp("Patrick", "")); //Throws error
// console.log(mashUp()); // Throws Error
// console.log(mashUp("John")) // Throws error
// console.log(mashUp ("h", "Hello")) // Throws Error
// console.log(mashUp ("h","e")) // Throws Error

module.exports = {camelCase, replaceChar, mashUp};
