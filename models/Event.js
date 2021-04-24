const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema({
    userID:String,
    sessionID:String,
    userEvent:{
        name:String,
        properties:Object
    }
},
{
    timestamps: true
}
)

const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel