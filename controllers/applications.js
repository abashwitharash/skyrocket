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


router.delete('/:applicationId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.applications.id(req.params.applicationId).deleteOne();
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

// this route confirms the edit button...
router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id); // this looks for the user id to edit
    const application = currentUser.applications.id(req.params.applicationId); // this links the user id with the job apps we want to edit 
    res.render('applications/edit.ejs', { // this pushes the confirmed user and job and pushes to a page for edit 
      application: application,  // not sure what this does...
    });
  } catch (error) {
    console.log(error);  // if does not work then redirect to main page 
    res.redirect('/');
  }
});

// this functions the update so when we click update it updates the application 
router.put('/:applicationId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current application from the id supplied by req.params
    const application = currentUser.applications.id(req.params.applicationId);
    // Use the Mongoose .set() method
    // this method updates the current application to reflect the new form
    // data on `req.body`
    application.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current application
    res.redirect(
      `/users/${currentUser._id}/applications/${req.params.applicationId}`  //redirecting to the show page 
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




module.exports = router;
