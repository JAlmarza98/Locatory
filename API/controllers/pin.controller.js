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
    const categoryID = req.body.category;

    await pin.save();
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

const putPin = async (req, res) => {

    const { id } = req.params;
    const { _id, status, category, lat, long, ...others } = req.body;

    await Pin.findByIdAndUpdate(id, others, { new: true });

    const pin = await Pin.findById(id);

    res.json(pin);
}

const deletePin = async (req, res) => {
    const { id } = req.params;
    const pinData = await Pin.findById(id)

    const categoryId = pinData.category;

    await Pin.findByIdAndUpdate(id, { status: false }, { new: true });
    const category = await Category.findById(categoryId)

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

module.exports = { getPin, postPin, putPin, deletePin }