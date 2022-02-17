const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const validation_tools = require('../middleware/validation_user');
const { accessCookieExist } = require('../middleware/validation_user');

router.use(cookieParser());

router.get('/',accessCookieExist,function(req,res,next){

    res.render('index',{data:'index'});

});

module.exports = router;