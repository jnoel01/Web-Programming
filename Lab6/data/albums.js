const mongoCollections = require('../config/mongoCollections');
const albums = mongoCollections.albums;
const bands = require('/bands');

let { ObjectId } = require('mongodb');

module.exports = {
    async create(bandId, title, releaseDate, tracks, rating) {
        //CHECKS THAT INPUTS ARE PROVIDED
        if(!bandId || !title || !releaseDate || !tracks || !rating)
            throw "You must provide an input for bandId, title, releaseDate, tracks and rating!";
        
        // CHECKS THAT INPUTS ARE STRINGS AND NOT EMPTY
        if (typeof bandId != 'string')
            throw "bandId must be of type string!";
        if (typeof title != 'string')
            throw "title must be of type string!";
        if (typeof releaseDate != 'string')
            throw "releaseDate must be of type string!";
        
        if (bandId.trim().length === 0)
            throw "bandId cannot be an empty string or just space!";
        if (title.trim().length === 0)
            throw "title cannot be an empty string or just space!";
        if (releaseDate.trim().length === 0)
            throw "releaseDate cannot be an empty string or just space!";
        
        // CHECKS IF BANDID IS VALID OBJECT
        bandId = bandId.trim();

        if (!ObjectId.isValid(bandId))
            throw "invalid object bandId!";
        
        // CHECKS IF THE BAND EXISTS WITH THE GIVEN BANDID
        const bandCollection = await bands();
        const band = await bandCollection.findOne({ _id: ObjectId(id) });

        if (band === null)
            throw 'No band with that id';
        
        // CHECKS THAT TRACKS IS AN ARRAY
        if (!tracks || !Array.isArray(tracks))
            throw "You must provide an array of tracks!";
        
        // CHECKS THAT TRACKS ARRAY HAS AT LEAST 3 ELEMENTS
        // AND THAT ALL ELEMENTS ARE STRINGS & NOT EMPTY
        if (tracks.length < 3)
            throw "You must supply at least three tracks!";

        for (i in tracks) {
            if (typeof tracks[i] !== 'string' || tracks[i].trim().length === 0) {
                throw "Each track must be a string and can not be empty!";
            }
            tracks[i] = tracks[i].trim();
        }

        //CHECKS IF RELEASE DATE IS A VALID
        // regex taken on stack overflow
        var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (releaseDate != date_regex)
            throw "releaseDate must be in the format MM/DD/YYYY!";

        //CHECKS IF THE RELEASE DATE IS BETWEEN 1900 and 2023
        dateArr = releaseDate.split("/");
        console.log(dateArr);
        if (dateArr[2] < 1900)
            throw "releaseDate must be between 1900 and 2023!";
        if (dateArr[2] > 2023)
            throw "releaseDate must be between 1900 and 2023!";
        
        // CHECKS IF RATING IS NAN AND IF ITS A FLOAT 1-5
        if (((typeof rating == NaN) == true) || ((!(typeof parseFloat(rating)))))
            throw "rating must be a number (floats included)!";
        if ((rating < 1) || (rating > 5))
            throw "rating must be a number 1-5!";
        //****************************ADD THAT WE ONLY TAKE IT ONE DECIMAL PLACE*************//

    },



    async getAll(bandId) {
        // CHECKS THAT THE BANDID IS PROVIDED
        if (!bandId)
            throw "bandId must be provided!";

        // CHECKS THAT BANDID IS A STRING AND NOT EMPTY SPACE
        if (typeof bandId != 'string')
            throw "type of bandId must be string!";
        if (bandId.trim().length === 0)
            throw "bandId cannot be an empty string or just space!";

        // CHECKS THAT ALBUMID IS A VALID OBJECTID
        bandId = bandId.trim();

        if (!bandId.isValid(id))
            throw "invalid object bandId";

        const bandCollection = await bands.getAll(bandId);
        const bandId = await bandCollection.findOne({ _id: ObjectId(bandId) });
        
        // CHECKS THAT BAND EXISTS
        if (bandId === null)
            throw 'No band with that id';
        
        
        band._bandId = bandId.toString();
        return bandId;
    },

    async get(albumId) {
        if (!albumId)
            throw 'You must provide an albumId to search for';

        if (typeof albumId !== 'string') 
            throw 'albumId must be a string';

        if (albumId.trim().length === 0)
            throw 'albumId cannot be an empty string or just spaces';

    albumId = albumId.trim();

    if (!ObjectId.isValid(albumId)) 
        throw 'invalid object ID';

    const albumsCollection = await albums();
    const album = await albumsCollection.findOne({ _id: ObjectId(albumId.trim()) });

    if (album === null) 
        throw 'No band with that id';
    
    album._albumId = albumId.toString();
    return album;
    },

    async remove(albumId) {
        if (!albumId)
            throw "You must provide an albumId to search for";

        if (typeof albumId !== 'string')
            throw "albumId must be a string!";

        if (albumId.trim().length === 0)
            throw "albumId cannot be an empty string or just space!";

        albumId = albumId.trim();

        if (!ObjectId.isValid(albumId))
            throw "invalid object ID!";

        const albumsCollection = await albums();
        const album = await albumsCollection.findOne({ _id: ObjectId(albumId) });
        const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(albumId) });
    
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete album with id of ${albumId}`;
        }
        //return album.name.toString() + " has been successfully deleted!";
        // SHOW THAT THE BAND OBJECT THAT THE ALBUM BELONGED TO WAS MODIFIED
    },
};