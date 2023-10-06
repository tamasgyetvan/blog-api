const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
    title: {
        required: true,
        maxLength: 50,
    },

    text: {
        required: true,
    },
    
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
})

PostSchema.virtual("timestamp_formatted").get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
})