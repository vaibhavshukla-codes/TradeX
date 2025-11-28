const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
    product: String,
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
    isLoss: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
}, {
    timestamps: true,
});

// Add indexes for better query performance
PositionsSchema.index({ userId: 1 });
PositionsSchema.index({ name: 1, userId: 1 });

module.exports = { PositionsSchema };