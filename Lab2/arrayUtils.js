// Call checkArray to check that the input meets the check requirements
function checkArray(arr) {

     // Check that the array exists
    if (arr === undefined)
        throw "Input of type array does not exist!";

    // Check that the array is of the proper type
    if (!Array.isArray(arr))
        throw "Input must be type array!";

    // Check that the array is not empty
    if (arr.length === 0)
        throw "Input array can not be empty!";

    // Check that each array element is a number
    for (i = 0; i < arr.length; i++) {
        if (typeof(arr[i]) != "number") {
            throw "Each array element must be a number!";
        }
    }
}

// Used error checking in countRepeating(arr)
function checkArray2(arr) {
    // Check that the array exists
    if (arr === undefined)
        throw "Input of type array does not exist!";

    // Check that the array is of the proper type
    if (!Array.isArray(arr))
        throw "Input must be type array!";
}



// Finds the mean of an array //
function mean(arr) {
    checkArray(arr);
    let sum = 0;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}


// Finds the median squared of an array //
// Used TypedArray.prototype.sort() on MDN Web Docs to properly sort.
function medianSquared(arr) {
    checkArray(arr);

    // Properly sorts function
    arr.sort(function(a,b){
        return a - b;
    });
    
    // Checks if arr is odd 
    if (arr.length % 2 == 1) {
        let middleIndex = ((arr.length - 1) / 2);
        return arr[middleIndex] * arr[middleIndex];
    }  
    else {
        let middleIndex = (arr.length / 2);
        let middleNum = (arr[middleIndex] + arr[middleIndex - 1]) / 2;
        return middleNum * middleNum;
    }
}



// Finds the max element in an array //
function maxElement(arr) {
    checkArray(arr);
    let maxNum = arr[0];
    for (i = 1; i < arr.length; i++) {
        if (arr[i] > maxNum) maxNum = arr[i];
    }
    let numIndex = arr.indexOf(maxNum);
    
    // Returns the max element & index as a new obj
    // with obj key as maxNum & numIndex as obj val.
    const obj = {};
    obj[maxNum] = numIndex;
    return obj;
}



// Fill Error Checking //
function checkFill(end) {

    // Checks if end parameter exists
    if (end === undefined)
        throw "end parameter does not exist!";
    
    // Checks if end parameter is of proper type
    if (typeof(end) != "number")
        throw "end parameter is not of proper type - a number!";

    // Checks if end parameter is a positive number > 0
    if (end <= 0)
        throw "end parameter must be a positive number greater than 0!";

}

// Fill - Creates a new numbered array increasing from 0 to end num  (not included) //
function fill(end, value) {
    checkFill(end);
    let arr = [];

    if (value === undefined)
        for (i = 0; i < end; i++) {
            arr.push(i);
        }
    else
        for (i = 0; i < end; i++) {
            arr.push(value);
        }
    return arr;
}



// Returns an object with the count of each element that repeats in the array //
function countRepeating(arr) {
    checkArray2(arr);
    const obj = {};

    // If an empty array is passed in return empty object
    if (arr.length === 0) return obj;

    for (i = 0; i < arr.length; i++) {
        if (obj[arr[i]] >= 1) {
            obj[arr[i]]++;
        }
        else {
            obj[arr[i]] = 1;
        }
    }
    // Iterate through object
    for (let key in obj) {
        if (obj[key] == 1)
            delete obj[key];
    }
    return obj;
}



// Checks if two arrays are equal in size then sorts in ascending order
// Checks thats elements in the arrays are equal -> boolean
function isEqual(arrOne, arrTwo) {

    // Checks that the arrays exist
    if ((arrOne === undefined) || (arrTwo === undefined))
        throw "Both input arrays must exist!";
    
    // Checks that each array is of proper type
    if ((!Array.isArray(arrOne)) || (!Array.isArray(arrTwo)))
        throw "Both inputs must be type array!";

    // Sort the array and subarrays
    for (i = 0; i < arrOne.length; i++) {
        if(Array.isArray(arrOne[i])) {
            arrOne[i].sort(function(a, b) { 
            return a - b; });
            // console.log(arrOne[i]);
        }
    }

    // Sort the array and subarrays
    for (i = 0; i < arrTwo.length; i++) {
        if(Array.isArray(arrTwo[i])) {
            arrTwo[i].sort(function(a, b) { 
                return a - b; });
        }
    }
    
    // Convert the array to a string
    let arrOneString = arrOne.sort().toString();
    let arrTwoString = arrTwo.sort().toString();

    // Compare the string values
    return arrOneString === arrTwoString;
}



module.exports = {
    firstName: "Jessica", 
    lastName: "Noel", 
    studentId: "10445079",
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};