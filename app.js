//Imports
const express = require('express');
const axios = require('axios');
const config = require('./config');
const path = require('path');
const app = express();
const port = 8000;

try{
    //Static File
    app.use(express.static('public'));
    app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'));
    app.use('/javascripts', express.static(__dirname + 'public/javascripts'));
    app.use('/images', express.static(__dirname + 'public/images'));

    //Static Node_Module File
    app.use('/plugins', express.static(__dirname + '/node_modules'));

    //connection service validate 
    axios.get(config.servurl)
        .then(function (res){
            //log result
            console.log('\x1b[36m%s\x1b[0m','[API] '+ res.data.data +' :D');

            //Define Routing Path
            var indexRouter = require('./routes/indexRoute'); //Index
            var userIndexRoute = require('./routes/userIndexRoute'); //Home
            var adminIndexRoute = require('./routes/adminIndexRoute');
            var registrationRoute = require('./routes/registrationRoute');
            var forgetPasswordRoute = require('./routes/forgetPasswordRoute');
            var verificationRoute = require('./routes/verificationRoute');

            //Static Routes File
            app.use('/',indexRouter);
            app.use('/home',userIndexRoute); //Home
            app.use('/admin',adminIndexRoute);
            app.use('/registration',registrationRoute);

            //Set Views engine
            
            // app.set('views', './views');
            app.set('views', path.join(__dirname, './views'));
            app.set('view engine' , 'ejs');

            //Listen on port 3000
            app.listen(port,()=> console.info(`[SERVER] Listening on port ${port}`));
        })
        .catch(function (err){
            app.get('/',function(req,res){
                res.status(404);
            })
            console.log(err);
            // console.log('\x1b[31m%s\x1b[0m', '[API] Unable to contact API...');
            // console.log('\x1b[31m%s\x1b[0m', '[API] Please enable service before start on port!!!');
            process.exit(1);
        });

    module.exports = app;
}catch (e){
    console.log('\x1b[36m%s\x1b[0m','Exception :'+ e)
}
