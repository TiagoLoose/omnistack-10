const mongoose = require("mongoose");

const PointSchema = mongoose.Schema({
    type:{
        type: String,
        enum: ['Point'],
        require: 'TextTrackCueList'
    },
    coordinates:{
        type: [Number],
        require: true
    }
})

module.exports = PointSchema;