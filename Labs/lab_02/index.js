/********************************************************
* index.js
* 
* 
* Jerry Cheng
*********************************************************/
const arrayUtils = require('./arrayUtils');
const objUtils = require('./objUtils');
const stringUtils = require('./stringUtils');

// arrayUtils.js tests

// Mean Tests
try{
    const mean1 = arrayUtils.mean([1,0,0]);
    console.log(`mean passed sucessfully: mean is: ${mean1}`)
} catch(e){
    console.error(`mean failed test case: this should not happen: ${e}`)
}
try{
    // Should fail
    const mean2 = arrayUtils.mean([1, 2, 3, 'reee']);
    console.error('mean did not error: this should not happen')
} catch(e){
    console.error(`mean failed successfully: ${e}`)
}

// Median Squared tests
try{
    const medianSquared1 = arrayUtils.medianSquared([1,2,3,4,5,6]);
    console.log(`median squared passed successfully: median squared is : ${medianSquared1}`)
} catch(e){
    console.error(`median squared failed test case: this should not happen: ${e}`);
}
try{ // Should fail
    const medianSquared2 = arrayUtils.medianSquared([]);
    console.error('median squared did not error: this should not happen');
} catch(e){
    console.error(`median squared failed successfully: ${e}`);
}

// maxElement tests
try{
    const maxElement1 = arrayUtils.maxElement([5, 6, 7]);
    console.log('maxElement passed successfully: maxElement is: ', maxElement1);
} catch(e){
    console.error(`maxElement failed test case: this should not happen: ${e}`);
}
try{ // Should fail 
    const maxElement2 = arrayUtils.maxElement(1,2,3);
    console.error('maxElement did not error: this should not happen');
} catch(e){
    console.error(`maxElement failed successfully: ${e}`);
}

// fill tests
try{
    const fill1 = arrayUtils.fill(5, 'steve');
    console.log('fill passed successfully: filled array is:', fill1);
} catch(e){
    console.error(`fill failed test case: this should not happen: ${e}`);
}
try{ // Should fail
    const fill2 = arrayUtils.fill();
    console.log('fill did not error: this should not happen');
} catch(e){
    console.error(`fill failed successfully: ${e}`);
}

// countRepeating tests
try{
    const countRepeating1 = arrayUtils.countRepeating([]);
    // 7, '7', 13, "Hello","Hello", "hello", '13', 26, 26, 26, 50, 67, 'Bob', 'Bob', 'Bob'
    console.log('countRepeating passed successfully: repeats are:', countRepeating1);
} catch(e){
    console.error(`fill failed test case: this should not happen: ${e}`);
}
try{ // Should fail
    const countRepeating2 = arrayUtils.countRepeating();
    console.log('countRepeating did not error: this should not happen');
} catch(e){
    console.error(`countRepeating failed successfully: ${e}`);
}

// isEqual tests
try{
    const isEqual1 = arrayUtils.isEqual([1, [12, [15, 3]]],[1, [12, [3, 15]]]);
    console.log('isEqual passed successfully: returns: ', isEqual1);
} catch(e){
    console.error(`isEqual failed test case: this should not happen ${e}`);
}
try{ // Should fail
    const isEqual2 = arrayUtils.isEqual([1]);
    console.log('isEqual did not error: this should not happen')
} catch(e){
    console.error(`isEqual failed successfully: ${e}`);
}

// stringUtils.js tests

// test camelCase
try{
    const camelCase1 = stringUtils.camelCase('How now brown cow');
    console.log('camelCase passed successfully: returns: ', camelCase1);
} catch(e){
    console.error(`camelCase failed test case: this should not happen ${e}`);
}
try{ // Should fail
    const camelCase2 = stringUtils.camelCase(123);
    console.log('camelCase did not error: this should not happen');
} catch(e){
    console.error(`camelCase failed successfully: ${e}`);
}

// test replaceChar
try{
    const replaceChar1 = stringUtils.replaceChar('Daddy');
    console.log('replaceChar passed successfully: returns: ', replaceChar1);
} catch(e){
    console.error(`replaceChar failed test case: this should not happen ${e}`);
}
try{ // Should fail
    const replaceChar2 = stringUtils.replaceChar(123);
    console.log('replaceChar did not error: this should not happen');
} catch(e){
    console.error(`replaceChar failed successfully: ${e}`);
}

// test mashUp
try{
    const mashUp1 = stringUtils.mashUp('Patrick', 'Hill');
    console.log('mashUp passed successfully: returns: ', mashUp1);
} catch(e){
    console.error(`mashUp failed test case: this should not happen ${e}`);
}
try{ // Should fail
    const mashUp2 = stringUtils.mashUp('h', 'hello');
    console.log('mashUp did not error: this should not happen');
} catch(e){
    console.error(`mashUp failed successfully: ${e}`);
}

// objUtils.js tests

// test makeArrays
try{
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const makeArrays1 = objUtils.makeArrays([first, second, third]);
    console.log('makeArrays passed successfully: returns: ', makeArrays1);
} catch(e){
    console.error(`makeArrays failed test case: this should not happen ${e}`);
}
try{ // Should fail
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { };
    const fourth = 'test'
    const makeArrays2 = objUtils.makeArrays([second, third]);
    console.log('makeArrays did not error: this should not happen');
} catch(e){
    console.error(`makeArrays failed successfully: ${e}`);
}

// test isDeepEqual
try{
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    const isDeepEqual1 = objUtils.isDeepEqual(forth, fifth);
    console.log('isDeepEqual passed successfully: returns: ', isDeepEqual1);
} catch(e){
    console.error(`isDeepEqual failed test case: this should not happen ${e}`);
}
try{ // Should fail
    const sixth = 'test';
    const seventh = {};
    // const isDeepEuql2 = objUtils.isDeepEqual(seventh);
    const isDeepEuql2 = objUtils.isDeepEqual(sixth, seventh);
    console.log('isDeepEqual did not error: this should not happen');
} catch(e){
    console.error(`isDeepEqual failed successfully: ${e}`);
}

// test computeObject
try{
    const computeObject1 = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject passed successfully: returns: ', computeObject1)
} catch(e){
    console.error(`computeObject failed test case: this should not happen ${e}`);
}
try{ // Should fail
    //const computeObject2 = objUtils.computeObject({a: 'test'}, n => n * 2);
    //const computeObject2 = objUtils.computeObject({a: 2});
    //const computeObject2 = objUtils.computeObject('test', n => n * 2);
    const computeObject2 = objUtils.computeObject({}, n => n * 2);
    console.log('computeObject did not error: this should not happen');
} catch(e){
    console.error(`computeObject failed successfully: ${e}`);
}