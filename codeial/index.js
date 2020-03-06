const express = require('express');
const port = 8001;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use the express router
app.use('/',require('./routes'));

// setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

// listen to the port 
app.listen(port,function(err){
    if(err){
        console.log('Error :',err);
    }
    console.log(`Server is up at port: ${port}`);
    // console.log('server is up with port:',port);
});