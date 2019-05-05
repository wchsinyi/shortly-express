const models = require('../models');
const Promise = require('bluebird');
const cookieP = require('./cookieParser');

module.exports.createSession = (req, res, next) => {
    // check if the res already have cookies [shortlyid], otherwise create new session id 
    if (req.cookies!==undefined && req.cookies['shortlyid']!==undefined){
        console.log('the long shortly bird thing', req.cookies['shortlyid']);
        req.session = {hash:req.cookies['shortlyid']};
        // res.cookies = {'shortlyid': {value:req.session.hash}};
        next();
    } else {
        models.Sessions.create().then(
            (hash) => {
                models.Sessions.get({id:hash.insertId}).then(
                    data=>{
                        var hashStr = data.hash
                        req.session = {};
                        req.session.hash = hashStr;
                        res.cookies = {'shortlyid': {value:data.hash}};
                        // res.cookies['shortlyid'] = {};
                        // res.cookies['shortlyid'].value = data.hash;
                        next();
                    }
                );
            }
        )
    }


};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

