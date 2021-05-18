const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const bookData = require('./books');

let { ObjectId } = require('mongodb');

function stringChecker(string, argument){
    // Taken from lab_04 movies.js
    if(string == undefined) throw `Error: input ${argument} is undefined.`;
    if(typeof(string) != 'string') throw `Error: input ${argument} is not a string`;
    if(string.trim() == '') throw `Error: input ${argument} is only white space`;
}

async function getAllReviews(bookId){
    // Gets all the reviews for a specified bookID
    stringChecker(bookId, 'getAllReviews bookID');
    /*
    async getUserById(id) {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: id });
        if (!user) throw 'User not found';
        return user;
    },
    */
    let parsedID = ObjectId(bookId);

    const bookCollection = await books();
    const book = await bookCollection.findOne({_id: parsedID})
    if(!book) throw 'Error: book not found';

    bookReviews = book.reviews;
    for(reviews of bookReviews){
        reviews._id = reviews._id.toString();
    }

    return bookReviews;

}

async function getReviewById(reviewID){
    stringChecker(reviewID, 'getReviewById reviewID');   
    let parsedID = ObjectId(reviewID);

    const bookCollection = await books();

    // https://stackoverflow.com/questions/11823296/mongodb-find-subdocument-in-array-matching-parameters
    // Finds the book containing the review with review ID
    let book = await bookCollection.findOne(
        {reviews: {$elemMatch: {_id: parsedID}}}
    );
    if(!book) throw 'Error: No book exists containing that review ID.';

    let reviewsArray = book.reviews;
    //console.log(reviewsArray)
    // https://www.linkedin.com/pulse/javascript-find-object-array-based-objects-property-rafael/
    let theReview = reviewsArray.find(theReview => theReview._id == reviewID);
    theReview._id == theReview._id.toString();
    return theReview;
}

async function createReview(title, reviewer, rating, reviewDate, review, bookId){
    stringChecker(title, 'createReview title');
    stringChecker(reviewer, 'createReview reviewer');

    if(typeof rating != 'number') throw 'Error: rating is not type number.';
    if(rating < 1 || rating > 5) throw 'Error: rating is out of bounds';

    stringChecker(reviewDate, 'createReview reviewDate');
    
    let date_regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
    if(!reviewDate.match(date_regex)) throw 'Error: reviewDate must be format MM/DD/YYYY.';

    let reviewDatePublished = Date.parse(reviewDate);
    let today = new Date();
    let current_date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
    let compareCurrent_Date = Date.parse(current_date);

    if(isNaN(reviewDatePublished)) throw 'Error: date is not a number.';
    if(reviewDatePublished > compareCurrent_Date) throw 'Error: review date is in the future.';


    stringChecker(review, 'createReview review');
    stringChecker(bookId, 'createReview bookId');

    title = title.trim();
    reviewer = reviewer.trim();
    reviewDate = reviewDate.trim();
    review = review.trim();

    let reviewObject = {
        _id: ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: reviewDate,
        review: review
    }

    /*
    async addPostToUser(userId, postId, postTitle) {
        let currentUser = await this.getUserById(userId);
        console.log(currentUser);

        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            { $addToSet: { posts: { id: postId, title: postTitle } } }
        );

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw 'Update failed';

        return await this.getUserById(userId);
  },
  */

    const bookCollection = await books();

    let parsedID = ObjectId(bookId)
    const updateInfo = await bookCollection.updateOne(
        {_id: parsedID},
        {$addToSet: {reviews: reviewObject}}
    )

    if(updateInfo.modifiedCount == 0) throw 'Error: review was not added.';

    //console.log(bookId)
    const theBook = await bookData.getBookById(bookId);
    theBook._id = theBook._id.toString();
    return theBook;
}

async function deleteReview(id){
    stringChecker(id);
    let parsedID = ObjectId(id);

    const bookCollection = await books();
    let book = await bookCollection.findOne(
        {reviews: {$elemMatch: {_id: parsedID}}}
    );
    if(!book) throw 'Error: No book exists containing that review ID.';

    let reviewsArray = book.reviews;
    //console.log(reviewsArray)
    // https://www.linkedin.com/pulse/javascript-find-object-array-based-objects-property-rafael/
    let theReview = reviewsArray.find(theReview => theReview._id == id);
    //console.log(theReview);
    let theReviewID = theReview._id;

    /*
    async removePostFromUser(userId, postId) {
        let currentUser = await this.getUserById(userId);
        console.log(currentUser);

        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            { $pull: { posts: { id: postId } } }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'Update failed';

        return await this.getUserById(userId);
    }
    */

    const updatedInfo = await bookCollection.updateOne(
        {_id: book._id},
        {$pull: {reviews: {_id: parsedID}}}
    );
    if(updatedInfo.modifiedCount == 0) throw 'Error: could not delete review';

    //console.log(theReviewID)
    return {reviewId: theReviewID, deleted: true};
}

module.exports = {getAllReviews, getReviewById, createReview, deleteReview};