const ObjectId = require('mongoose').Types.ObjectId;

const Pin = require('../models/pin.model');
const Category = require('../models/category.model');

const getPin = async (req, res) => {

    const categoryID = req.params.id;

    const category = await Category.findById(categoryID)

    if (!category.status) {
        return res.status(400).json({
            msg: "La categoria selecionada no existe"
        })
    }

    const [total_pins, pins] = await Promise.all([
        Pin.countDocuments({ category: new ObjectId(category.id), status: true }),
        Pin.find({ status: true, category: new ObjectId(category.id) })
            .populate('category', 'name', Category)
    ]);

    res.json({
        total_pins,
        pins
    })
}

const postPin = async (req, res) => {

    const pin = new Pin({ ...req.body });

    await pin.save()

    res.json({
        msg: 'Pin creado con exito'
    })
}

const putPin = async (req, res) => {

    const { id } = req.params;
    const { _id, status, category, lat, long, ...others } = req.body;

    const pin = await Pin.findByIdAndUpdate(id, others, { new: true });

    res.json({
        msg: 'Cambios realizados con exito',
        pin
    });
}

const deletePin = async (req, res) => {

    const { id } = req.params;

    await Pin.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
        msg: 'Pin eliminado con exito'
    });
}

module.exports = { getPin, postPin, putPin, deletePin }