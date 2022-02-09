//Imports
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const config = require('./config');
try{
    //Static File
    app.use(express.static('public'));
    app.use('/', express.static(__dirname));

    //connection service validate 
    axios.get(config.servurl)
        .then(function (res){
            //log result
            console.log('\x1b[36m%s\x1b[0m','[API] '+ res.data.data +' :D');

            //Define Routing Path
            var indexRoute = require('./routes/indexRoute');
            var loginRouter = require('./routes/loginRoute'); 
            // var registrationRoute = require('./routes/registrationRoute');
            // var forgetPasswordRoute = require('./routes/forgetPasswordRoute');
            // var verificationRoute = require('./routes/verificationRoute');

            //Static Routes File
            app.use('/',indexRoute);
            app.use('/login',loginRouter);
            // app.use('/home',userIndexRoute); //Home
            // app.use('/admin',adminIndexRoute);
            // app.use('/registration',registrationRoute);

            //Set Views engine
            app.set('views', './views');
            app.set('view engine' , 'ejs');

            //Listen on port 3000
            app.listen(config.port,()=> console.info(`[SERVER] Listening on port ${config.port}`));
        })
        .catch(function (err){
            app.get('/',function(req,res){
                res.status(404);
            })
            console.log(err);
            process.exit(1);
        });

    module.exports = app;
}catch (e){
    console.log('\x1b[36m%s\x1b[0m','Exception:'+ e)
}
