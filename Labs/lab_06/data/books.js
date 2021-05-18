const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;

let { ObjectId } = require('mongodb');

function stringChecker(string, argument){
    // Taken from lab_04 movies.js
    if(string == undefined) throw `Error: input ${argument} is undefined.`;
    if(typeof(string) != 'string') throw `Error: input ${argument} is not a string`;
    if(string.trim() == '') throw `Error: input ${argument} is only white space`;
}

async function getAllBooks(){
    /*
    async getAllUsers() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if (!userList) throw 'No users in system!';
        return userList;
    }    
    */
   const bookCollection = await books();
   //.find(
   // {},
   // { projection: { _id: 0, title: 1, 'info.director': 1, cast: 1 } }
   //)
   const bookList = await bookCollection.find({}, {projection: { _id: 1, title: 1 }}).toArray();
   if (!bookList) throw 'Error: No books in system!';
   return bookList;
}

async function getBookById(id){
    /*
    async getUserById(id) {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: id });
        if (!user) throw 'User not found';
        return user;
    }
    */
    stringChecker(id, 'getBookById ID');
    id = id.trim();

    let parsedId = ObjectId(id);

    const bookCollection = await books();
    const book = await bookCollection.findOne({ _id: parsedId});

    if(!book) throw 'Error: Book not found';

    book._id = (book._id).toString();
    return book;
}

async function createBook(title, author, genre, datePublished, summary){
    stringChecker(title, 'createBook title');

    // Author object error handling
    if(typeof author != 'object') throw 'Error: createBook author is not type object.';
    if(Object.keys(author).length != 2) throw 'Error: createBook author input count not valid.';
    stringChecker(author.authorFirstName, 'createBook authorFirstName');
    stringChecker(author.authorLastName, 'createBook authorLastName');

    stringChecker(summary, 'createBook summary');

    // Genre error handling
    if(!Array.isArray(genre)) throw 'Error: createBook genre is not type array.'
    if(genre.length == 0) throw 'Error: createBook genre array cannot be empty.'
    for(movieGenre in genre){
        // Also doing my trim in this for loop
        stringChecker(genre[movieGenre], `createBook genre[${movieGenre}]`);
        genre[movieGenre] = genre[movieGenre].trim();
    };
    // Checks if genre array contains duplicates, after trimming everything.
    // https://medium.com/@will_devs/javascript-how-to-check-if-an-array-has-duplicate-values-598e26375cba
    // if(new Set(genre).size !== genre.length) throw 'Error: genre duplicates exist in genre';


    // Date error handling
    // mm/dd/yyyy checker from https://www.w3resource.com/javascript/form/javascript-date-validation.php
    stringChecker(datePublished, 'createBook datePublished')
    
    let date_regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
    if(!datePublished.match(date_regex)) throw 'Error: createBook datePublished must be format MM/DD/YYYY.';

    let bookDatePublished = Date.parse(datePublished);
    let today = new Date();
    let current_date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
    let compareCurrent_Date = Date.parse(current_date)

    if(isNaN(bookDatePublished)) throw 'Error: createBook bookDatePublished is not a number.';
    if(bookDatePublished > compareCurrent_Date) throw 'Error: createBook published book date is in the future.';

    title = title.trim();
    author.authorFirstName = author.authorFirstName.trim();
    author.authorLastName = author.authorLastName.trim();
    // performed genre trimming in for loop above.
    datePublished = datePublished.trim();

    let bookCollection = await books();

    let newBook = {
        title: title,
        author: author,
        genre: genre,
        datePublished: datePublished,
        summary: summary,
        reviews: []
    };

    /* data/movies.js lab4 code
    const insertInfo = await moviesCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'Error: could not add movie.';

    const newId = insertInfo.insertedId.toString();
    let insertedMovie = await get(newId);
    insertedMovie._id = (insertedMovie._id).toString();
    return insertedMovie;
    */

    const insertInfo = await bookCollection.insertOne(newBook);
    if (insertInfo.insertedCount === 0) throw 'Error: createBook could not add book.';

    const newID = insertInfo.insertedId.toString();
    let insertedBook = await getBookById(newID);
    insertedBook._id = (insertedBook._id).toString();

    return insertedBook;
}

