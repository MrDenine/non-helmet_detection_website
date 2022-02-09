const crypto = require('crypto');
const secret = "CPEPROJECT";

module.exports = {
    encrypt : function (string){
        var key = crypto.createCipher('aes-128-cbc', secret);
        var encryptstr = key.update(string, 'utf8', 'hex');
        encryptstr += key.final('hex');
        return encryptstr;
    },
    decrypt : function (string){
        var key = crypto.createDecipher('aes-128-cbc', secret);
        var decryptstr = key.update(string, 'hex', 'utf8')
        return decryptstr;
    }
}
