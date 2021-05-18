const express = require('express');
const router = express.Router();

let myData = 
    {
        "name": "Jerry Cheng",
        "cwid": "10437904",
        "biography": "My name is Jerry Cheng, and I am a computer science student at the Stevens Institute of Technology. \n I am from Toms River, New Jersey. My favorite hobbies include playing video games and hanging out with friends. My favorite foods include soup dumplings and burgers.",
        "favoriteShows": ["Arrested Development", "House M.D.", "House of Cards", "Community"]
    }

// From lecture_05/routes/posts.js
/*
router.get('/', async (req, res) => {
  try {
    const postList = await postData.getAllPosts();
    res.json(postList);
  } catch (e) {
    res.status(500).send();
  }
});
*/
router.get('/', async (req, res) => {
    try {
      //res.json(showList);
      res.json(myData);
    } catch (e) {
      res.status(500).send();
    }
  });

module.exports = router;