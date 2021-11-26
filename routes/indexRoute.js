const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('../config');
const cookie_tools = require('../tools/cookie_tools');
const encrypt_decrypt_tools = require('../tools/encrypt_decrypt_tools');
const cookieParser = require('cookie-parser');
const { json } = require('express');
const { data } = require('jquery');

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());


router.use(cookieParser());

router.use(function (req, res, next) {
    cookie_tools.validateAccount();
    next();
})

router.get('/',function(req,res,next){
    res.render('index',{data:'Test'});
});

router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    if(username && password){
        axios
        .post(config.servurl + '/Login/PostLogin',{
            email : username,
            password : password,
        })
        .then(function (response) {
            
            if(response.data.status == "Succeed"){
                axios
                .get(config.servurl + '/GetDataUser/'+ response.data.data[0].id)
                .then(function(response){
                    
                    //new cookie
                    userdata_enc = encrypt_decrypt_tools.encrypt(JSON.stringify(response.data.data[0]));
                    
                })
                .catch(function(response){


                });
            }
        })
        .catch(function (error) {
            //error
            console.log(error);
        });
    }
});



module.exports = router;
