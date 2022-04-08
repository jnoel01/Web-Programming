const express = require('express');
const showsData = require('../data/searchshows');
const router = express.Router();

router.post('/', async(req,res) => {
    try {
        let showSearchTerm = req.body['showSearchTerm'];
        if(!showSearchTerm) {
            res.render('showHandlebars/searchError', {
                show: "There is no show found! Note: you can not just input empty spaces or nothing!"
        })
        return;
    }
        // Array initialized to false to represent shows
        arr = [ { name: "", id: "", found: false } , { name: "", id: "", found: false }, { name: "", id: "", found: false }, { name: "", id: "", found: false }, { name: "", id: "", found: false } ];
        result = false;

        const shows = await showsData.getShowsByKeyword(showSearchTerm);

        for (i = 0; i < arr.length; i++) {
            if ((shows.length > i) && (shows[i] != null)) {
                arr[i].id = shows[i].show.id;
                arr[i].name = shows[i].show.name;
                arr[i].found = true;
                result = true;
            }
        }

        res.render('showHandlebars/search', {
            showSearchTerm: showSearchTerm,
            result: result,
            shows: arr,

            show1Found: arr[0].found,
            show1Id: arr[0].id,
            show1Name: arr[0].name,

            show2Found: arr[1].found,
            show2Id: arr[1].id,
            show2Name: arr[1].name,

            show3Found: arr[2].found,
            show3Id: arr[2].id,
            show3Name: arr[2].name,

            show4Found: arr[3].found,
            show4Id: arr[3].id,
            show4Name: arr[3].name,

            show5Found: arr[4].found,
            show5Id: arr[4].id,
            show5Name: arr[4].name,
        })
        } catch (e) {
        res.status(400).render('showHandlebars/searchError', {
            show: 'No shows found with that search term!'
          });
      }
    });
    
    module.exports = router;

