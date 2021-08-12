const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    color: {
        type: String,
        default: " #000000"
    },
    description: {
        type: String
    }
});

CategorySchema.methods.toJSON = function () {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

}

module.exports = model('Category', CategorySchema);