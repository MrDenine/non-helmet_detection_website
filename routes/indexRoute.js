const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const validation_tools = require('../utils/validation_tools');
const { validateCookie } = require('../utils/validation_tools');

router.use(cookieParser());

router.get('/',validateCookie,function(req,res,next){

    res.render('index',{data:'index'});

});

module.exports = router;