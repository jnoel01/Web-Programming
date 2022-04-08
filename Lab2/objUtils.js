function makeArrays(objs) {

    // Checks that the array exits 
    if (objs === undefined)
        throw "Input of type array does not exist!";

    // Checks that the array is of proper type
    if (!Array.isArray(objs))
        throw "Input must be type array!";

    // Checks the array is not empty
    if (objs.length === 0)
        throw "Input array can not be empty!";

    // Checks that each element in the array is an object
    for (i = 0; i < objs.length; i++) {
        if (!(typeof objs[i] === 'object')) {
            throw "Each element in the array must be an object!"
        }
    }

    // Checks that each object in the array is not an empty object
    for (i = 0; i < objs.length; i++) {
        if (Object.keys(objs[i]).length === 0) {
            throw "Each element in the array must be an object!"
        }
    }

    // Checks that there are at least 2 objs in the array
    if (objs.length < 2)
        throw "There must be at least 2 elements in the array!"

    var newArr = [];
    for (var i = 0; i < objs.length; i++) {
      var objArray = Object.entries(objs[i]);
      // Go through array of objects and pull
      // then push into new array
      for (var j = 0; j < objArray.length; j++) {
          newArr.push(objArray[j]);
      }
    }
}



// Checks each field at every level deep for equality of objs //
function isDeepEqual(obj1, obj2) {

    // Checks that obj1 and obj2 exist
    if ((obj1 === undefined) || (obj2 === undefined))
        throw "Both input objects must exist!"

    // Checks that obj1 and obj2 are proper type
    if ((!(typeof obj1 == 'object')) || (!(typeof obj2 == 'object')))
        throw "Both inputs must be of proper type object!"

    // Create tracker to remain true until fields are not equal
    tracker = true;
   for (key in obj1) {
        // Check if keys have obj val, if so then recursively check that those obj are equal
       if ((typeof obj1[key] == 'object') && (typeof obj2[key] == 'object')) {
        tracker = tracker && isDeepEqual(obj1[key], obj2[key]);
       }
       // If any set of obj is not equal return false
       if (obj1[key] != obj2[key])
           return false;
   }
   // Returns the result of 'anding' all val tracks from each recursive loop
   return tracker;
}


// Evaluates the function on the values of the object //
function computeObject(obj, func) {

    // Checks that the object exists
    if (obj == "undefined")
        throw "Input object does not exist!";

    // Checks if the function exists
    if (func == "undefined")
        throw "Input function does not exist!";
    
    // Checks the the object is a proper type
    if (!(typeof obj == 'object'))
        throw "Input must be proper type Object!";
    
    // Checks if the function is a proper type
    if (!(typeof func == 'function'))
        throw "Input must be proper type function!";

    // Checks that the obj values are all numbers
    for (key in obj) {
        if (!(typeof obj[key] == 'number'))
            throw "Object values must all be numbers!";
    }

    // Iterates through object with keys
    // Gets values -> goes trhough func
    // Replaces original value in obj
    for (key in obj) {
        let newNum = func(obj[key]);
        obj[key] = newNum;
    }
    return obj;
}





module.exports = {
    firstName: "Jessica", 
    lastName: "Noel", 
    studentId: "10445079",
    makeArrays,
    isDeepEqual,
    computeObject
};