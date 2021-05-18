const express = require('express');
const router = express.Router();
const data = require('../data');
const shows = data.shows;

router.get('/', async (req, res) => {
    try{
        res.status(200).render('shows/showFinder', {title: 'Show Finder'});
    } catch(e){
        console.log(e);
        res.status(500).render('shows/error', {error: e, title: 'Error 500'});
    }
});

router.post('/search', async (req, res) => {
    const searchTerm = req.body.searchTerm.trim();

    if(searchTerm == undefined){
        res.status(400).render('shows/error', {error: "Error code 400: Search term is undefined.", title: 'Error code 400'});
        return;
    }
    if(typeof searchTerm != 'string'){
        res.status(400).render('shows/error', {error: 'Error code 400: Search term is not type string.', title: 'Error code 400'});
        return;
    }
    if(searchTerm.trim() == ''){
        res.status(400).render('shows/error', {error: 'Error code 400: Search term cannot be empty string.', title: 'Error code 400'});
        return;
    }

    try{
        let searchResults = await shows.search(searchTerm);

        if(!Array.isArray(searchResults)){
            res.status(400).render('shows/error', {error: `Error code searchResults did not produce an array`, title: 'Error code 400'});
            return;
        }
        if(searchResults.length == 0){
            res.status(200).render('shows/searchResultsNull', {searchTerm: searchTerm});
            return;
        }

        // If there is more than 20 results, simply slice the first 20 results out of the array
        // https://www.w3schools.com/jsref/jsref_slice_array.asp
        if(searchResults.length > 20) searchResults = searchResults.slice(0, 20);
        res.status(200).render('shows/searchResults', {title: 'Shows Found', searchTerm: searchTerm, show: searchResults});

    } catch(e){
        console.log(e);
        res.status(500).render('shows/error', {error: `Error code 500: ${e}`, title: 'Error code 500'});
    }
});

module.exports = router;