const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const showsData = require('../data/searchshows');

router.get('/:id', async (req, res) => {
    try {
        const showData = await showsData.getShowById(req.params.id);
    
        // Found on Stackoverflow, to not display HTML tags in the summary as plain text
        showData.summary = showData.summary.replace(/(<([^>]+)>)/gi, "");

        // Initalize to false, then see if they exists (i realized i cant do the conditionals the
        // way I wanted in handlebars so I have to do it this way... :( )
        let nameTrue, imageTrue, languageTrue, genreTrue, ratingTrue, networkTrue, summaryTrue = false;

        // If the data exists, set to true
        if (showData.name)
            nameTrue = true;
        if (showData.image)
            imageTrue = true;
        if (showData.language)
            languageTrue = true;
        if (showData.genre)
            genreTrue = true;
        if (showData.rating.average)
            ratingTrue = true;
        if (showData.network)
            networkTrue = true;
        if (showData.summary)
            summaryTrue = true;

        console.log(showData);
        res.render('showHandlebars/show', {
            name: showData.name,
            image: showData.image.medium,
            language: showData.language,
            genre: showData.genre,
            rating: showData.rating.average,
            network: showData.network.name,
            summary: showData.summary,
            nameTrue,
            imageTrue,
            languageTrue,
            genreTrue,
            ratingTrue,
            networkTrue,
            summaryTrue
        })
    } catch(e) {
        res.status(404).render('showHandlebars/showError', {
            show: 'This show could not be found!'
          });
    }
});

module.exports = router;