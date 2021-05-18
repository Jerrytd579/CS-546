const axios = require('axios');

async function getShowById(id){
    // This code was copy pasted from my lab_05 submission
    if(id == undefined) throw 'Error: ID is undefined.';
    if(!id.match(/^[0-9]+$/)) throw 'Error: ID is not a number.';
    if(id <= 0) throw 'Error: ID is not a positive whole number.'

    /*
        // Lab 3 code

        if(id == undefined) throw 'Error: ID is undefined.';
        if(typeof id != 'number') throw 'Error: ID is not a number.';

        let peopleData = await getPeople();

        let person = peopleData.find((person) => person.id === id);    

        if(!person) throw `Error: Person with ID ${id} not found.`

        return person;
    */

    //let showData = await getAllShows();
    //let show = showData.find((show) => show.id == id)

    const show = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    if(!show.data) throw `Error: Show with ID ${id} not found.`;
    return show.data;
}

async function search(searchTerm){
    if(searchTerm == undefined) throw 'Error: searchTerm is undefined.';
    if(typeof(searchTerm) != 'string') throw 'Error: searchTerm must be type string.';
    if(searchTerm.trim() == '') throw 'Error: searchTerm cannot be empty string.'

    const show = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    if(!show.data) throw 'Error: could not get data';
    return show.data;
}

module.exports = {getShowById, search};