/*
    Event Routes
    /api/events/
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/is-date');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [
    validateJWT
], getEvents);

router.post('/', [
    validateJWT,
    check('title', 'title is required').notEmpty(),
    check('start', 'start date is required').custom( isDate ),
    check('end', 'end date is required').custom( isDate ),
    fieldsValidator
], createEvent);

router.put('/:id',[
    validateJWT,
    check('title', 'title is required').notEmpty(),
    check('start', 'start date is required').custom( isDate ),
    check('end', 'end date is required').custom( isDate ),
    fieldsValidator
], updateEvent);

router.delete('/:id',[
    validateJWT
], deleteEvent);

module.exports = router;