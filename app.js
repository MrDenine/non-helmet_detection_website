//Imports
const express = require('express');
const axios = require('axios');
const config = require('./config');
const app = express();
const port = 8000;

//Static File
app.use(express.static('public'));
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'));
app.use('/javascripts', express.static(__dirname + 'public/javascripts'));
app.use('/images', express.static(__dirname + 'public/images'));

//Static Node_Module File
app.use('/plugins', express.static(__dirname + '/node_modules'));

//connection service validate 
axios.get(config.ServiceUrl)
    .then(function (res){
        //log result
        console.log('\x1b[36m%s\x1b[0m','[API] '+ res.data.data +' :D');

        //Define Routing Path
        var indexRouter = require('./routes/indexRoute');
        var loginRouter = require('./routes/loginRouter');

        //Static Routes File
        app.use('/',indexRouter);
        app.use('/login',loginRouter);

        //Set Views engine
        app.set('views', './views');
        app.set('view engine' , 'ejs');

        //Listen on port 3000
        app.listen(port,()=> console.info(`[SERVER] Listening on port ${port}`));
    })
    .catch(function (err){
        app.get('/',function(req,res){
            res.status(404);
        })
        console.log('\x1b[31m%s\x1b[0m', '[API] Unable to contact API...');
        console.log('\x1b[31m%s\x1b[0m', '[API] Please enable service before start on port!!!');
        process.exit(1);
    });

module.exports = app;