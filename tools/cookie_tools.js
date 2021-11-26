
var cookie_tools = {
    validateAccount : function (){

    },
    createCookie : function(String){
        option = {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true, // cookie must be sent over https / ssl
            path:"/"
        }
        res.cookie('UDT', userdata_enc, option);
        //res.cookie('UID', userdata_enc, option);
        res.redirect('/');
        //res.render('index',{data: response.data});
    },
    dropCookie : function(){
        
    }
}

module.exports = cookie_tools;