const User = require("../models/User")

const emailExists = async( req, res, next ) => {

    const { email } = req.body;
    const user = await User.findOne({ email })

    if( user ) {
        
        res.status(400).json({
            ok: false,
            msg: 'email already used'
        })

    }

    next();
}

module.exports = {
    emailExists
}