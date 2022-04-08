const people = require("./people");
const stocks = require("./stocks");

async function main() {

    console.log("*** getPersonByID Tests ***");
    try{
        const testTwo = await people.getPersonById(-4)
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testFour = await people.getPersonById();
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testFive = await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testOne = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const testThree = await people.getPersonById(233); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }

    console.log("*** sameEmail Tests ***");
    try{
        const testSix = await people.sameEmail("harvard.edu"); 
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const testSeven = await people.sameEmail("foobar");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testTen = await people.sameEmail(".com");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testTwelve = await people.sameEmail("google.com.hk");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testNine = await people.sameEmail("hello.0934");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testEight = await people.sameEmail("beep..");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const testEleven = await people.sameEmail(); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }

    console.log("*** sameBirthday Tests ***");
    try{
        const peopledata = await people.sameBirthday(1, 29);
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await people.sameBirthday(9, 31);
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await people.sameBirthday("01", "19");
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await people.sameBirthday(122, 39); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await people.sameBirthday("09", "31");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await people.sameBirthday("      ", "      ");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await people.sameBirthday("     12", "      ");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }

    console.log("*** listShareholders Tests ***");
    try{
        const peopledata = await stocks.listShareholders();
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listShareholders("Powell Industries, Inc.");
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await stocks.listShareholders('hiiii');
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listShareholders("TrueCar, Inc.");
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }

    console.log("*** totalShares Tests ***");
    try{
        const peopledata = await stocks.totalShares('Aeglea BioTherapeutics, Inc.');
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await stocks.totalShares('Nuveen Preferred and Income 2022 Term Fund'); 
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await stocks.totalShares(43);
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.totalShares();
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.totalShares(' ');
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.totalShares('Foobar Inc');
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.totalShares('Powell Industries, Inc.');
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }

    console.log("*** listStocks Tests ***");
    try{
        const peopledata = await stocks.listStocks("Grenville", "Pawelke" ); 
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await stocks.listStocks('Patrick', "Hill"); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listStocks("Ardenia", "Seid" ); 
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await stocks.listStocks();
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listStocks("foo");
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listStocks("      ", "        "); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listStocks(1,2);
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listStocks("Grenvill", "Pawelke" ); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.listStocks("Grenville     ", "Pawelke" ); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }

    console.log("*** getStockById Tests ***");
    try{
        const peopledata = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await stocks.getStockById("3d5d8cab-652b-4faf-8bfa-acff4ffd79e7");
        console.log ("passed");
    } catch(e) {
        console.log ("failed");
    }
    try{
        const peopledata = await stocks.getStockById('f611f797-7ca0-4382-befb-2ab8be914ff0');
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.getStockById(-23);
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.getStockById();
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
    try{
        const peopledata = await stocks.getStockById(320); 
        console.log ("failed");
    } catch(e) {
        console.log ("passed");
    }
}


main();