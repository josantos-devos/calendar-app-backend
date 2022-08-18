const jwt = require('jsonwebtoken')

const validateJWT = ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: `token don't send`
        })
    }

    try {
        
        const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: `token invalid`
        })
    }

    next()
}

module.exports = {
    validateJWT
}