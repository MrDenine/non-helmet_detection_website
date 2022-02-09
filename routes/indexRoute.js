const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');

router.get('/',function(req,res,next){
    res.render('index',{data:'Test'});
});

module.exports = router;