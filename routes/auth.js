/*
    Auth Routes
    /api/auth/
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, register, renewToken } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { emailExists } = require('../middlewares/email-exists');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post( '/',[
    check('email', 'email must be a correct format').isEmail(),
    check('password', 'Password length min is a 6 character').isLength({ min:6 }),
    fieldsValidator
], login );

router.post( '/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'email must be a correct format').isEmail(),
    check('password', 'Password length min is a 6 character').isLength({ min:6 }),
    fieldsValidator,
    emailExists
], register );

router.post( '/renew', validateJWT, renewToken );

module.exports = router;