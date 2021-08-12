const User = require('../models/user.model');
const Category = require('../models/category.model');
const Pin = require('../models/pin.model');

const validRole = async (role = '') => {

    const validRoles = ['USER_ROLE', 'ADMIN_ROLE'];
    const roleExist = validRoles.includes(role);
    if (!roleExist) {
        throw new Error(`El rol ${role} no es valido`);
    }
}

const emailExist = async (email = '') => {

    const exist = await User.findOne({ email });
    if (exist) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const userID = async (id) => {

    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`El ID no existe`);
    }
}

const categoryID = async (id) => {

    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
        throw new Error(`El ID no existe`);
    }
}

const pinID = async (id) => {

    const pinExist = await Pin.findById(id);
    if (!pinExist) {
        throw new Error(`El ID no existe`);
    }
}

module.exports = { validRole, emailExist, userID, categoryID, pinID };