async function removeBook(id){
    const bookCollection = await books();
    stringChecker(id, 'removeBook ID');
    id = id.trim();
    let parsedId = ObjectId(id);
    /*
    async removeUser(id) {
        const userCollection = await users();
        const deletionInfo = await userCollection.removeOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete user with id of ${id}`;
        }
    return true;
    }
    */
    const deletionInfo = await bookCollection.findOneAndDelete({ _id: parsedId });
    if(deletionInfo.value == null) throw `Error: could not delete book with id of ${id}.`;
    return true;
}

async function updateBook(id, updatedBook){
    // ID input handling
    stringChecker(id, 'updateBook updatedBook');
    id = id.trim();
    let parsedId = ObjectId(id);

    let bookUpdateInfo = {};
    // updatedBook input handling & string trimming
    // note: updateBook does not have to throw if updatedBook data is not provided; this
    //          should be handled in the routes, as both put and patch will utilize
    //          this function.
    if(updatedBook.title){
        stringChecker(updatedBook.title, 'updateBook updatedBook title');
        updatedBook.title = updatedBook.title.trim();

        bookUpdateInfo.title = updatedBook.title;
    }
    if(updatedBook.author){
        if(typeof updatedBook.author != 'object') throw 'Error: updateBook updatedBook author is not type object.';
        if(Object.keys(updatedBook.author).length > 2 || Object.keys(updatedBook.author).length == 0) throw 'Error: updateBook updatedBook author input count not valid.';
        // https://attacomsian.com/blog/javascript-object-check-if-property-exists
        // Tests if something is inside of an object
        // I don't know why but just doing if(updatedBook.author.authorFirstName)
        // wasn't working on its own.
        if(updatedBook.author.hasOwnProperty('authorFirstName')){
            stringChecker(updatedBook.author.authorFirstName, 'updateBook updatedBook authorFirstName');
            updatedBook.author.authorFirstName = updatedBook.author.authorFirstName.trim();
        }
        if(updatedBook.author.hasOwnProperty('authorLastName')){
            stringChecker(updatedBook.author.authorLastName, 'updateBook updatedBook authorLastName');
            updatedBook.author.authorLastName = updatedBook.author.authorLastName.trim();
        }

        bookUpdateInfo.author = updatedBook.author;
    }

    if(updatedBook.genre){
        if(!Array.isArray(updatedBook.genre)) throw `Error: updateBook updatedBook genre is not type array. Array? ${Array.isArray(updatedBook.genre)} ${typeof updatedBook.genre}`;
        if(updatedBook.genre.length == 0) throw 'Error: updatebook updatedBook genres array cannot be empty.';
        for(movieGenre in updatedBook.genre){
            stringChecker(updatedBook.genre[movieGenre], `updateBook updatedBook genre[${movieGenre}]`);
            updatedBook.genre[movieGenre] = updatedBook.genre[movieGenre].trim();
        }

        bookUpdateInfo.genre = updatedBook.genre;
    }
    if(updatedBook.datePublished){
        // Date error handling
        // mm/dd/yyyy checker from https://www.w3resource.com/javascript/form/javascript-date-validation.php
        stringChecker(updatedBook.datePublished, 'updateBook updatedBook datePublished');
        updatedBook.datePublished = updatedBook.datePublished.trim();
    
        let date_regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
        if(!updatedBook.datePublished.match(date_regex)) throw 'Error: updateBook updatedBook datePublished must be format MM/DD/YYYY.';

        let bookDatePublished = Date.parse(updatedBook.datePublished);
        let today = new Date();
        let current_date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
        let compareCurrent_Date = Date.parse(current_date)

        if(isNaN(bookDatePublished)) throw 'Error: date is not a number.';
        if(bookDatePublished > compareCurrent_Date) throw 'Error: published book date is in the future.';

        bookUpdateInfo.datePublished = updatedBook.datePublished;
    }
    if(updatedBook.summary){
        stringChecker(updatedBook.summary, 'updateBook updatedBook summary');
        updatedBook.summary = updatedBook.summary.trim();

        bookUpdateInfo.summary = updatedBook.summary;
    }

    /*
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: id },
      { $set: userUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getUserById(id);
    */
    const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne( { _id: parsedId}, { $set: bookUpdateInfo } );

    if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Error: update failed';

    return await this.getBookById(id);
}

module.exports = {getAllBooks, getBookById, createBook, removeBook, updateBook};