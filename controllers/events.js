const { handleError } = require("../helpers/handle-error");
const Event = require("../models/Event");

const getEvents = async( req, res ) => {
    
    try {

        const events = await Event.find().populate('user', 'name');
        
        res.status(200).json({
            ok: true,
            events
        })
        
    } catch (error) {
        handleError(res, error);
    }
}

const createEvent = async( req, res ) => {
    
    const event = new Event(req.body)

    try {

        event.user = req.uid;

        const dbEvent = await event.save(); 
        
        res.status(201).json({
            ok: true,
            msg: dbEvent
        })
        
    } catch (error) {
        handleError(res, error);
    }
}

const updateEvent = async( req, res ) => {

    const id = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById(id);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: `event don't exists with this id`
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: `this user don't have privilegies for update this event`
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const dbEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });
        
        res.status(200).json({
            ok: true,
            event: dbEvent
        })
        
    } catch (error) {
        handleError(res, error);
    }
}

const deleteEvent = async( req, res ) => {
    const id = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById(id);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: `event don't exists with this id`
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: `this user don't have privilegies for delete this event`
            })
        }

        await Event.findByIdAndDelete(id)
        
        res.status(200).json({ ok: true })
        
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}