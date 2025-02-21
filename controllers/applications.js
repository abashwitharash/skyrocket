const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
// routes send info between one to another 
//index route 
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        // saying try to do this and if not then push the error. sort of like an if/else statment
      res.render('applications/index.ejs', {
        applications: currentUser.applications
      });

    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  //making a new template in applications to make a new application to add new apps like job applications...this is the start to adding a list....
  //create the page first 
  
  router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
  });

  //post into user/applicaitons 
router.post('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Push req.body (the new form data object) to the
      // applications array of the current user so we can pus the request body 
      currentUser.applications.push(req.body);
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the applications index view
      res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
  


router.get("/:applicationId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id); //this searches for a user by ID 
    const application = currentUser.applications.id(req.params.applicationId); //this grabs the applications associated with that ID 
    res.render('applications/show.ejs', {
      application: application, // this is a key value pair...whatever that means 
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
