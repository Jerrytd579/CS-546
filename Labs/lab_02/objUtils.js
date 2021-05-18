/********************************************************
* objUtils.js
* 
* 
* Jerry Cheng
*********************************************************/
function makeArrays(objects){
    if(objects == undefined) throw 'Error: no input.';
    if(!Array.isArray(objects)) throw 'Error: input must be an array.';
    if(objects.length < 2) throw 'Error: input must contain at least 2 elements.';

    for(let a of objects){
        if (typeof a != 'object') throw 'Error: all elements of array must be an object.';
        if (Object.keys(a).length == 0) throw 'Error: no objects can be empty.'
    }

    let array = [];

    for(let items of objects){
        for(let keys in items) array.push([keys, items[keys]]);
    }

    return array;
}

// const first = { x: 2, y: 3};
// const second = { a: 70, x: 4, z: 5 };
// const third = { x: 0, y: 9, q: 10 };
// const fourth = {};

// const firstSecondThird = makeArrays([first, second, third]);
// // [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
// console.log(firstSecondThird)
// const secondThird = makeArrays([second, third]);
// // [ ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
// console.log(secondThird)
// const thirdFirstSecond = makeArrays([third, first, second]);
// // [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]
// console.log(thirdFirstSecond)

function isDeepEqual(obj1, obj2){
    if(obj1 == undefined || obj2 == undefined) throw 'Error: not enough inputs.'
    if(typeof obj1 != 'object' || typeof obj2 != 'object') throw 'Error: input objects must be objects.'

    if(obj1.length != obj2.length) return false;

    for(let a in obj1){
        if(obj1[a] != obj2[a]){
            if(typeof obj1[a] == 'object' && typeof obj2[a] == 'object'){
                if(!isDeepEqual(obj1[a], obj2[a])) 
                    return false;
            }
            else return false;
        }
    }
    return true;
}

// const first = {a: 2, b: 3};
// const second = {a: 2, b: 4};
// const third = {a: 2, b: 3};
// const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
// const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
// console.log(isDeepEqual(first, second)); // false
// console.log(isDeepEqual(forth, fifth)); // true
// console.log(isDeepEqual(forth, third)); // false
// console.log(isDeepEqual({}, {})); // true

function computeObject(object, func){
    if(object == undefined) throw 'Error: object must be inputted.';
    if(func == undefined) throw 'Error: function must be inputted.';
    if(typeof object != 'object') throw 'Error: first input must be an object.';
    if(typeof func != 'function') throw 'Error: function must be a function.';
    if(Object.keys(object).length == 0) throw 'Error: object must have at least one key or value.'

    for(let a in object) {
        if(typeof object[a] != 'number') throw 'Error: all values for each key in the object must be numbers';
    }

    for(let b in object){
        object[b] = func(object[b]);
    }

    return object;
    
}

//console.log(computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
/* Returns:
{
  a: 6,
  b: 14,
  c: 10
}
*/

module.exports = {makeArrays, isDeepEqual, computeObject};