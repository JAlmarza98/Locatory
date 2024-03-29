const ObjectId = require('mongoose').Types.ObjectId;

const Category = require('../models/category.model');
const User = require('../models/user.model');

const getCategory = async (req, res) => {
    const uid = req.user_auth._id;

    const resPerPage = 14;
    const { page = 1 } = req.query
    let total_pages = 1;

    // validar numero de pagina positivo
    if (parseInt(page) < 1) {
        return res.status(400).json({
            msg: 'El numero de pagina deber ser minimo 1'
        });
    }

    //consulta con paginacion
    const [total_categories, categories] = await Promise.all([
        Category.countDocuments({ user: new ObjectId(uid), status: true }),
        Category.find({ user: new ObjectId(uid), status: true })
            .populate('user', 'name', User)
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
    ]);

    //resto de informacion
    let categories_this_page = categories.length;

    if (total_categories % resPerPage === 0) {
        total_pages = total_categories / resPerPage;
    } else {
        total_pages = Math.trunc(total_categories / resPerPage) + 1;
    }

    if (parseInt(page) > total_pages) {
        return res.json({
            msg: `La pagina ${page} no existe, actualmente solo tenemos ${total_pages} paginas de usuarios`
        })
    }

    res.json({
        page,
        total_pages,
        categories_this_page,
        total_categories,
        categories
    })

}

const getOneCategory = async (req, res)=> {
    const { id } = req.params;

    const category = await Category.findById(id);

    res.json( category );
}

const postCategory = async (req, res) => {

    const resPerPage = 14;
    const uid = req.user_auth._id;
    const category = new Category({ user: uid, ...req.body });

    await category.save()

    const [total_categories, categories] = await Promise.all([
        Category.countDocuments({ user: new ObjectId(uid), status: true }),
        Category.find({ user: new ObjectId(uid), status: true })
            .populate('user', 'name', User)
            .limit(resPerPage)
    ]);

    let categories_this_page = categories.length;

    if (total_categories % resPerPage === 0) {
        total_pages = total_categories / resPerPage;
    } else {
        total_pages = Math.trunc(total_categories / resPerPage) + 1;
    }

    res.json({
        page: 1,
        total_pages,
        categories_this_page,
        total_categories,
        categories
    })

}

const putCategory = async (req, res) => {

    const { id } = req.params;
    const { _id, status, user, ...others } = req.body;

    const category = await Category.findByIdAndUpdate(id, others, { new: true });

    res.json({
        msg: 'Cambios realizados con exito',
        category
    });
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const uid = req.user_auth._id;

    const resPerPage = 14;
    const page = 1;
    let total_pages = 1;

    await Category.findByIdAndUpdate(id, { status: false });

    const [total_categories, categories] = await Promise.all([
        Category.countDocuments({ user: new ObjectId(uid), status: true }),
        Category.find({ user: new ObjectId(uid), status: true })
            .populate('user', 'name', User)
            .limit(resPerPage)
    ]);

    let categories_this_page = categories.length;

    if (total_categories % resPerPage === 0) {
        total_pages = total_categories / resPerPage;
    } else {
        total_pages = Math.trunc(total_categories / resPerPage) + 1;
    }

    res.json({
        page: 1,
        total_pages,
        categories_this_page,
        total_categories,
        categories
    })
}


module.exports = { getCategory, getOneCategory, postCategory, putCategory, deleteCategory }