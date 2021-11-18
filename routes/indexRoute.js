const express = require('express');
const router = express.Router();

/* GET Default Page*/
router.get('/',function(req,res,next){
    res.render('index',{result : 'GG'});
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
            res.render('login',{result : response.data.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }
});

module.exports = router;