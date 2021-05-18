const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const bookData = data.books;

router.get('/:bookId', async (req, res) => {
  let bookId = req.params.bookId;

  if(!bookId){
    res.status(400).json({error: 'No book id was supplied.'});
    return;
  }

  try{
    await bookData.getBookById(bookId);
  } catch(e){
    console.log(e);
    res.status(404).json({error: 'Book with supplied ID not found.'});
    return;
  }

  try{
    let reviews = await reviewData.getAllReviews(bookId);
    if(reviews.length == 0){
      res.status(404).json({error: 'Book contains no reviews'});
      return;
    }
    return res.status(200).json(reviews);
  } catch(e){
    console.log(e);
    res.status(500).json({error: e});
  }
});

router.get('/:bookId/:reviewId', async (req, res) => {
  let bookId = req.params.bookId;
  let reviewId = req.params.reviewId;

  if(!bookId){
    res.status(400).json({error: 'Must supply book id.'});
    return;
  }
  if(!reviewId){
    res.status(400).json({error: 'Must supply review id.'});
    return;
  }

  try{
    await bookData.getBookById(bookId);
  } catch(e){
    console.log(e);
    res.status(404).json({error: 'Supplied book with supplied book id not found.'});
    return;
  }

  try{
    const review = await reviewData.getReviewById(reviewId);
    res.status(200).json(review);
  } catch(e){
    console.log(e);
    res.status(404).json({error: 'Supplied review with supplied review id not found.'});
    return
  }
});

router.post('/:bookId', async (req, res) => {
  let bookId = req.params.bookId;
  let postReviewData = req.body;

  try{
    await bookData.getBookById(bookId)
  } catch(e){
    console.log(e);
    res.status(404).json({error: `Supplied book with bookId ${bookId} does not exist.`})
    return;
  }

  // Review data error handling
  if(!postReviewData){
    res.status(400).json({error: 'You must provide data to create a review.'});
    return;
  }

  if(Object.keys(postReviewData).length != 5){
    res.status(400).json({error: 'New review has invalid number of keys.'});
    return;
  }

  // Review title error handling
  if(!postReviewData.title){
    res.status(400).json({error: 'You must supply a review title.'});
    return;
  }
  if(typeof postReviewData.title != 'string'){
    res.status(400).json({error: 'Supplied review title must be type string.'});
    return;
  }
  if(postReviewData.title.trim() == ''){
    res.status(400).json({error: 'Supplied review title must not be all whitespace.'});
    return;
  }

  // Review reviewer error handling
  if(!postReviewData.reviewer){
    res.status(400).json({error: 'You must supply a review reviewer.'});
    return;
  }
  if(typeof postReviewData.reviewer != 'string'){
    res.status(400).json({error: 'Supplied review reviewer must be type string.'});
    return;
  }
  if(postReviewData.reviewer.trim() == ''){
    res.status(400).json({error: 'Supplied review reviewer must not be all whitespace.'});
    return;
  }

  // Review rating error handling
  if(!postReviewData.rating){
    res.status(400).json({error: 'You must supply a review rating.'});
    return;
  }
  if(typeof postReviewData.rating != 'number'){
    res.status(400).json({error: 'Supplied review rating must be type number'});
    return;
  }
  if(postReviewData.rating < 1 || postReviewData.rating > 5){
    res.status(400).json({error: 'Supplied review rating is out of bounds. Must be between 1-5'});
    return;
  }

  // Review dateofreview error handling
  if(!postReviewData.dateOfReview){
    res.status(400).json({error: 'You must supply a review date of review.'});
    return;
  }
  if(typeof postReviewData.dateOfReview != 'string'){
    res.status(400).json({error: 'Supplied date of review must be type string.'});
    return;
  }
  if(postReviewData.dateOfReview.trim() == ''){
    res.status(400).json({error: 'Supplied date must not be all whitespace.'});
    return;
  }

  let date_regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;

  if(!postReviewData.dateOfReview.match(date_regex)){
    res.status(400).json({error: 'Supplied date must be format MM/DD/YYYY.'});
    return;
  }

  let reviewDatePublished = Date.parse(postReviewData.dateOfReview);
  let today = new Date();
  let currDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
  let currentDate = Date.parse(currDate)

  //console.log(currDate, reviewDatePublished)

  if(isNaN(reviewDatePublished)){
    res.status(400).json({error: 'Supplied published date is not valid'});
    return;
  }
  if(reviewDatePublished > currentDate){
    res.status(400).json({error: 'Supplied published date is in the future.'});
    return;
  }

  // Review review error handling
  if(!postReviewData.review){
    res.status(400).json({error: 'Review data must be provided.'});
    return;
  }
  if(typeof postReviewData.review != 'string'){
    res.status(400).json({error: 'Supplied review review must be type string.'});
    return;
  }
  if(postReviewData.review.trim() == ''){
    res.status(400).json({error: 'Supplied review review must not be all whitespace.'});
    return;
  }

  postReviewData.title = postReviewData.title.trim();
  postReviewData.reviewer = postReviewData.reviewer.trim();
  postReviewData.dateOfReview = postReviewData.dateOfReview.trim();
  postReviewData.review = postReviewData.review.trim();

  try{
    const newReview = await reviewData.createReview(
      postReviewData.title,
      postReviewData.reviewer,
      postReviewData.rating,
      postReviewData.dateOfReview,
      postReviewData.review,
      bookId
    );
    res.status(200).json(newReview);
  } catch(e){
    console.log(e);
    res.status(500).json({error: e});
  }

});

router.delete('/:bookId/:reviewId', async(req, res) => {
  let bookId = req.params.bookId;
  let reviewId = req.params.reviewId;

  try{
    await bookData.getBookById(bookId)
  } catch(e){
    console.log(e);
    res.status(404).json({error: `Supplied book with bookId ${bookId} does not exist.`})
    return;
  }

  try{
    await reviewData.getReviewById(reviewId)
  } catch(e){
    console.log(e);
    res.status(404).json({error: `Supplied review with reviewId ${reviewId} does not exist.`})
    return;
  }

  try{
    let x = await reviewData.deleteReview(reviewId);
    res.status(200).json(x);
  } catch(e){
    console.log(e);
    res.status(500).json({error: e});
  }
});

module.exports = router;