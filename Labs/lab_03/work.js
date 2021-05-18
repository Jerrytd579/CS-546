/*
    Jerry Cheng 10437904
    CS-546 Lab 03
    work.js
*/
const axios = require('axios');
const people = require('./people');

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}

async function listEmployees(){
    let workData = await getWork();
    let outerArray = [];

    for(let company in workData){
        let companyObject = {
                                company_name: workData[company].company_name,
                                employees: []
                            };

        for(let employeeID in workData[company].employees){
            let person = await people.getPersonByID(workData[company].employees[employeeID]);
            let employee = {
                first_name: person.first_name,
                last_name: person.last_name
            }
            companyObject.employees.push(employee);
        }
        outerArray.push(companyObject);
        //console.log(companyObject);
    }
    return outerArray;
}

//listEmployees().then(res => console.log(JSON.stringify(res)));

async function fourOneOne(phoneNumber){
    if(phoneNumber == undefined) throw 'Error: phoneNumber is undefined.';
    if(typeof phoneNumber != 'string') throw 'Error: phoneNumber must be type string.'
    phoneNumber = phoneNumber.trim();

    // Phone number validation
    // https://www.w3resource.com/javascript/form/phone-no-validation.php
    let regularExpression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!phoneNumber.match(regularExpression)) throw 'Error: phone number is of improper format. Proper type: ###-###-####'

    let workData = await getWork();

    let resultObject = {}
    for(let company in workData){
        if(workData[company].company_phone == phoneNumber){
            resultObject.company_name = workData[company].company_name;
            resultObject.company_address = workData[company].company_address;
        }
    }

    // Check if object is empty
    // https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    if(isEmpty(resultObject)) throw 'Error: Company was not found.';

    return resultObject;
}

async function whereDoTheyWork(ssn){
    if(ssn == undefined) throw 'Error: ssn is undefined.';
    if(typeof ssn != 'string') throw 'Error: ssn must be type string.'
    ssn = ssn.trim();

    // Phone number validation, slightly modified
    // https://www.w3resource.com/javascript/form/phone-no-validation.php
    let regularExpression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{4})$/;
    if(!ssn.match(regularExpression)) throw 'Error: ssn is of improper format. Proper type: ###-##-####'

    let peopleData = await people.getPeople();
    let workData = await getWork();

    // https://www.codevscolor.com/javascript-find-object-in-array#:~:text=JavaScript%20program%20to%20find%20if%20an%20object%20is,of%20different%20methods%20that%20makes%20it%20more%20easier.
    let person = peopleData.find((person) => person.ssn == ssn);    

    if(!person) throw 'No one exists with that SSN.';

    // Another search by ID, only on workData
    let company = workData.find((company) => company.employees.includes(person.id));

    if(!company) throw `${person.first_name} ${person.last_name} does not work anywhere.`

    return `${person.first_name} ${person.last_name} works at ${company.company_name}.`
}

module.exports = {getWork, listEmployees, fourOneOne, whereDoTheyWork};