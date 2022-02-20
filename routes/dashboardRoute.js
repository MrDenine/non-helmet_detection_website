const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const {validateCookieExist, validateAdminRoute} = require('../middleware/validation_user');
const {getUserData} = require('../utils/initial_data_tools');

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

router.use(cookieParser());
router.use(validateCookieExist);

router.get('/',function(req,res,next){
    res.render('dashboard',{role:getUserData(req).role});
});

module.exports = router;