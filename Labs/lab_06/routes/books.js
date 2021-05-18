const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;

router.get('/:id', async (req, res) => {
  try {
    const book = await bookData.getBookById(req.params.id.trim());
    res.json(book);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookList = await bookData.getAllBooks();
    res.json(bookList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/', async (req, res) => {
  const postBookData = req.body;

  // Book data error handling
  if(!postBookData){
    res.status(400).json({ error: 'You must provide data to create a book.' });
    return;
  }

  if(Object.keys(postBookData).length != 5){
    res.status(400).json({error: "New book has invalid number of keys"});
    return;
  }

  // Book title error handling
  if(!postBookData.title){
    res.status(400).json({error: 'You must supply a book title.'});
    return;    
  }
  if(typeof postBookData.title != 'string'){
    res.status(400).json({error: 'Supplied book title must be type string.'});
    return;
  }
  if(postBookData.title.trim() == ''){
    res.status(400).json({error: 'Supplied book title must not be all whitespace.'});
    return;
  }

  // Book author error handling
  if(!postBookData.author){
    res.status(400).json({error: 'You must supply a book author object.'});
    return;
  }
  if(typeof postBookData.author != 'object'){
    res.status(400).json({error: 'Supplied book author must be type object.'});
    return;
  }
  if(Object.keys(postBookData.author).length > 2){
    res.status(400).json({error: 'Supplied book author object incorrect format.'});
    return;
  }
  if(!postBookData.author.authorFirstName){
    res.status(400).json({error: 'You must supply a book author first name'});
    return;
  }
  if(typeof postBookData.author.authorFirstName != 'string'){
    res.status(400).json({error: 'Supplied book author first name must be type string.'});
    return;
  }
  if(postBookData.author.authorFirstName.trim() == ''){
    res.status(400).json({error: 'Supplied book author first name cannot be all whitespace.'});
    return;
  }
  if(!postBookData.author.authorLastName){
    res.status(400).json({error: 'You must supply a book author last name'});
    return;
  }
  if(typeof postBookData.author.authorLastName != 'string'){
    res.status(400).json({error: 'Supplied book author last name must be type string.'});
    return;
  }
  if(postBookData.author.authorLastName.trim() == ''){
    res.status(400).json({error: 'Supplied book author last name cannot be all whitespace.'});
    return;
  }

  // Book genre error handling
  if(!postBookData.genre){
    res.status(400).json({error: 'Book genres array must be supplied.'});
    return;
  }
  if(!Array.isArray(postBookData.genre)){
    res.status(400).json({error: 'Supplied book genres must be type array.'});
    return;
  }
  if(postBookData.genre.length == 0){
    res.status(400).json({error: 'Supplied genre length array cannot be empty.'});
    return;
  }
  for(movieGenre in postBookData.genre){
    if(typeof postBookData.genre[movieGenre] != 'string'){
      res.status(400).json({error: 'Supplied movie genres must be type string.'});
      return;
    }
    if(postBookData.genre[movieGenre].trim() == ''){
      res.status(400).json({error: 'Supplied movie genres must not be all whitespace.'})
      return;
    }
  }

  // Book date published error handling
  if(!postBookData.datePublished){
    res.status(400).json({error: 'Date published must be supplied.'});
    return;
  }
  if(typeof postBookData.datePublished != 'string'){
    res.status(400).json({error: 'Supplied date published must be type string.'});
    return;
  }
  if(postBookData.datePublished.trim() == ''){
    res.status(400).json({error: 'Supplied date must not be all whitespace.'});
    return;
  }

  let date_regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;

  if(!postBookData.datePublished.match(date_regex)){
    res.status(400).json({error: 'Supplied date must be format MM/DD/YYYY.'});
    return;
  }

  let bookDatePublished = Date.parse(postBookData.datePublished);
  let today = new Date();
  let currDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
  let compareCurrent_Date = Date.parse(currDate);
  
  if(bookDatePublished > compareCurrent_Date){
    res.status(400).json({error: 'Supplied published date is in the future.'});
    return;
  }

  // Book summary error handling
  if(!postBookData.summary){
    res.status(400).json({error: 'Summary field not provided.'});
    return;
  }
  if(typeof postBookData.summary != 'string'){
    res.status(400).json({error: 'Supplied book summary must be type string.'});
    return;
  }
  if(postBookData.summary.trim() == ''){
    res.status(400).json({error: 'Supplied book summary must not be all whitespace.'});
    return;
  }  

  // Creating the book
  try{
    const newBook = await bookData.createBook(
      postBookData.title,
      postBookData.author,
      postBookData.genre,
      postBookData.datePublished,
      postBookData.summary
    );
    res.status(200).json(newBook);
  } catch(e){
    res.status(500).json({error: e});
  }

});

router.put('/:id', async (req, res) => {
  const putBookData = req.body;

  // Book data error handling
  if(!putBookData){
    res.status(400).json({ error: 'You must provide data to create a book.' });
    return;
  }

  if(Object.keys(putBookData).length != 5){
    res.status(400).json({error: "New book has invalid number of keys"});
    return;
  }

  // Book title error handling
  if(!putBookData.title){
    res.status(400).json({error: 'You must supply a book title.'});
    return;    
  }
  if(typeof putBookData.title != 'string'){
    res.status(400).json({error: 'Supplied book title must be type string.'});
    return;
  }
  if(putBookData.title.trim() == ''){
    res.status(400).json({error: 'Supplied book title must not be all whitespace.'});
    return;
  }

  // Book author error handling
  if(!putBookData.author){
    res.status(400).json({error: 'You must supply a book author object.'});
    return;
  }
  if(typeof putBookData.author != 'object'){
    res.status(400).json({error: 'Supplied book author must be type object.'});
    return;
  }
  if(Object.keys(putBookData.author).length != 2){
    res.status(400).json({error: 'Supplied book author object incorrect format.'});
    return;
  }
  if(!putBookData.author.authorFirstName){
    res.status(400).json({error: 'You must supply a book author first name'});
    return;
  }
  if(typeof putBookData.author.authorFirstName != 'string'){
    res.status(400).json({error: 'Supplied book author first name must be type string.'});
    return;
  }
  if(putBookData.author.authorFirstName.trim() == ''){
    res.status(400).json({error: 'Supplied book author first name cannot be all whitespace.'});
    return;
  }
  if(!putBookData.author.authorLastName){
    res.status(400).json({error: 'You must supply a book author last name'});
    return;
  }
  if(typeof putBookData.author.authorLastName != 'string'){
    res.status(400).json({error: 'Supplied book author last name must be type string.'});
    return;
  }
  if(putBookData.author.authorLastName.trim() == ''){
    res.status(400).json({error: 'Supplied book author last name cannot be all whitespace.'});
    return;
  }

  // Book genre error handling
  if(!putBookData.genre){
    res.status(400).json({error: 'Book genres array must be supplied.'});
    return;
  }
  if(!Array.isArray(putBookData.genre)){
    res.status(400).json({error: 'Supplied book genres must be type array.'});
    return;
  }
  if(putBookData.genre.length == 0){
    res.status(400).json({error: 'Supplied genre length array cannot be empty.'});
    return;
  }
  for(movieGenre in putBookData.genre){
    if(typeof putBookData.genre[movieGenre] != 'string'){
      res.status(400).json({error: 'Supplied movie genres must be type string.'});
      return;
    }
    if(putBookData.genre[movieGenre].trim() == ''){
      res.status(400).json({error: 'Supplied movie genres must not be all whitespace.'})
      return;
    }
  }

  // Book date published error handling
  if(!putBookData.datePublished){
    res.status(400).json({error: 'Date published must be supplied.'});
    return;
  }
  if(typeof putBookData.datePublished != 'string'){
    res.status(400).json({error: 'Supplied date published must be type string.'});
    return;
  }
  if(putBookData.datePublished.trim() == ''){
    res.status(400).json({error: 'Supplied date must not be all whitespace.'});
    return;
  }

  let date_regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;

  if(!putBookData.datePublished.match(date_regex)){
    res.status(400).json({error: 'Supplied date must be format MM/DD/YYYY.'});
    return;
  }

  let bookDatePublished = Date.parse(putBookData.datePublished);
  let today = new Date();
  let currDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
  
  if(bookDatePublished > currDate){
    res.status(400).json({error: 'Supplied published date is in the future.'});
    return;
  }

  // Book summary error handling
  if(!putBookData.summary){
    res.status(400).json({error: 'Summary field not provided.'});
    return;
  }
  if(typeof putBookData.summary != 'string'){
    res.status(400).json({error: 'Supplied book summary must be type string.'});
    return;
  }
  if(putBookData.summary.trim() == ''){
    res.status(400).json({error: 'Supplied book summary must not be all whitespace.'});
    return;
  }    

  /*
    try {
    await userData.getUserById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  try {
    const updatedUser = await userData.updateUser(req.params.id, userInfo);
    res.json(updatedUser);
  } catch (e) {
    res.sendStatus(500);
  }
  */

  // NOTE TO SELF:
  // Reviews should not be able to be modified in this route. 
  // You must copy the old array of review ids from the existing book first and 
  // then insert them into the updated document so they are retained and not overwritten.

  try{
    let oldBook = await bookData.getBookById(req.params.id);
    putBookData.reviews = oldBook.reviews;
    //console.log(req.params.id);
  } catch(e){
    res.status(404).json({error: 'Book not found.'});
    return;
  }
  try{
    const updatedBook = await bookData.updateBook(req.params.id, putBookData);
    res.status(200).json(updatedBook);
  } catch(e){
    res.status(500).json({error: `error: ${e}`});
    return;
  }
});

router.patch('/:id', async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};

  // Error handling
  // Error handling on title
  if(requestBody.title){
    if(typeof requestBody.title != 'string'){
      res.status(400).json({error: 'Supplied title is not type string.'});
      return;
    }
    if(requestBody.title.trim() == ''){
      res.status(400).json({error: 'Supplied title must not be all whitespace.'});
      return;
    }
  requestBody.title = requestBody.title.trim();
  }

  // Error handling author
  if(requestBody.author){
    if(typeof requestBody.author != 'object'){
      res.status(400).json({error: 'Supplied book author must be type object.'});
      return;
    }
    if(Object.keys(requestBody.author).length > 2 || Object.keys(requestBody.author).length <= 0){
      res.status(400).json({error: 'Supplied book author object incorrect format.'});
      return;
    }
    // https://attacomsian.com/blog/javascript-object-check-if-property-exists
    // Tests if something is inside of an object    
    // I don't know why but just doing if(updatedBook.author.authorFirstName)
    // wasn't working on its own.
    if(requestBody.author.hasOwnProperty('authorFirstName')){
      if(typeof requestBody.author.authorFirstName != 'string'){
        res.status(400).json({error: 'Supplied book author first name is not type string.'});
        return;
      }
      if(requestBody.author.authorFirstName.trim() == ''){
        res.status(400).json({error: 'Supplied book author first name must not be all whitespace'});
        return;
      }
      requestBody.author.authorFirstName = requestBody.author.authorFirstName.trim();
    }
    if(requestBody.author.hasOwnProperty('authorLastName')){
      if(typeof requestBody.author.authorLastName != 'string'){
        res.status(400).json({error: 'Supplied book author last name is not type string.'});
        return;
      }
      if(requestBody.author.authorLastName.trim() == ''){
        res.status(400).json({error: 'Supplied book author last name must not be all whitespace.'});
        return;
      }
      requestBody.author.authorLastName = requestBody.author.authorLastName.trim();
    }
  }

  // Error handling genre
  if(requestBody.genre){
    if(!Array.isArray(requestBody.genre)){
      res.status(400).json({error: 'Supplied book genres must be type array.'});
      return;
    }
    if(requestBody.genre.length == 0){
      res.status(400).json({error: 'If supplied, book genre array must not be empty.'});
      return;
    }
    for(movieGenre in requestBody.genre){
      if(typeof requestBody.genre[movieGenre] != 'string'){
        res.status(400).json({error: `Genre ${requestBody.genre[movieGenre]} is not type string.`});
        return;
      }
      if(requestBody.genre[movieGenre].trim() == ''){
        res.status(400).json({error: 'Genre array cannot have empty strings.'});
        return;
      }
      requestBody.genre[movieGenre] = requestBody.genre[movieGenre].trim();
    }
  }

  // Error handling date published
  if(requestBody.datePublished){
    if(typeof requestBody.datePublished != 'string'){
      res.status(400).json({error: 'Date published must be type string.'});
      return;
    }
    if(requestBody.datePublished.trim() == ''){
      res.status(400).json({error: 'Date published must not be all whitespace.'});
      return;
    }

    requestBody.datePublished = requestBody.datePublished.trim();

    let date_regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
    if(!requestBody.datePublished.match(date_regex)){
      res.status(400).json({error: 'Date published must be format MM/DD/YYYY'});
      return;
    }

    let bookDatePublished = Date.parse(updatedBook.datePublished);
    let today = new Date();
    let current_date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
    let compareCurrent_date = Date.parse(current_date);

    if(isNaN(bookDatePublished)){
      res.status(400).json({error: 'Book date published is not a number'});
      return;
    }
    if(bookDatePublished > compareCurrent_date){
      res.status(400).json({error: 'Date published is in the future'});
      return;
    }
  }

  // Error handling summary
  if(requestBody.summary){
    if(typeof requestBody.summary != 'string'){
      res.status(400).json({error: 'Summary is not type string'});
      return;
    }
    if(requestBody.summary.trim() == ''){
      res.status(400).json({error: 'Summary must not be all whitespace.'});
      return;
    }
    requestBody.summary = requestBody.summary.trim();
  }

  // Patching
  try{
    const oldBook = await bookData.getBookById(req.params.id);
    if(requestBody.title && requestBody.title != oldBook.title)
      updatedObject.title = requestBody.title;
    if(requestBody.author && requestBody.author != oldBook.author){
      updatedObject.author = oldBook.author;
      if(requestBody.author.authorFirstName && requestBody.author.authorFirstName != oldBook.author.authorFirstName){
        updatedObject.author.authorFirstName = requestBody.author.authorFirstName;
      }
      if(requestBody.author.authorLastName && requestBody.author.authorLastName != oldBook.author.authorLastName){
        updatedObject.author.authorLastName = requestBody.author.authorLastName;
      }
    }
    if(requestBody.genre && requestBody.genre != oldBook.genre){
      updatedObject.genre = oldBook.genre;
      updatedObject.genre = updatedObject.genre.concat(requestBody.genre);
      // https://stackoverflow.com/questions/40455914/concat-multiple-arrays-into-one-array-without-duplicates
      updatedObject.genre = [...new Set(updatedObject.genre)];
    }
    if(requestBody.datePublished && requestBody.datePublished != oldBook.datePublished)
      updatedObject.datePublished = requestBody.datePublished;
    if(requestBody.summary && requestBody.summary != oldBook.summary)
      updatedObject.summary = requestBody.summary;
  } catch(e){
    console.log(e)
    res.status(404).json({error: 'Book not found'});
    return;
  }
  if(Object.keys(updatedObject).length !== 0){
    try{
      const updatedBook = await bookData.updateBook(
        req.params.id,
        updatedObject
      );
      res.status(200).json(updatedBook)
    } catch(e){
      console.log(e);
      res.status(500).json({error: e});
    }
  } else{
    res.status(400).json({
      error: 'No fields have been changed from their inital values, so no update has occurred'
    })
    }
});

router.delete('/:id', async (req, res) => {
// NEED TO UPDATE TO ALSO REMOVE ALL REVIEWS ASSOCIATED WITH THE BOOK
  if(!req.params.id) throw 'Error: Book ID not specified';

  try{
    await bookData.getBookById(req.params.id);
  } catch(e){
    res.status(404).json({error: 'Book not found'});
    return;
  }

  try{
    await bookData.removeBook(req.params.id);
    res.sendStatus(200);
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;