const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3])); 
// should return and output {'1': false, '2': true, '3': true}

console.log(lab1.questionOne([5, 3, 10])); 
//returns and outputs: {'5':true, '3': true, '10': false} 

console.log(lab1.questionOne([2])); 
// returns and outputs: {'2': true} 

console.log(lab1.questionOne([5, 10, 9])); 
//returns and outputs: {'5': true, '10': false, '9': false}

console.log(lab1.questionOne([2, 7, 9, 1013])); 
// returns and outputs: {'2': true, '7': true, '9': false, '1013': true}

console.log(lab1.questionOne([])); 
// returns and outputs: {}

console.log(lab1.questionOne([1, 6, 2])); 
//returns and outputs: {'1':false, '2': true, '6': false} 
console.log(lab1.questionOne([78, 66, 76])); 
//returns and outputs: { '66': false, '76': false, '78': false } 
console.log(lab1.questionOne([16, 21, 133])); 
//returns and outputs: { '16': false, '21': false, '133': false } 
console.log(lab1.questionOne([12512, 12, 10])); 
//returns and outputs: { '10': false, '12': false, '12512': false } 
console.log(lab1.questionOne([17123, 3, 81234])); 
//returns and outputs: { '3': true, '17123': true, '81234': false } 

console.log(lab1.questionTwo([1,2,3])); 
// should return and output 733.36 

console.log(lab1.questionTwo([5, 3, 10])); 
//returns and outputs: 207855.73

console.log(lab1.questionTwo([1,2,3])); 
// returns and outputs: 733.36 

console.log(lab1.questionTwo([5, 10, 9])); 
// returns and outputs: 609071.18

console.log(lab1.questionTwo([2, 7, 9])); 
//  returns and outputs: 207855.73

console.log(lab1.questionTwo([])); 
//returns and outputs: 0

console.log(lab1.questionTwo([1, 525, 9])); 
//  returns and outputs: 39913469588015.69
console.log(lab1.questionTwo([761, 124, 2])); 
//  returns and outputs: 272509391318838.56
console.log(lab1.questionTwo([32, 7, 98])); 
//  returns and outputs: 11779398296.22
console.log(lab1.questionTwo([152, 997, 2759])); 
//  returns and outputs: 218738677522547550
console.log(lab1.questionTwo([33, 22, 11])); 
//  returns and outputs: 118109142.1

console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// returns and outputs: {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("How now brown cow!!!"));
// returns and outputs: {consonants: 10, vowels: 4, numbers: 0, spaces: 3, punctuation: 3, specialCharacters: 0}

console.log(lab1.questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home. You know why? It was out of respect."));
//  returns and outputs: {consonants: 61, vowels: 36, numbers: 0, spaces: 22, punctuation: 5, specialCharacters: 0}

console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); 
// returns and outputs: {consonants: 40, vowels: 23, numbers: 3, spaces: 17, punctuation: 3, specialCharacters: 1}

console.log(lab1.questionThree("")); 
// returns and outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionThree("I am extremely hungry!")); 
// returns and outputs: {consonants: 12, vowels: 6, numbers:0, spaces: 3, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("Pizza sounds really good.")); 
// returns and outputs: {consonants: 13, vowels: 8, numbers:0, spaces: 3, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("To be, or not to be?")); 
// returns and outputs: {consonants: 7, vowels: 6, numbers:0, spaces: 5, punctuation: 2, specialCharacters: 0}
console.log(lab1.questionThree("Farts.")); 
// returns and outputs: {consonants: 4, vowels: 1, numbers:0, spaces: 0, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("Are smelly.")); 
// returns and outputs: {consonants: 6, vowels: 3, numbers:0, spaces: 1, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionFour(25000, 3.11, 5)); 
// Loan Amount: 25,000 , interest rate: 3.11% (0.0311), term: 5 years (5*12 = 60 monthly payments)
//returns and outputs: 450.44

console.log(lab1.questionFour(30000, 5, 6)); 
//returns and outputs: 483.15

console.log(lab1.questionFour(19500, 7, 3)); 
//returns and outputs: 602.10

console.log(lab1.questionFour(55000, 2, 6)); 
//returns and outputs: 811.27

console.log(lab1.questionFour(33000, 4.5, 2)); 
//returns and outputs: 1440.38

console.log(lab1.questionFour(1252, 12, 7)); 
//returns and outputs: 22.1
console.log(lab1.questionFour(60000, 1.5, 2)); 
//returns and outputs: 2539.25
console.log(lab1.questionFour(6969, 4.5, 2)); 
//returns and outputs: 304.18
console.log(lab1.questionFour(12312521, 2.5, 9)); 
//returns and outputs: 127429.13
console.log(lab1.questionFour(1612, 4.5, 2)); 
//returns and outputs: 70.36