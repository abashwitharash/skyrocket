const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
// routes send info between one to another 
//index route 
router.get('/', async (req, res) => {
    try { // saying try to do this and if not then push the error. sort of like an if/else statment
      res.render('applications/index.ejs');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


  //making a new template in applications to make a new application
  router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
  });

module.exports = router;
