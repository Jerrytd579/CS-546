const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.get('/:id', async (req, res) => {
    try {
        const show = await showData.getShowById(req.params.id.trim());

        if(show.length == 0){
          res.status(404).render('shows/error', {error: '404: Show not found.', title: 'Error code 404'});
          return;
        }

        // If any of the requested fields are null or empty space, set it equal to 'N/A' or some default value thing
        if(show.image == {} || show.image == null) show.image == {};
        if(show.language == null || show.language.trim() == '') show.language = 'N/A';
        if(show.genres == null || show.genres.length == 0) show.genres = ['N/A'];
        if(show.rating == null) show.rating == {};
        if(show.rating.average == null) show.rating.average = 'N/A';
        if(show.network == null) show.network = {};
        if(show.network.name == null || show.network.name.trim == '') show.network.name = 'N/A';
        if(show.summary == null || show.summary.trim() == '') show.summary = 'N/A';

        // Regex to remove HTML tags from summary string
        // https://stackoverflow.com/questions/11229831/regular-expression-to-remove-html-tags-from-a-string
        show.summary = show.summary.replace(/<[^>]*>/g, '');

        res.status(200).render('shows/show', {show: show, title: show.name});
    } catch(e){
        res.status(404).render('shows/error', {error: e})
    }
})

module.exports = router;