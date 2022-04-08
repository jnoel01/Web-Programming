const bands = require("./data/bands");
const connection = require("./config/mongoConnection");


const main = async() => {
    const db = await connection.connectToDb();
    await db.dropDatabase();

    let test = undefined;

    
    // TESTS FOR WHEN THERE IS NO BANDS IN DB
    //Expected output: []
    try {
        test = await bands.getAll();
        console.log(test);                     
    } catch (e) {
        console.log(e);
    }


    // CHECKS CREATE BAND PINK FLOYD
    // Expected Output:  pink floyd info
    try {
        test = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECKS CREATE BAND FOR BEATLES
    //Expected Output: The beatles info
    try {
        test = await bands.create("The Beatles", ["Rock", "Pop", "Psychedelia"], "http://www.thebeatles.com", "Parlophone", ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }


    // CHECKS CREATE BAND FOR LINKIN PARK
    //Expected Output: linkin park info
    try {
        test = await bands.create("Linkin Park", ["Alternative Rock", "Pop Rock", "Alternative Metal"], "http://www.linkinpark.com", "Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"], 1996);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECKS THAT THE CREATED BAND IS ADDED AND SHOWN IN GET ALL
    // EXPECTED OUTPUT: all bands added
    try {
        test = await bands.getAll();
        //console.log(test)
    } catch (e) {
        console.log(e);
    }

    
    // CREATE BAND OF YOUR CHOICE
    try {
        test = await bands.create("Queen", ["Pop Rock", "Pop", "Rock", "Hard Rock"], "http://www.queenonline.com", "Parlophone", ["Freddie Mercury", "Brian May", "John Deacon", "Roger Taylor", "Mike Grose", "Doug Bogie"], 1970);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }  

    // CREATE ANOTHER BAND OF CHOICE
    try {
        test = await bands.create("Rolling Stones", ["Pop Rock", "Rock and Roll", "Rock", "Hard Rock", "blues", "Pop"], "http://www.rollingstones.com", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], 1962);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CREATE THIRD BAND OF CHOICE AND LOG
    try {
        test = await bands.create("Kiss", ["Hard Rock", "Heavy Metal", "Shock Rock", "Glam Metal"], "http://www.kissonline.com", "Casablanca Records", ["Gene Simmons", "Paul Stanley", "Ace Frehley", "Peter Criss"], 1973);
        //console.log(test);
    } catch (e) {
        console.log(e);
    } 


    // CHECK THAT TWO ADDED BANDS OF CHOICE ARE IN GET ALL
    try {
        test = await bands.getAll(); 
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECK THAT YOU CAN RENAME THE FIRST BAND
    try {
        test = await bands.getAll();
        test = await bands.rename(test[0]._id.toString(), "King");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECK THAT YOU CAN REMOVE THE SECOND BAND CREATED
    try {
        test = await bands.getAll();
        test = await bands.remove(test[1]._id.toString());
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    // // CREATE A BAND WITH BAD INPUT (website)
    try {
        test = await bands.create("Rolling Stones", ["Pop Rock", "Rock and Roll", "Rock", "Hard Rock", "blues", "Pop"], "http://wwww.rollingstones.com", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], 1962);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.create("Rolling Stones", ["Pop Rock", "Rock and Roll", "Rock", "Hard Rock", "blues", "Pop"], "http://www.rol.com", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], 1962);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.create("Rolling Stones", ["Pop Rock", "Rock and Roll", "Rock", "Hard Rock", "blues", "Pop"], "http://www.rolling", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], 1962);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECKS BAND INPUT NAME
    try {
        test = await bands.create("", ["Pop Rock", "Rock and Roll", "Rock", "Hard Rock", "blues", "Pop"], "http://www.rolling", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], 1962);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECKS GENRE INPUT NAME
    try {
        test = await bands.create("Hiiiiiii", [], "http://www.rolling", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], 1962);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECKS YEAR RANGE
    try {
        test = await bands.create("Rolling Stones", ["Pop Rock", "Rock and Roll", "Rock", "Hard Rock", "blues", "Pop"], "http://www.rollingstones.com", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], 200);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.create("Rolling Stones", ["Pop Rock", "Rock and Roll", "Rock", "Hard Rock", "blues", "Pop"], "http://www.rollingstones.com", "Decca Records", ["Mick Jagger", "Keith Richards", "Brian Jones", "Bill Wyman", "Charlie Watts"], -1970);
        //console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECKS THAT CAN NOT REMOVE BAND THAT DOESNT EXIST
    try {
        test = await bands.getAll();
        test = await bands.remove("123456789123456789123456");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECK THAT CAN NOT RENAME A BAND THAT DOESNT EXIST
    try {
        test = await bands.getAll();
        test = await bands.rename("123456789123456789123456", "meow meow");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    // TRY TO RENAME BAND PASSING IN VALID DATA FOR NEWNAME
    try {
        test = await bands.getAll();
        test = await bands.rename("123456789123456789123456", 11);
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.getAll();
        test = await bands.rename("123456789123456789123456", "");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.getAll();
        test = await bands.rename("123456789123456789123456", "         ");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.getAll();
        test = await bands.rename(test[0]._id, "Pink Floyd");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    // CHECKS THAT YOU CANT GET BAND BY ID THAT DOESNT EXIST
    try {
        test = await bands.get("123456789123456789123456");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.get("HI");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.get("");
        console.log(test);
    } catch (e) {
        console.log(e);
    }

    try {
        test = await bands.get(11);
        console.log(test);
    } catch (e) {
        console.log(e);
    }

   await connection.closeConnection();
 };

main();