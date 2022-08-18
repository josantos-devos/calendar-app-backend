const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) => {

    const payload = { uid, name }

    return new Promise(( resolve, reject ) => {
        
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if( err ) {
                console.log(err);
                reject(`can't be generate jwt`)
            }

            resolve( token );
        });
    })
}

module.exports = {
    generateJWT
}