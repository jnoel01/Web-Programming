const express = require('express');
const router = express.Router();
const bandsData = require('../data/bands');

router.get('/', async (req, res) => {
    try {
      const bands = await bandsData.getAll();
      res.status(200).json(bands);
    } catch (e) {
      res.status(400).json(e);
    }
  });

router
  .route('/bands/:id')
  .get(async (req, res) => {
    let bandId = req.params.id;
    if (!ObjectId.isValid(bandId))
            throw "invalid object bandId!";
    try {
      const bands = await bandsData.get(bandId);
        return res.json(bands);
    } catch (e) {
        return res.status(400).json(e);
    }
  });

router.post('/', async (req, res) => {
    const bandsCreate = req.body;

try {
    if (!bandsCreate.name)
        throw "bands needs name!";
    if (!bandsCreate.genre) 
        throw "need genre!";
    if (!bandsCreate.website) 
        throw "need website!";
    if (!bandsCreate.recordLabel) 
        throw "need recordLabel!";
    if (!bandsCreate.bandMembers)
        throw "need bandMembers!";
    if (!bandsCreate.yearFormed) 
        throw "need yearFormed!";
} catch (e) {
    res.status(400).json(e);
    }

try {
    if (typeof bandsCreate.name != 'string')
        throw "name must be of type string!";
    if (typeof bandsCreate.website != 'string')
        throw "website must be of type string!";
    if (typeof bandsCreate.recordLabel != 'string')
        throw "recordLabel must be of type string!";
    if (bandsCreate.name.trim().length === 0)
        throw "name cannot be empty spaces!";
    if (bandsCreate.website.trim().length === 0)
        throw "website cannot be empty spaces!";
    if (bandsCreate.recordLabel.trim().length === 0)
        throw "recordLabel cannot be empty spaces!";
} catch (e) {
    res.status(400).json(e);
    }

try {
    let websiteString = bandsCreate.website.split(".");
    if ((websiteString[0] + ".") !== ("http://www.")) 
        throw "Begining of website must start with http://www.";
    if (websiteString[1].length < 5) 
        throw "There must be at least 5 characters between http://www. and .com!";
    if (("." + websiteString[2]) != ".com")
        throw "Website domain must be .com!";
} catch (e) {
    res.status(400).json(e);
    }

try {
    if (!bandsCreate.genre || !Array.isArray(bandsCreate.genre))
        throw "You must provide an array of genres!";
    
    if (bandsCreate.genre.length === 0)
        throw "You must supply at least one genre!";

    for (i in bandsCreate.genre) {
        if (typeof bandsCreate.genre[i] !== 'string' || bandsCreate.genre[i].trim().length === 0) {
            throw "Each genre must be a string and can not be empty!"
    }
    bandsCreate.genre[i] = bandsCreate.genre[i].trim();
  }
} catch (e) {
    res.status(400).json(e);
    }

try {
    if (!bandsCreate.bandMembers || !Array.isArray(bandsCreate.bandMembers))
        throw "You must provide an array of band members!";
          
    if (bandsCreate.bandMembers.length === 0)
        throw "You must supply at least one band member!";

    for (i in bandsCreate.bandMembers) {
        if (typeof bandsCreate.bandMembers[i] !== 'string' || bandsCreate.bandMembers[i].trim().length === 0) {
            throw "Each band must be a string and can not be empty!";
        }
        bandsCreate.bandMembers[i] = bandsCreate.bandMembers[i].trim();
    }
} catch (e) {
    res.status(400).json(e);
    }

try {
    if (typeof bandsCreate.yearFormed != 'number')
        throw "Input year must be a number!";

        if ((bandsCreate.yearFormed < 1900) || (bandsCreate.yearFormed > 2022))
            throw "Band year formed must be within the years 1900-2022!"
} catch (e) {
    res.status(400).json(e);
    }

try {
    const { name, genre, website, recordLabel, bandMembers, yearFormed } = bandsCreate;
    const newBand = await bandsData.create(name, genre, website, recordLabel, bandMembers, yearFormed);
    res.status(200).json(newBand);
} catch (e) {
    res.status(500).json(e)
    }
});

router.put('/:id', async (req, res) => {
    let inputId = req.params.id;
    const bandsCreate = req.body;

    try {
        inputId = inputId.trim();

    if (!ObjectId.isValid(inputId))
        throw "invalid object ID";
    } catch (e) {
        res.status(400).json(e)
    }

    try {
        let band = await get(inputId);
        res.status(200).json(band);
    } catch (e) {
        res.status(404).json(e);
    }

    try {
        if (!bandsCreate.name)
            throw "bands needs name!";
        if (!bandsCreate.genre) 
            throw "need genre!";
        if (!bandsCreate.website) 
            throw "need website!";
        if (!bandsCreate.recordLabel) 
            throw "need recordLabel!";
        if (!bandsCreate.bandMembers)
            throw "need bandMembers!";
        if (!bandsCreate.yearFormed) 
            throw "need yearFormed!";
    } catch (e) {
        res.status(400).json(e);
        }
    
    try {
        if (typeof bandsCreate.name != 'string')
            throw "name must be of type string!";
        if (typeof bandsCreate.website != 'string')
            throw "website must be of type string!";
        if (typeof bandsCreate.recordLabel != 'string')
            throw "recordLabel must be of type string!";
        if (bandsCreate.name.trim().length === 0)
            throw "name cannot be empty spaces!";
        if (bandsCreate.website.trim().length === 0)
            throw "website cannot be empty spaces!";
        if (bandsCreate.recordLabel.trim().length === 0)
            throw "recordLabel cannot be empty spaces!";
    } catch (e) {
        res.status(400).json(e);
        }
    
    try {
        let websiteString = bandsCreate.website.split(".");
        if ((websiteString[0] + ".") !== ("http://www.")) 
            throw "Begining of website must start with http://www.";
        if (websiteString[1].length < 5) 
            throw "There must be at least 5 characters between http://www. and .com!";
        if (("." + websiteString[2]) != ".com")
            throw "Website domain must be .com!";
    } catch (e) {
        res.status(400).json(e);
        }
    
    try {
        if (!bandsCreate.genre || !Array.isArray(bandsCreate.genre))
            throw "You must provide an array of genres!";
        
        if (bandsCreate.genre.length === 0)
            throw "You must supply at least one genre!";
    
        for (i in bandsCreate.genre) {
            if (typeof bandsCreate.genre[i] !== 'string' || bandsCreate.genre[i].trim().length === 0) {
                throw "Each genre must be a string and can not be empty!"
        }
        bandsCreate.genre[i] = bandsCreate.genre[i].trim();
      }
    } catch (e) {
        res.status(400).json(e);
        }
    
    try {
        if (!bandsCreate.bandMembers || !Array.isArray(bandsCreate.bandMembers))
            throw "You must provide an array of band members!";
              
        if (bandsCreate.bandMembers.length === 0)
            throw "You must supply at least one band member!";
    
        for (i in bandsCreate.bandMembers) {
            if (typeof bandsCreate.bandMembers[i] !== 'string' || bandsCreate.bandMembers[i].trim().length === 0) {
                throw "Each band must be a string and can not be empty!";
            }
            bandsCreate.bandMembers[i] = bandsCreate.bandMembers[i].trim();
        }
    } catch (e) {
        res.status(400).json(e);
        }
    
    try {
        if (typeof bandsCreate.yearFormed != 'number')
            throw "Input year must be a number!";
    
            if ((bandsCreate.yearFormed < 1900) || (bandsCreate.yearFormed > 2022))
                throw "Band year formed must be within the years 1900-2022!"
    } catch (e) {
        res.status(400).json(e);
        }
    
    try {
        const updateBand = await bandsData.update(req.params.id, bandsCreate);
        res.json(updateBand);
        res.status(200).json(updateBand);
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete('/:id', async (req, res) => {
    let inputId = req.params.id;
    try {
        inputId = inputId.trim();

    if (!ObjectId.isValid(inputId))
        throw "invalid object ID";
    } catch (e) {
        res.status(404).json(e)
    }

    try {
        let band = await get(inputId);
        res.status(200).json(band);
    } catch (e) {
        res.status(404).json(e);
    }

    try {
        const removeBand = await bandsData.remove(req.params.id);
        res.status(200).json(removeBand);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;















