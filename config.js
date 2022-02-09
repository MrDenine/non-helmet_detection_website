const config = {};

config.port = 8000; //website port
config.servurl = 'http://localhost:3000'; //service url/port
config.cookie_options = {
    maxAge: 86400 * 1000, // 24 hours
    httpOnly: true, // http only, prevents JavaScript cookie access
    secure: true, // cookie must be sent over https / ssl
    path:"/"
}

module.exports = config;