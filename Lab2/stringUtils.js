// Call checkString to check that the input meets the check requirements
function checkString(str) {
    
    // Check that the string exists
    if (str === undefined)
        throw "Input of type string does not exist!";

    // Check that string is of proper type
    if (!(typeof str == 'string'))
        throw "Input must be type string!";

    if (str.length <= 0) 
        throw "Input string must have a length greater than 0!"

    // Check that the length of the string > 0
    // Looked up built in function to see if there
    // is something to use for whitespaces
    //found trim on MDN Web Docs
    if (str.trim().length == 0)
        throw "Input can not solely contain spaces!"
}



// Constructs a camel case version of the string based on whitespaces //
function camelCase(str) {
    checkString(str);
    // Puts string split by spaces into an array
    let splitString = str.split(" ");
    // Makes first character at that index uppercase
    // Slice the string so the rest of the str remains
    for (i = 0; i < splitString.length; i++) {
        splitString[i] = splitString[i].charAt(0).toUpperCase()
        + splitString[i].slice(1).toLowerCase();
    }
    let result = splitString.join('');
    return result.charAt(0).toLowerCase() + result.slice(1);;
}



// Helper function for replaceChar that replaces characters found on stackoverflow //
function replaceAt(str, i, replaceChar) {
    str = str.split('');
    str[i] = replaceChar;
    str = str.join('');
    return str;
}
// Replace characters in a string that are the same as the first char
// with an alternation of * and $ signs
function replaceChar(str) {
    checkString(str);

    // Identify the first char in the string
    // Initialize replaceChar
    const firstChar = str.charAt(0).toLowerCase();
    let replaceChar = "*"
    for (i = 1; i < str.length; i++) {
        if ((str.charAt(i).toLowerCase() == firstChar) && replaceChar == '*') {
            str = replaceAt(str, i ,replaceChar);
            replaceChar = '$';
        }
        else if ((str.charAt(i).toLowerCase() == firstChar) && replaceChar == "$") {
            str = replaceAt(str, i ,replaceChar);
            replaceChar = '*';
        }
    }
    return str;
}



// Checker function for mashUp //
function mashUpCheck (str1, str2) {
    // Check that both strings exists
    if ((str1 == undefined) || (str2 == undefined))
        throw 'Input of both strings need to exist!'

    // Check that string is of proper type
    if ((!(typeof str1 == 'string')) || (!(typeof str2 == 'string')))
        throw "Input must be type string!";

    // Check that the length of each string is at least 2 chars
    if ((str1.length < 2) || (str2.length < 2)) 
        throw "Input of string1 and string2 must be at least 2 char!"
}


// Returns the concatenation of two strings separated by a space; swaps first 2 chars //
function mashUp(str1, str2) {
    mashUpCheck(str1, str2);
    // Takes the first two chars of the second string
    // and appends them to the rest of the first.
    // Adds a space and vice vs for the other strs
    return (str2.substring(0,2) + str1.substring(2) + " " 
    + str1.substring(0,2) + str2.substring(2));
}





module.exports = {
    firstName: "Jessica", 
    lastName: "Noel", 
    studentId: "10445079",
    camelCase,
    replaceChar,
    mashUp
};
