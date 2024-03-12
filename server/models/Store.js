const { Schema, model } = require('mongoose');

const storeSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


const Store = model('Store', storeSchema);

module.exports = Store;