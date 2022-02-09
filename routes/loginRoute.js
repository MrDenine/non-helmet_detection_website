const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('../config');
const encrypt_decrypt_tools = require('../utils/encrypt_decrypt_tools');
const cookieParser = require('cookie-parser');
const { json } = require('express');
const { data } = require('jquery');

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

router.use(cookieParser());

router.get('/',function(req,res,next){
    res.render('authen/login',{data:'Test'});
});

router.post('/login',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    
    if(username && password){
        //call postLogin
        axios
        .post(config.servurl + '/Login/PostLogin',{
            email : username,
            password : password,
        })
        .then(function (response) {
            if(response.data.status == "Succeed"){
                //call getUserdata
                axios
                .get(config.servurl + '/GetDataUser/'+ response.data.data[0].id)
                .then(function(response){
                    //get userdata
                    userdata = response.data.data[0];
                    userdata_enc = encrypt_decrypt_tools.encrypt(JSON.stringify(response.data.data[0]));
                    
                    //setCookie
                    res.cookie('UDT', userdata_enc, config.cookie_options);
                    
                    // //check permission to access [role]_index
                    // if(permit.isRole(response.data.data[0].role) == "admin"){
                    //     console.log('');
                    // } else if (permit.isRole(response.data.data[0].role) == "user"){
                    //     console.log('');
                    // } else {
                    //     res.render('index');
                    // }
                })
                .catch(function(response){
                    res.render('index',{data:response});
                });
            } else {
                res.render('index',{data:'invalid_status'});
            }
        })
        .catch(function (error) {
            //error
            console.log(error);
        });
    }
});


module.exports = router;
