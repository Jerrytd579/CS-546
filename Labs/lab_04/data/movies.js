const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

function stringChecker(string, argument){
    // Taken from lab_02 stringUtils.js
    if(string == undefined) throw `Error: input ${argument} is undefined.`;
    if(typeof(string) != 'string') throw `Error: input ${argument} is not a string`;
    if(string.trim() == '') throw `Error: input ${argument} is only white space`;
}

async function create(title, plot, rating, runtime, genre, cast, info){
    stringChecker(title, 'title');
    stringChecker(plot, 'plot');
    stringChecker(rating, 'rating');
    stringChecker(runtime, 'runtime');
    stringChecker(genre, 'genre');

    title = title.trim();
    plot = plot.trim();
    rating = rating.trim();
    genre = genre.trim();

    if(cast == undefined) throw 'Error: cast is undefined.';
    if(!Array.isArray(cast)) throw 'Error: cast is not type array.';
    for(people in cast){
        stringChecker(cast[people], `cast[${people}]`);
    };

    if(typeof(info) != 'object') throw 'Error: info is not an object';
    stringChecker(info.director, 'info director');

    if(!info.yearReleased) throw 'Error: info year released not provided';
    if(typeof(info.yearReleased) != 'number') throw 'Error: info year released is not a number';
    if((info.yearReleased).toString().length != 4) throw 'Error: info year released is not a 4 digit number';

    let current_year = new Date().getFullYear();
    if(info.yearReleased < 1930) throw `Error: the year released ${info.yearReleased} is before 1930`;
    if(info.yearReleased > (current_year + 5)) throw `Error: the year released ${info.yearReleased} is over 5 years later than the current year, ${current_year}`;


    let moviesCollection = await movies();

    let newMovie = {
        title: title,
        plot: plot,
        rating: rating,
        runtime: runtime,
        genre: genre,
        cast: cast,
        info: info
    };

    // let newDog = {
    //     name: name,
    //     breeds: breeds
    //   };

    // const insertInfo = await dogCollection.insertOne(newDog);
    // if (insertInfo.insertedCount === 0) throw 'Could not add dog';

    // const newId = insertInfo.insertedId;

    // const dog = await this.getDogById(newId);
    // return dog;
    
    const insertInfo = await moviesCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'Error: could not add movie.';

    const newId = insertInfo.insertedId.toString();
    let insertedMovie = await get(newId);
    insertedMovie._id = (insertedMovie._id).toString();
    return insertedMovie;
}

async function getAll(){
    // const dogCollection = await dogs();

    // const dogList = await dogCollection.find({}).toArray();

    // return dogList;

    const moviesCollection = await movies();

    const movieList = await moviesCollection.find({}).toArray();

    // Converting every _id in the movieList to strings
    for(let movieIterator in movieList){
        movieList[movieIterator]._id = (movieList[movieIterator]._id).toString();
    }

    return movieList;
}

async function get(id){
    stringChecker(id, 'ID');
    id = id.trim();

/*  Supplied code on lab
    let newObjId = ObjectId(); //creates a new object ID
    let x = newObjId.toString(); // converts the Object ID to string
    console.log(typeof x); //just logging x to see it's now type string
     
    //The below function takes in a string value and then attempts to convert it to an ObjectId
    
    function myDBfunction(id) { 
      //check to make sure we have input at all
      if (!id) throw 'Id parameter must be supplied';

      //check to make sure it's a string
      if (typeof id !== 'string') throw "Id must be a string";
    
    
      //Now we check if it's a valid ObjectId so we attempt to convert a value to a valid object ID,
      //if it fails, it will throw an error (you do not have to throw the error, it does it automatically and the catch where you call the function will catch the error just as it catches your other errors).
      
      let parsedId = ObjectId(id);
      //this console.log will not get executed if Object(id) fails, as it will throw an error
      console.log('Parsed it correctly, now I can pass parsedId into my query.');
    }
 */   
    let parsedId = ObjectId(id);

    // if (!id) throw 'You must provide an id to search for';

    // const dogCollection = await dogs();
    // const doggo = await dogCollection.findOne({ _id: id });
    // if (doggo === null) throw 'No dog with that id';

    // return doggo;

    const movieCollection = await movies();
    const theMovie = await movieCollection.findOne({ _id: parsedId });
    if(theMovie === null) throw 'No movie with that id.';
    theMovie._id = (theMovie._id).toString();
    return theMovie;
}

async function remove(id){
    stringChecker(id, 'ID');
    id = id.trim();

    let parsedId = ObjectId(id);

    // if (!id) throw 'You must provide an id to search for';

    // const dogCollection = await dogs();
    // const deletionInfo = await dogCollection.deleteOne({ _id: id });

    // if (deletionInfo.deletedCount === 0) {
    //   throw `Could not delete dog with id of ${id}`;
    // }
    // return { deleted: true };

    const movieCollection = await movies();
    //let movieTitle = await get(id).title;

    // const deletionInfo = await movieCollection.deleteOne({ _id: parsedId });
    // if (deletionInfo.deletedCount === 0) {
    //   throw `Error: could not delete movie with id of ${id}`;
    // }

    // Find one and delete inspired from slack comment, referenece below
    // https://www.geeksforgeeks.org/python-mongodb-find_one_and_delete-query/#:~:text=Python%20MongoDB%20%E2%80%93%20find_one_and_delete%20Query.%20MongoDB%20is%20a,the%20data%20in%20the%20form%20of%20key-value%20pairs.
    const deletionInfo = await movieCollection.findOneAndDelete({ _id: parsedId });

    if(deletionInfo.value === null) {
        throw `Error: could not delete movie with id of ${id}`;
    }
    let movieTitle = deletionInfo.value.title;
    return `${movieTitle} has been successfully deleted`;
}

async function rename(id, newTitle){
    /*
    async updateDog(id, name, breeds) {
        if (!id) throw 'You must provide an id to search for';

        if (!name) throw 'You must provide a name for your dog';

        if (!breeds || !Array.isArray(breeds))
        throw 'You must provide an array of breeds';

        if (breeds.length === 0) throw 'You must provide at least one breed.';

        const dogCollection = await dogs();
        const updatedDog = {
        name: name,
        breeds: breeds
        };

        const updatedInfo = await dogCollection.updateOne(
        { _id: id },
        { $set: updatedDog }
        );
        if (updatedInfo.modifiedCount === 0) {
        throw 'could not update dog successfully';
        }

        return await this.getDogById(id);
    }
  */
    stringChecker(id, 'ID');
    stringChecker(newTitle, 'newTitle');
    id = id.trim();
    let parsedId = ObjectId(id);

    const movieCollection = await movies();
    const updatedMovie = {
        _id: parsedId,
        title: newTitle
    };

    const updatedInfo = await movieCollection.updateOne(
        { _id: parsedId },
        { $set: updatedMovie }
    );

    if(updatedInfo.modifiedCount === 0) throw 'Could not update movie title successfully.';

    renameResult =  await this.get(id);
    renameResult._id = (renameResult._id).toString();

    return renameResult;
}

module.exports = {create, getAll, get, remove, rename};