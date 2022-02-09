const express = require('express');
const middleware = express.Router();
const auth = require('../utils/permit_tools');
const encrypt_decrypt_tools = require('../utils/encrypt_decrypt_tools');
const cookieParser = require('cookie-parser');
const permit = require('../utils/permit_tools');

middleware.use(cookieParser()),


function isCookieExist (req, res, next){
    
}
    
function setCookieRenewal (req,res,next) {

}

function checkCookieAccess(req,res,next) {

}

module.exports = middleware ;