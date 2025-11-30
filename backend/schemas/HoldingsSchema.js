const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        min: 0,
    },
    avg: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    net: String,
    day: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

// Add indexes for better query performance
HoldingsSchema.index({ userId: 1 });
HoldingsSchema.index({ name: 1, userId: 1 });

module.exports = { HoldingsSchema };