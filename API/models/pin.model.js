const { Schema, model } = require('mongoose');

const PinSchema = Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    lat: {
        type: String,
        default: true
    },
    long: {
        type: String,
        default: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    }
});

PinSchema.methods.toJSON = function () {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

}

module.exports = model('Pin', PinSchema);