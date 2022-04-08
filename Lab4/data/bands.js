const mongoCollections = require('./../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

module.exports = {

    async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
        // CHECK THAT ALL INPUTS ARE PROVIDED
        if (!name || !genre || !website || !recordLabel || !bandMembers || !yearFormed) 
            throw "You must provide a input for name, genre, website, record label, band members and year formed!";

        // CHECK THAT NAME, WEBSITE AND RECORD LABEL ARE STRINGS
        if (typeof name !== 'string')
            throw "Name must be a string!";

        if (typeof website !== 'string')
            throw "Website must be a string!";

        if (typeof recordLabel !== 'string')
            throw "Record Label must be a string";

        // CHECK THAT NAME, WEBSITE AND RECORD LABEL ARE NOT EMPTY SPACE
        if (name.trim().length === 0)
          throw "Name cannot be an empty string or string with just spaces!";
        
        if (website.trim().length === 0)
          throw "Website cannot be an empty string or string with just spaces!";

        if (recordLabel.trim().length === 0)
          throw "Record label cannot be an empty string or string with just spaces!";

        // CHECK THAT WEBSITE STARTS HTTP://WWW.
        let websiteString = website.split(".")
        if ((websiteString[0] + ".") !== ("http://www.")) 
            throw "Begining of website must start with http://www.";

        // CHECKS THAT THERE ARE AT LEAST 5 CHARACTERS IN BETWEEN HTTP.. & .COM
        if (websiteString[1].length < 5) 
            throw "There must be at least 5 characters between http://www. and .com!";

        // CHECKS THAT THE WEBSITE ENDS IN .COM
        if (("." + websiteString[2]) != ".com")
            throw "Website domain must be .com!";

        // CHECK THAT GENRE IS AN ARRAY, STRING AND HAS AT LEAST 1 ELEMENT
        if (!genre || !Array.isArray(genre))
          throw "You must provide an array of genres!";
          
        if (genre.length === 0)
            throw "You must supply at least one genre!";

        for (i in genre) {
          if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
            throw "Each genre must be a string and can not be empty!"
            break;
            }
        genre[i] = genre[i].trim();
        }

        // CHECK THAT BAND IS AN ARRAY, STRING AND HAS AT LEAST 1 ELEMENT
        if (!bandMembers || !Array.isArray(bandMembers))
          throw "You must provide an array of band members!";
          
        if (bandMembers.length === 0)
            throw "You must supply at least one band member!";

        for (i in bandMembers) {
          if (typeof bandMembers[i] !== 'string' || bandMembers[i].trim().length === 0) {
            throw "Each band must be a string and can not be empty!";
            break;
            }
        bandMembers[i] = bandMembers[i].trim();
        }

        // CHECK THAT YEAR FORMED IN A NUMBER AND IN THE YEAR RANGE
        if (typeof yearFormed != 'number')
            throw "Input year must be a number!";

        if ((yearFormed < 1900) || (yearFormed > 2022))
            throw "Band year formed must be within the years 1900-2022!"

        const bandsCollection = await bands();
    
        let newBand = {
          name: name,
          genre: genre,
          website: website,
          recordLabel: recordLabel,
          bandMembers: bandMembers,
          yearFormed: yearFormed
        };
    
        const insertInfo = await bandsCollection.insertOne(newBand);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
          throw 'Could not add band';
    
        const id = insertInfo.insertedId.toString();
    
        const band = await this.get(id);
        return band;
      },

    async get(id) {
        if (!id)
            throw 'You must provide an id to search for';

        if (typeof id !== 'string') 
            throw 'Id must be a string';

        if (id.trim().length === 0)
            throw 'Id cannot be an empty string or just spaces';

    id = id.trim();

    if (!ObjectId.isValid(id)) 
        throw 'invalid object ID';

    const bandsCollection = await bands();
    const band = await bandsCollection.findOne({ _id: ObjectId(id.trim()) });

    if (band === null) 
        throw 'No band with that id';
    
    band._id = id.toString();
    return band;
  },

  // RETURNS ARRAY OF ALL BANDS IN THE COLLECTION
  async getAll() {
    const bandsCollection = await bands();
    const bandList = await bandsCollection.find({}).toArray();
    if (!bandList) 
        throw 'Could not get all bands!';
    
    // GETS RID OF OBJECTID AROUND ID FIELD
    for (i of bandList)
        i._id = i._id.toString();
    
    if (bandList.length == 0) {
        return [];
    }
    return bandList; 
  },

  // RETURN AN ARRAY OF ALL BANDS IN THE COLLECTION
  async get(id) {

    //  CHECKS THAT THE ID EXISTS
    if (!id) 
        throw "You must provide an id to search for";

    // CHECKS THAT THE ID IS OF TYPE STRING
    if (typeof id !== 'string')
        throw "Id must be a string";
    
    // CHECKS THAT THE INPUT ID IS NOT AN EMPTY STRING
    if (id.trim().length === 0)
      throw "Id cannot be an empty string or just spaces!";

    id = id.trim();

    if (!ObjectId.isValid(id))
        throw "invalid object ID";

    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });

    if (band === null)
        throw 'No band with that id';

    band._id = id.toString();
    return band;
    },

    async remove(id) {

        if (!id)
            throw "You must provide an id to search for";

        if (typeof id !== 'string')
            throw "Id must be a string!";

        if (id.trim().length === 0)
          throw "id cannot be an empty string or just space!";

        id = id.trim();

        if (!ObjectId.isValid(id))
            throw "invalid object ID!";
    
        const bandCollection = await bands();
        const band = await bandCollection.findOne({ _id: ObjectId(id) });
        const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete band with id of ${id}`;
        }
        return band.name.toString() + " has been successfully deleted!";
      },

      async rename(id, newName) {
        
        // CHECKS IF NO ID IS PROVIDED
        if (!id)
            throw "You must provide an id to search for!";

        // CHECKS IF THE ID PROVIDED IS A STRING OR EMPTY STRING
        if (typeof id !== 'string') 
            throw "Id must be a string!";
        
        if (id.trim().length === 0)
            throw "Id cannot be an empty string or just spaces!";

        id = id.trim();

        // CHECKS IF THE ID PROVIDED IS NOT A VALID OBJECT ID
        if (!ObjectId.isValid(id))
            throw "invalid object ID";

        // CHECKS IF NEWNAME IS NOT PROVIDED
        if (!newName)
            throw "You must provide a new name!";

        // CHECKS IF NEWNAME IS NOT A STRING OR EMPTY
        if (typeof newName !== 'string') 
            throw "New Name must be a string!";
        
        if (newName.trim().length === 0)
            throw "New Name cannot be an empty string or just spaces!";

        // CHECKS IF THE NEWNAME IS THE SAME AS THE CURRENT STORED VALUE
        const bandCollection = await bands();

        const updatedBand = {
            name: newName
        }

        const updatedInfo = await bandCollection.updateOne(
        { _id: ObjectId(id.trim()) },
        { $set: updatedBand }
        );

        // CHECKS IF CAN UPDATE
        if (updatedInfo.modifiedCount === 0) {
            throw "Could not update band successfully check that you entered a new name!";
        }

        return await this.get(id);
        }
  }