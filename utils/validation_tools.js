

module.exports = {
    validateCookie : function (req,res,next){
        const {cookies} = req;
        console.log('cookie exist');
        console.log(cookies);
        next();
    }
}