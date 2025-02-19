// middleware/is-signed-in.js
// thios si sayin if the user does exist go to the NEXT 
// thing and if not then go back to sign in page 
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
  };
  
  module.exports = isSignedIn;
  