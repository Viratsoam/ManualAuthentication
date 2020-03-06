// it's my entry point to all the routes


// get the express
const express = require('express');
// get the express router
const router = express.Router();


// for checking the router is working or not
console.log("Router has been loaded!!");

// get the  home  controller
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);


router.use('/user', require('./user'))

// for any futher router,access from here
// router.use(/routerName', require('./routerFilename'))



// exporting the router 
module.exports = router;