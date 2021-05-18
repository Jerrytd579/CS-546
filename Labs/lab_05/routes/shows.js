/*
const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/:id', async (req, res) => {
  try {
    const user = await userData.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ message: 'not found!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userList = await userData.getAllUsers();
    res.json(userList);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.get('/:id', async (req, res) => {
  try {
    const show = await showData.getShowById(req.params.id);
    res.json(show);
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: 'Show not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    const showList = await showData.getAllShows();
    res.json(showList);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;