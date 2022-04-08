const express = require('express');
const router = express.Router();
const bandsData = require('../data/bands');
const albumsData = require('..data/albums');

router.get('/', async (req, res) => {
    try {
      const albums = await albumsData.getAll();
      res.status(200).json(albums);
    } catch (e) {
      res.status(400).json(e);
    }
  });

router
  .route('/albums/:id')
  .get(async (req, res) => {
    let bandId = req.params.id;
    
    if (!ObjectId.isValid(bandId))
        throw "invalid object bandId!";
    try {
      const albums = await albumsData.getAll(bandId);
      return res.status(200).json(albums);
    } catch (e) {
        return res.status(400).json(e);
    }
  });

router.post('/', async (req, res) => {
    const albumsCreate = req.body;

try {
    if (!albumsCreate.title)
        throw "album needs title!";
    if (!albumsCreate.releaseDate) 
        throw "album needs releaseDate!";
    if (!albumsCreate.tracks) 
        throw "album needs tracks!";
} catch (e) {
    res.status(400).json(e);
    }

try {
    if (typeof albumsCreate.bandId != 'string')
        throw "bandId must be of type string!";
    if (typeof albumsCreate.title != 'string')
        throw "title must be of type string!";
    if (typeof albumsCreate.releaseDate != 'string')
        throw "releaseDate must be of type string!";
} catch (e) {
    res.status(400).json(e);
    }

try {
    if (!ObjectId.isValid(bandId))
        throw "invalid object bandId!"
} catch (e) {
    res.status(400).json(e);
}

try {
    if (!tracks || !Array.isArray(tracks))
    throw "You must provide an array of tracks!";

if (tracks.length < 3)
    throw "You must supply at least three tracks!";

for (i in tracks) {
    if (typeof tracks[i] !== 'string' || tracks[i].trim().length === 0) {
        throw "Each track must be a string and can not be empty!";
    }
    tracks[i] = tracks[i].trim();
}
} catch (e) {
    res.status(400).json(e);
}

try {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (releaseDate != date_regex)
        throw "releaseDate must be in the format MM/DD/YYYY!";
} catch (e) {
    res.status(400).json(e);
}

try {
    dateArr = releaseDate.split("/");
    console.log(dateArr);
    if (dateArr[2] < 1900)
        throw "releaseDate must be between 1900 and 2023!";
    if (dateArr[2] > 2023)
        throw "releaseDate must be between 1900 and 2023!";
} catch (e) {
    res.status(400).json(e);
}

try {
    if (((typeof rating == NaN) == true) || ((!(typeof parseFloat(rating)))))
        throw "rating must be a number (floats included)!";
    if ((rating < 1) || (rating > 5))
        throw "rating must be a number 1-5!";
} catch (e) {
    res.status(400).json(e);
}
});

router
  .route('/albums/album/:id')
  .get(async (req, res) => {
    let albumId = req.params.id;
    
    if (!ObjectId.isValid(albumId))
        throw "invalid object bandId!";
    try {
      const albums = await albumsData.get(albumId);
      return res.status(200).json(albums);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.delete('/:id', async (req, res) => {
    let albumId = req.params.id;
    try {
        albumtId = albumtId.trim();
    if (!ObjectId.isValid(albumId))
        throw "invalid object ID";
    } catch (e) {
        res.status(404).json(e)
    }
});











