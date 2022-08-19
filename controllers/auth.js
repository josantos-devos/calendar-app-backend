const bcrypt = require('bcryptjs')
const { handleError } = require("../helpers/handle-error");
const { generateJWT } = require('../helpers/jwt');
const User = require("../models/User");

const login = async( req, res ) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'email or password are wrong'
            })
        }
    
        const validPassword = bcrypt.compareSync( password, user.password );
    
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'wrong password'
            })
        }

        const token = await generateJWT( user.id, user.name );

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        handleError(res, error);
    }
}

const register = async( req, res ) => {

    try {

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        const dbUser = await user.save();

        const token = await generateJWT( dbUser.id, dbUser.name );

        res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })
        
    } catch (error) {
        handleError(res, error);
    }
}

const renewToken = async( req, res ) => {
    
    try {

        const { uid, name } = req

        const token = await generateJWT( uid, name );

        res.json({
            ok: true,
            uid,
            name,
            token
        })
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    login,
    register,
    renewToken
}