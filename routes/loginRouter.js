const express = require('express');
const bodyParser = require ( "body-parser" );
const config = require('../config');
const axios = require('axios');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())

router.get('/',function(req,res,next){
    res.render('login');
});

router.post('/auth',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    if(username && password){
        axios.post(config.ServiceUrl + '/Login/PostLogin',{
            email : username,
            password : password,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
});

module.exports = router;