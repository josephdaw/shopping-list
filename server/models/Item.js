const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        location: [{
            storeId: {
              type: Schema.Types.ObjectId,
              ref: 'Store'
            },
            locationDetails: {
                type: String,
                required: true,
            },
          }],
    },
    {
        timestamps: true,
    }
);


const Item = model('Item', itemSchema);

module.exports = Item;