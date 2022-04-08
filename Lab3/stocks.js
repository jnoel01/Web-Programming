const axios = require('axios');

async function getStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data; // this will be the array of people objects
}

async function getPeople() {
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
  return data; // this will be the array of people objects
}




// ***     LIST SHAREHOLDERS    *** //
const listShareholders = async function listShareholders(stockName) {
  const data = await getStocks();
  const peopleData = await getPeople();

  //Checks that the stockName parameter exists
  if (stockName === undefined) 
    throw "Input string does not exist!";
  
  // Checks that the stockName parameter is of proper type
  if (!(typeof stockName == 'string'))
    throw "Input string is not of proper type: string!";
  
  // Checks that the stockName parameter is not just empty spaces
  if (stockName.trim().length === 0) 
    throw "Input string can not just be empty spaces!";

  
  // Make new object + array to store
  let obj = {};
  let shareholders = [];
  let stockObj = {};

  // Checks that the stockName can be found in the JSON file
  for (let key of data) {
    // If the data stockname and input stockname match
    if (key.stock_name == stockName) {
      stockObj = key;
    }
    if (stockName == '') {
      throw "Input stock name can not be found!"
    }
  }

  // Traverse through both of the data and match on id. 
  for (let shareKey of stockObj.shareholders) {
    for (let keyPeople of peopleData) {
      if (shareKey.userId == keyPeople.id) {
        // Grab the info from the matching ids and push to save in an array which we'll utilixze in our 'larger' ojbect
       shareholders.push({ first_name: keyPeople.first_name, last_name: keyPeople.last_name, number_of_share: shareKey.number_of_shares });
      }
    }
  }
  // Set obj to have all info PLUS the object we pushed into the array: shareholders
  obj = { id: stockObj.id, stock_name: stockObj.stock_name, shareholders: shareholders };
  return obj;
}





// ***     TOTALSHARES   *** //
const totalShares = async function totalShares(stockName) {
  const data = await getStocks();

  // Checks that the stockName parameter exists
  if (stockName === undefined) 
    throw "Input string does not exist!";
  
  // Checks that the stockName parameter is of proper type
  if (!(typeof stockName == 'string'))
    throw "Input string is not of proper type: string!";
  
  // Checks that the stockName parameter is not just empty spaces
  if (stockName.trim().length === 0) 
    throw "Input string can not just be empty spaces!";

  let stockObj = {};

  // Checks that the stockName can be found in the JSON file
  for (let key of data) {
    
    // If the data stockname and input stockname match
    if (key.stock_name == stockName) {  
      stockObj = key;
    }
    if (stockName === '') {
      throw "There is no stock with that name!";
    }
  }
  let stockHolder = stockObj.shareholders;
  if ((stockHolder.length) == 0) {
    throw stockName + " currently has no shareholders.";
  }

  let sum = 0;
  for (let keyShare of stockObj.shareholders) {
    let shares = keyShare.number_of_shares;
    sum += shares;
  }

  // One Shareholder
  if (stockObj.shareholders.length == 1) {
    return stockObj.stock_name + ", has 1 shareholder that owns a total of " + sum + " shares.";
  }

  //  One Shareholder & One Share
  if ((stockObj.shareholders.length == 1) && sum == 1) {
    return stockObj.stock_name + ", has 1 shareholder that owns a total of " + sum + " share.";
  }

  // More than one Shareholder & One Share
  if ((stockObj.shareholders.length > 1) && sum == 1) {
    return stockObj.stock_name + ", has 1 shareholder that owns a total of " + sum + " share.";
  }

  // More than one Shareholder
  if (stockObj.shareholders.length > 1) {
    return stockObj.stock_name + ", has " + (stockObj.shareholders.length) +
    " shareholders that owns a total of " + sum + " shares.";
  }
}




// ***     LIST STOCKS   *** //
const listStocks = async function listStocks(firstName, lastName) {
  const data = await getStocks();
  const peopleData = await getPeople();

  // Checks that the firstName & lastName exists
  if ((firstName === undefined) && (lastName === undefined))
    throw "First and last name inputs must exist!"
  
  if (firstName === undefined) 
    throw "First name input must exist!";
  
  if (lastName === undefined)
    throw "Last name input must exist!"

  // Checks that the firstName & lastName are of proper type
  if ((typeof lastName != 'string') && (typeof lastName != 'string'))
    throw "First and last name input must be of type string!";

  if (typeof firstName != 'string') 
    throw "First name input must be of type string!";
  
  if (typeof lastName != 'string') 
    throw "Last name input must be of type string!";
  
  // Checks that the firstName and lastName are not empty strings
  if ((firstName.trim().length === 0) && (lastName.trim().length === 0))
    throw "Input first and last name can not just be empty spaces!";

  if (firstName.trim().length === 0)
    throw "Input first name can not just be empty spaces!";
  
  if (lastName.trim().length === 0)
    throw "Input last name can not just be empty spaces!";
  
  let userID = '';

  // Grabs person by matching id and first/last name- store in variable
  for (let peopleKey of peopleData) {
    if ((firstName === peopleKey.first_name) && (lastName === peopleKey.last_name)) {
      userID = peopleKey.id;
    }
  }
  if (userID == '')
    throw "There is no user with this name!"
  
  let shareholderVar = [];
  let stocksName = '';
  let numberofShares = 0;
  let stockObj = {};
  let stockArr = [];

  // Match the id with the id inside of the shareholders part of the object
  // pull the number of shares with that matched user id associated with firstname lastname
  for (let key of data) {
    shareholderVar = key.shareholders;

    // Traverse through the shareholder section
    for (i = 0; i < shareholderVar.length; i++) {
      if (userID === shareholderVar[i].userId) {
        stocksName = key.stock_name;
        numberofShares = shareholderVar[i].number_of_shares;

        stockObj = { stock_name: stocksName, number_of_shares: numberofShares };
        stockArr.push(stockObj);
      }
    }
  }
  return stockArr;
}





// ***     GET STOCK BY ID   *** //
const getStockById = async function getStockById(id) {
  const data = await getStocks();
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
  throw "stock not found";
}



module.exports = {
  listShareholders,
  totalShares,
  listStocks,
  getStockById
};