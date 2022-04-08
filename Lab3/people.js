const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data // this will be the array of people objects
}




// ***     GET PERSON BY ID     *** //
const getPersonById = async function getPersonById(id) {
    const data = await getPeople();
    // Checks that the input id exists
    if (id === undefined)
        throw "Input does not exist!";

    // Checks that the id parameter is of proper type: string
    if (!(typeof id == 'string'))
        throw "Input id must be a string!";
    
    // Checks if the id is empty spaces
    if (id.trim().length === 0)
        throw "Input id can not just be empty spaces!";
    
    // Checks if the id is found in the array of people
    // if its found return the value
    for (let key of data) {
        if (key.id == id) {
            return key;
        }
    }
    throw "person not found";
}




// ***     SAME EMAIL     *** //
const sameEmail = async function sameEmail(emailDomain) {
    const data = await getPeople();

    // Checks that the emailDomain parameter exists
    if (emailDomain === undefined)
        throw "Input does not exist!";
    
    // Checks that emailDomain is of proper type- string
    if (!(typeof emailDomain == 'string'))
        throw "Input emailDomain must be a string!";

    // Checks that emailDomain isnt just empty space
    if (emailDomain.trim().length === 0)
        throw "Input emailDomain can not just be empty spaces!"
    
    // Checks that emailDomain contains a dot
    if (!(emailDomain.includes(".")))
        throw "Input emailDomain must contains a dot!"
    
    let index = 0;
    // Checks that emailDomain has least 2 letters
    for (let i = 0; i < emailDomain.length; i++) {
        if (emailDomain[i] == '.')
            index = i;
    }

    let extent = (emailDomain.slice(index, emailDomain.length))

    // Checks that the emailEx is not numbers
    if (extent.length < 2) {
        throw "Domain must have at least two letters after each dot!"
    }
    // Regex taken from StackOverflow
    if (extent.match(/\d+/g) != null) {
        throw "Extension can not have numbers in it!"
    }

    // Checks if email exists

    var holdingArray = [];
    
    for (let key of data) {
        // Slice data string after @ sign
        for (let i = 0; i < key.email.length; i++) {
            if (key.email[i] == '@')
                index = i + 1;
        }
        // Slice key after @ sign and see if the input is equal
        let slicedKey = key.email.slice(index, key.email.length);
        if (slicedKey == emailDomain) {
            holdingArray.push(key);
        }
    }
    if (holdingArray.length < 2) {
        throw "No one has this email domain!"
    }
    return holdingArray;
}




// ***     MANIPULATE IP    *** //
const manipulatelp = async function manipulatelp() { 
    const data = await getPeople();
    let newArr = new Array();
    let sortedIP = [];
    let stringsortIP = '';
    let numsortIP = 0;


    // Convert the IP to numbers
    for (let key of data) {
        let ipNumber = key.ip_address.replaceAll('.','');
        sortedIP = ipNumber.split('').sort();

        // Change each sortedIP to a string
        stringsortIP = sortedIP.toString().replaceAll(',','');
        
        // Change eaxh stringsortIP to a number
        numsortIP = Number(stringsortIP);

        // Push numbers into arr
        newArr.push(numsortIP);
    }
    // Sorts array taken func from my lab 2
    newArr.sort(function(a, b) { 
        return a - b; });
    
    // Finds the highest value
    let maxNum = newArr[newArr.length-1];

    // Finds the lowest value
    let minNum = newArr[0];

    // Initialize sum
    let sum = 0;
    let highestName = {}; 
    let lowestName = {};

    for (let key of data) {
        let ipNumber = key.ip_address.replaceAll('.','');
        sortedIP = ipNumber.split('').sort();

        // Change each sortedIP to a string
        stringsortIP = sortedIP.toString().replaceAll(',','');
        
        // Change eaxh stringsortIP to a number
        numsortIP = Number(stringsortIP);

        if (maxNum === numsortIP) {
            highestName = { firstName: key.first_name, lastName: key.last_name };
        }
        if (minNum == numsortIP) {
            lowestName = { firstName: key.first_name, lastName: key.last_name };
        }

        // Finds the average of the lowest and highest numbers
        sum += Math.floor(numsortIP);
    }
    let average = Math.floor(sum / data.length);

    const obj = { highest: highestName, lowest: lowestName, average: average };
    return obj;
}




// ***     SAME BIRTHDAY     *** //
const sameBirthday = async function sameBirthday(month, day) {
    const data = await getPeople();

    if (isNaN(parseInt(month)))
       throw  "Input, month, must be of type number!";
    
    if (isNaN(parseInt(day)))
        throw "Input, day, must be of type number!";

    const monthReal = parseInt(month);
    const dayReal = parseInt(day);

    // Checks that the month and day parameter exists
    if (monthReal === undefined)
        throw "Input, month, does not exist!";
    if (dayReal === undefined)
        throw "Input, day, does not exist!";

    // Checks that the month and day are of proper type
    if (typeof monthReal != 'number')
        throw "Input, month, must be of type number!";
    if (typeof dayReal != 'number')
        throw "Input, month, must be of type number!";

    // Checks that the month is 1-12
    if ((monthReal < 1) || (monthReal > 12)) {
        throw "Input, month, must be a value 1-12!";
    }

    // Checks that the day parameter is valid for the months
    // January, March, May, July, August, October, December: 31
    if (((monthReal == 1) || (monthReal == 3) || (monthReal == 5) || (monthReal == 7) ||
    (monthReal == 8) || (monthReal == 10) || (monthReal == 12)) && ((dayReal < 1) || (dayReal > 31))) {
        throw "Input must follow calendar days!";
    }

    // February: 28
    if ((monthReal == 2) && ((dayReal < 1) || (dayReal > 28))) {
        throw "Input must follow calendar days!";
    }

    // April, June, September, November: 30
    if (((monthReal == 4) || (monthReal == 6) || (monthReal == 9) || (monthReal == 11)) 
    && ((dayReal < 1) || (dayReal > 30))) {
        throw "Input must follow calendar days!";
    }

    // If the input birthday matches the sliced up birthdays from the JSON then push
    // into an array and return that
    let arr = [];
    for (var key of data) {
        if (((key.date_of_birth.slice(0, 2)) == monthReal) && ((key.date_of_birth.slice(3, 5)) == dayReal)) {
            arr.push(key.first_name + " " + key.last_name)
        }
    }
    // If the array length == 0 then you know its no ones bday
    if (arr.length == 0){
        throw "It's no one birthday :("
    }
    return arr;
}


module.exports = {
    getPersonById,
    sameEmail,
    sameBirthday
};