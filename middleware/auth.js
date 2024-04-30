// requirejsonwebtoken
const jwt = require('jsonwebtoken');

// require env variable from ./config.js
const {SECRET_KEY} = require('../utilities/config');

// create auth object
const auth = {
    isAuthenticated: async (req, res, next) => {
        try{
            // get token from cookie
            const token = req.cookies.token;

            if(!token) {
                return res.status(401).json({message: 'Unauthorized'});
            }

            // verify token
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if(err) {
                    return res.status(401).json({message: 'Invalid Token'});
                }
                req.user = decoded;
            })
            next();

        }catch(err){
            return res.status(500).json({message: err.message});
        }
    }
}

// export auth
module.exports = auth;