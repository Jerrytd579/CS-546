/*
    Jerry Cheng 10437904
    CS-546 Lab 03
    app.js: Lab test file
*/
const people = require("./people");
const work = require("./work");

async function main(){
    console.log("#--------------------------------getPeople Tests--------------------------------#")
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    console.log("#--------------------------------getWork Tests--------------------------------#")
    try{
        const workdata = await work.getWork();
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    console.log("#--------------------------------getPersonByID Tests--------------------------------#")
    try{
        let thing = await people.getPersonByID(43);
        console.log('getPersonByID passed successfully: ')
        console.log(thing);
    }catch(e){
        console.log(`getPersonByID failed: this should not happen ${e}`)
    }
    // Should fail
    try{
        // let idTest;
        // let idTest = 10000000000000000000;
        let idTest = -5;
        let thing = await people.getPersonByID(idTest);
        console.log('getPersonByID did not error: this should not happen:');
        console.log(thing);
    }catch(e){
        console.log(`getPersonByID failed successfully: ${e}`);
    }
    console.log("#--------------------------------howManyPerState Tests--------------------------------#")
    try{
        //let state = 'NY';
        let state = 'CO';
        let pop = await people.howManyPerState(state);
        console.log(`howManyPerState passed successfully: `)
        console.log(pop);

    }catch(e){
        console.log(`howManyPerState failed: this should not happen ${e}`);
    }
    // Should fail
    try{
        //let state;
        let state = 'WY';
        //let state = -1;
        let pop = await people.howManyPerState(state);
        console.log(`howManyPerState did not error: this should not happen: ${pop}`);
    }catch(e){
        console.log(`howManyPerState failed successfully: ${e}`);
    }
    console.log("#--------------------------------personByAge Tests--------------------------------#")
    try{
        let index = 0;
        let result = await people.personByAge(index);
        console.log('personByAge passed successfully: ')
        console.log(result);
    }catch(e){
        console.log(`personByAge failed: this should not happen: ${e}`);
    }
    // Should fail
    try{
        let index = -1;
        let result = await people.personByAge(index);
        console.log('personByAge did not error: this should not happen: ')
        console.log(result);
    }catch(e){
        console.log(`personByAge failed successfully: ${e}`);
    }
    console.log("#--------------------------------peopleMetrics Tests--------------------------------#")
    try{
        let peopledata = await people.peopleMetrics();
        console.log(peopledata);
    }catch(e){
        console.log(e);
    }
    console.log("#--------------------------------listEmployees Tests--------------------------------#")
    // Commented because this takes a while.
     try{
         let listEmployees = await work.listEmployees();
         console.log(JSON.stringify(listEmployees));
     }catch(e){
         console.log(e);
     }
    console.log("#--------------------------------fourOneOne Tests--------------------------------#")
    try{
        let number = '240-144-7553';
        let result = await work.fourOneOne(number);
        console.log('fourOneOne passed successfully: ')
        console.log(result);
    }catch(e){
        console.log(`fourOneOne failed: this should not happen ${e}`);
    }    
    // Should fail
    try{
        //let number = 43;
        let number = '212-208-8374'
        let result = await work.fourOneOne(number);
        console.log('fourOneOne did not error: this should not happen: ')
        console.log(result);
    }catch(e){
        console.log(`fourOneOne failed successfully: ${e}`);
    }        
    console.log("#--------------------------------whereDoTheyWork--------------------------------#")
    try{
        //let ssn = '299-63-8866';
        let ssn = '277-85-0056'
        let result = await work.whereDoTheyWork(ssn);
        console.log('whereDoTheyWork passed successfully: ')
        console.log(result);
    }catch(e){
        console.log(`whereDoTheyWork failed: this should not happen: ${e}`);
    }        
    try{
        //let number = 43;
        //let ssn;
        //let ssn = "1298791879";
        let ssn = "264-67-0084";
        let result = await work.whereDoTheyWork(ssn);
        console.log('whereDoTheyWork did not error: this should not happen: ')
        console.log(result);
    }catch(e){
        console.log(`whereDoTheyWork failed successfully: ${e}`);
    } 
}

//call main
main();