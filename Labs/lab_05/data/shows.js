const axios = require('axios');

/*
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    //console.log(typeof(data));
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}
*/
async function getAllShows(){
    // Copy pasted from lab 3
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    return data;
}

//getAllShows().then(res => console.log(res))

async function getShowById(id){
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

//getShowById(1).then(res => console.log(res))


module.exports = {getAllShows, getShowById};