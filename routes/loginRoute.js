const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('../config');
const validation_tools = require('../utils/validation_tools');
const encrypt_decrypt_tools = require('../utils/encrypt_decrypt_tools');
const cookieParser = require('cookie-parser');
const { json } = require('express');
const { data } = require('jquery');

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

router.use(cookieParser());

// router.get('/',function(req,res,next){
//     console.log('get login')
// });

router.post('/',function(req,res,next){
    var username = req.body.Username;
    var password = req.body.Password;
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
                    
                    // res.status(200).send(response.data.data[0]);
                    res.status(200).send('valid');
                    return;
                })
                .catch(function(response){
                    res.status(400).send(response);
                    return;
                });
            } else {
                res.status(200).send('invalid');
                return;
            }
        })
        .catch(function (error) {
            res.status(400).send(error);
            return;
        });
    }
});


module.exports = router;
