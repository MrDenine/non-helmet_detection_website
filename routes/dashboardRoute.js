const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('../config');
const encrypt_decrypt_tools = require('../utils/encrypt_decrypt_tools');
const {validateCookieExist ,validateAdminRoute,validateDpmRoute,validateMember,accessCookieExist} = require('../middleware/validation_user');
const {getUserRole,getUserData} = require('../utils/initial_data_tools');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

router.get('/',validateCookieExist,function(req,res,next){
    res.render('dashboard' ,{title : 'dashboard', udt : getUserData(req) , role : getUserRole(req)});
});

router.post('/PostStatistic',function(req,res){

})

module.exports = router;