/*
    Jerry Cheng 10437904
    CS-546 Lab 03
    people.js
*/
const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    //console.log(typeof(data));
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}

function findLowestID(object){
    let result = 0;

    for(let i in object){
        if(object[i].id < result) result = object[i].id;
    }

    return result;
}

function findHighestID(object){
    let result = 0;

    for(let i in object){
        if(object[i].id > result) result = object[i].id;
    }

    return result;
}

async function getPersonByID(id){
    if(id == undefined) throw 'Error: ID is undefined.';
    if(typeof id != 'number') throw 'Error: ID is not a number.';

    let peopleData = await getPeople();

    if(id < findLowestID(peopleData) || id > findHighestID(peopleData)) throw 'Error: ID is out of bounds.'
    // Doing lowest & highest bounds instead of checking if id<0 or id>length covers data being negative ids, or if there are
    // irregularities in the id data range i.e. avail. ids = 0,1,2,3,4,5,6,7,8,9; length = 10 but asking for ID 10 won't work

    //console.log(findLowestID(peopleData));
    //console.log(findHighestID(peopleData));

    // https://www.codevscolor.com/javascript-find-object-in-array#:~:text=JavaScript%20program%20to%20find%20if%20an%20object%20is,of%20different%20methods%20that%20makes%20it%20more%20easier.
    let person = peopleData.find((person) => person.id === id);    

    if(!person) throw `Error: Person with ID ${id} not found.`

    return person;
}

// getPersonByID(10).then(res => console.log(res))

async function howManyPerState(stateAbbrev){
    if(stateAbbrev == undefined) throw 'Error: stateAbbrev is undefined.';
    if(typeof stateAbbrev != 'string') throw 'Error: stateAbbrev is incorrect type: not a string.'
    stateAbbrev = stateAbbrev.trim();

    const stateAbrevCopy = stateAbbrev;
    let count = 0;
    let peopleData = await getPeople();

    for(let a in peopleData){
        if((peopleData[a].address.state).toUpperCase() == stateAbbrev.toUpperCase()){
            count++;
        }
    }

    if(count == 0) throw `Error: nobody lives in ${stateAbrevCopy}!`;

    return count;
}

// howManyPerState('WY').then(res => console.log(res))

async function personByAge(index){
    if(index == undefined) throw 'Error: Index is undefined.'
    if(typeof index != 'number') throw 'Error: Index is not a number.'

    let peopleData = await getPeople();

    if(index < 0 || index > peopleData.length - 1) throw 'Error: index is out of bounds.'

    // https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
    // data.sort((a, b) => {
    //     return -a.id + b.id;
    // });

    peopleData.sort((a, b) => {
        return new Date(a.date_of_birth) - new Date(b.date_of_birth)
    });



    person = peopleData[index];
    let result = {};

    // Validate date proper format:
    // https://www.w3resource.com/javascript/form/javascript-date-validation.php
    if(!person.date_of_birth) throw 'Error: Person does not have a birth date.'
    let regularExpression = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if(!(person.date_of_birth).match(regularExpression)) throw 'Error: Person date of birth of improper format. Correct format: MM/DD/YYYY.'

    // Calculating age script chunk from:
    // https://www.javatpoint.com/calculate-age-using-javascript
    let dob = new Date(person.date_of_birth);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date (month_diff);
    let year = age_dt.getUTCFullYear();
    person.age = Math.abs(year - 1970)

    result = {
        first_name: person.first_name,
        last_name: person.last_name,
        date_of_birth: person.date_of_birth,
        age: person.age
    };

    return result;
}

//personByAge(0).then(res => console.log(res))

function countLetters(text){
    // Inspired from https://stackoverflow.com/questions/37503929/javascript-counting-vowels-consonants-and-show-the-occurrance
    // Grabbed from lab 01
    let letters = 0;

    for(let x of text){
        if(x.match(/[aeiouAEIOUbcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/)) letters++;
    }

    return letters;
}

function countVowels(text){
    // Inspired from https://stackoverflow.com/questions/37503929/javascript-counting-vowels-consonants-and-show-the-occurrance
    let vowels = 0;

    for(let x of text){
        if(x.match(/[aeiouAEIOU]/)) vowels++;
    }

    return vowels;
}

function countConsonants(text){
    // Inspired from https://stackoverflow.com/questions/37503929/javascript-counting-vowels-consonants-and-show-the-occurrance
    let consonants = 0;

    for(let x of text){
        if(x.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/)) consonants++;
    }

    return consonants;
}

async function peopleMetrics(){
    let peopleData = await getPeople();

    /*
    {
        totalLetters: sum of all the letters in all the first and last names combined (full names),
        totalVowels: sum of all the vowels in all the first and last names combined (full names),
        totalConsonants: sum of all the consonants in all the first and last names combined (full names),
        longestName: The longest name in the list (full name, so: first and last name combined),
        shortestName: The shortest name in the in the list (full name, so: first and last name combined)
        mostRepeatingCity: the name of the city that appears most in the list,
        averageAge: The average age of everyone in the list
    }
    */
    let metrics = {
        totalLetters: 0,
        totalVowels: 0,
        totalConsonants: 0,
        longestName: '',
        shortestName: '',
        mostRepeatingCity: '',
        averageAge: 0,
    }

    // Letter Counters
    for(let a in peopleData){
        metrics.totalLetters += (countLetters(peopleData[a].first_name) + countLetters(peopleData[a].last_name));
        metrics.totalConsonants += (countConsonants(peopleData[a].first_name) + countConsonants(peopleData[a].last_name));
        metrics.totalVowels += (countVowels(peopleData[a].first_name) + countVowels(peopleData[a].last_name));
        //metrics.totalLetters = metrics.totalConsonants + metrics.totalVowels;
    }

    // Shortest & Longest Name
    for(let a in peopleData){
        if(((countLetters(peopleData[a].first_name) + countLetters(peopleData[a].last_name)) > countLetters(metrics.longestName)) 
                || metrics.longestName == ''){
                    metrics.longestName = `${peopleData[a].first_name} ${peopleData[a].last_name}`
                }
        if(((countLetters(peopleData[a].first_name) + countLetters(peopleData[a].last_name)) < countLetters(metrics.shortestName)) 
                || (metrics.shortestName == '')){
                    metrics.shortestName = `${peopleData[a].first_name} ${peopleData[a].last_name}`
                }
    }

    // Cities
    let cities = {};

    // Adding city data into cities object
    for(let a in peopleData){
        if(!(peopleData[a].address.city in cities)){
            cities[peopleData[a].address.city] = 1;
        }
        else{
            cities[peopleData[a].address.city]++;
        }
    }
    // Finding highest population city
    // https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
    metrics.mostRepeatingCity = (Object.keys(cities).reduce(function(a, b){ return cities[a] > cities[b] ? a : b }));

    // Average age
    let total_age = 0;
    let people_counter = 0;

    for(let a in peopleData){
        let dob = new Date(peopleData[a].date_of_birth);
        let month_diff = Date.now() - dob.getTime();
        let age_dt = new Date (month_diff);
        let year = age_dt.getUTCFullYear();
        total_age += Math.abs(year - 1970)
        people_counter++;
    }
    
    metrics.averageAge = Number((total_age / people_counter).toFixed(2));

    return metrics;
}

module.exports = {getPeople, getPersonByID, howManyPerState, personByAge, peopleMetrics};