const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    mode: {
        type: String,
        required: true,
        enum: ['BUY', 'SELL'],
        uppercase: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

// Add indexes for better query performance
OrdersSchema.index({ userId: 1, createdAt: -1 });
OrdersSchema.index({ userId: 1 });

module.exports = { OrdersSchema };