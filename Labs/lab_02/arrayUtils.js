/********************************************************
* arrayUtils.js
* 
* 
* Jerry Cheng
*********************************************************/
function checkArray(array){
    if(array === undefined) throw 'Error: No input error.';
    if(!Array.isArray(array)) throw 'Error: Input is not an array.';
    if(array.length == 0) throw 'Error: Input array is empty.';
    for(let a in array) if(typeof array[a] != 'number') throw 'Error: Array values not all numbers.';
}

function mean(array){
    checkArray(array);
    let x = 0;
    for(let a in array) x += array[a];
    return Number((x/array.length).toFixed(2));
}

//console.log(mean([1, 2, 3])); // Returns: 2
//console.log(mean([])) // throws an error
//console.log(mean("banana")); // throws an error
//console.log(mean(["guitar", 1, 3, "apple"])); // throws an error
//console.log(mean()); // throws an error

function medianSquared(array){
    // https://stackoverflow.com/questions/50563572/calc-median-javascript
    checkArray(array);

    let x = 0;
    array = array.sort();
    
    if(array.length % 2 === 0) x = (array[array.length/2-1]+array[array.length/2])/2;
    else x = array[Math.floor(array.length / 2)];

    return Number(Math.pow(x, 2).toFixed(2));
}

// console.log(medianSquared([1, 2, 4])); // Returns: 4
// console.log(medianSquared([])) // throws an error
// console.log(medianSquared("banana")); // throws an error
// console.log(medianSquared(1,2,3)); // throws an error
// console.log(medianSquared(["guitar", 1, 3, "apple"])); // throws an error
// console.log(medianSquared()); // throws an error

function maxElement(array){
    checkArray(array);
    let object = {};
    let max = 0, maxIndex = 0;

    for(let i = 0; i < array.length; i++){
        if(array[i] > max){
            max = array[i];
            maxIndex = i;
        }
    }
    object[max] = maxIndex;
    return object;
}

// console.log(maxElement([5, 6, 7])); // Returns: {'7': 2}
// console.log(maxElement(5, 6, 7)); // throws error
// console.log(maxElement([])); // throws error
// console.log(maxElement()); // throws error
// console.log(maxElement("test")); // throws error
// console.log(maxElement([1,2,"nope"])); // throws error

function fill(end, value){
    if(end === undefined) throw 'Error: no input.';
    if(typeof end != 'number') throw 'Error: input is not a number.';
    if(!Number.isInteger(end) || end <= 0) throw 'Error: input is not a positive integer'

    let array = [];

    if(value == null) 
        for(let i = 0; i < end; i++) array.push(i);
    else 
        for(let i = 0; i < end; i++) array.push(value);

    return array;
}

// console.log(fill(6)); // Returns: [0, 1, 2, 3, 4, 5]
// console.log(fill(3, 'Welcome')); // Returns: ['Welcome', 'Welcome', 'Welcome']
// console.log(fill()); // Throws error
// console.log(fill("test")); // Throws error
// console.log(fill(0)); // Throws Error
// console.log(fill(-4)); // Throws Error

function countRepeating(array){
    if(array === undefined) throw 'Error: no input.';
    if(!Array.isArray(array)) throw 'Error: Input is not an array.';
    for(let a in array) if(typeof array[a] != 'number' && typeof array[a] != 'string') throw 'Error: Array values not all strings or numbers.';

    let object = {};
    let count = 0, unique = '';
    if(array.length == 0) return object;

    array = array.sort();

    for(let a in array){
        if(unique != array[a]){
            if(count > 1) object[array[a-1]] = count;
            unique = array[a];
            count = 0;
        }
        if(unique == array[a]) count ++;
    }


    return object;
}

// console.log(countRepeating([7, '7', 13, "Hello","Hello", "hello"])); //Returns {'7': 2, Hello: 2}  
// console.log(countRepeating([7, '7', 13, true, null])); //Throws error
// console.log(countRepeating([(message)=>message, true, undefined, null])); //Throws error
// console.log(countRepeating([]));  //Returns {}
// console.log(countRepeating([1,2,3]));  //Returns {}

function isEqual(arrayOne, arrayTwo){
    if(arrayOne === undefined || arrayTwo === undefined) throw 'Error: not enough inputs'
    if(!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) throw 'Error: input is not an array.'
    
    if(arrayOne.length != arrayTwo.length) return false;

    arrayOne = arrayOne.sort();
    arrayTwo = arrayTwo.sort();

    for(let a in arrayOne){
        if(arrayOne[a] != arrayTwo[a]){
            if(Array.isArray(arrayOne[a]) && Array.isArray(arrayTwo[a])){
                if(!isEqual(arrayOne[a], arrayTwo[a]))
                    // Calls it recursively -> if its an array of array of arrays of...               
                    return false
            }
            else return false;
        }
    }
    return true;
}

// console.log(isEqual([1, 2, 3], [3, 1, 2])); // Returns: true
// console.log(isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z'])); // Returns: true
// console.log(isEqual([1, 2, 3], [4, 5, 6])); // Returns: false
// console.log(isEqual([1, 3, 2], [1, 2, 3, 4])); // Returns: false
// console.log(isEqual([1, 2], [1, 2, 3])); // Returns: false
// console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]])); // Returns: true
// console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]])); // Returns: false
// console.log(isEqual([null, null, null], [null, null, null])); // Returns: true

module.exports = {mean, medianSquared, maxElement, fill, countRepeating, isEqual};