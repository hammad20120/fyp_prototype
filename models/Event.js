const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema({
    userId: String,
    sessionId:String,
    event:{
        name: String,
        productIds: [],
    }
},
{
    timestamps: true
}
)

const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel