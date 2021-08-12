const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const userGet = async (req, res) => {

    const resPerPage = 10; // usuarios por pagina
    const { page = 1 } = req.query  // Pagina actual
    let total_pages = 1;

    // validar numero de pagina positivo
    if (parseInt(page) < 1) {
        return res.status(400).json({
            msg: 'El numero de pagina deber ser minimo 1'
        });
    }

    //consulta con paginacion
    const [total_users, users] = await Promise.all([
        User.countDocuments(),
        User.find()
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
    ]);

    //resto de informacion
    let users_this_page = users.length;

    if (total_users % resPerPage === 0) {
        total_pages = total_users / resPerPage;
    } else {
        total_pages = Math.trunc(total_users / resPerPage) + 1;
    }

    if (parseInt(page) > total_pages) {
        return res.status(400).json({
            msg: `La pagina ${page} no existe, actualmente solo tenemos ${total_pages} paginas de usuarios`
        })
    }

    res.json({
        page,
        total_pages,
        users_this_page,
        total_users,
        users
    });
}

const getYourData = async (req, res) => {

    const { id } = req.params;
    const userAuthID = req.user_auth._id;

    if (id != userAuthID) {
        res.status(401).json({
            msg: "unicamente puedes obtener los datos de tu usuario"
        })
    } else {

        const user = await User.findById(id);

        res.json({
            user
        });
    }

}

const userPut = async (req, res) => {

    const { id } = req.params;
    const { _id, email, role, ...others } = req.body;


    if (others.password) {
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(others.password, salt);
    }

    const user = await User.findByIdAndUpdate(id, others, { new: true });

    res.json(user);
}

const userPost = async (req, res) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    // encryptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    try {
        await user.save();
    } catch (err) {
        res.status(400).json({
            err,
            msg: 'No se pudo crear el usuario'
        })
    }
    res.json({
        msg: 'Usuario creado con exito'
    })
}

const userDelete = async (req, res) => {
    const { id } = req.params;
    const userAuthID = req.user_auth._id;

    if (id != userAuthID) {

        res.status(401).json({
            msg: "Unicamente puedes eliminar tu cuenta"
        })

    } else {

        await User.findByIdAndUpdate(id, { status: false });

        res.json({
            msg: 'Usuario eliminado con exito'
        });

    }
}

const userBann = async (req, res) => {

    const { id } = req.params;

    const userToBann = await User.findById(id);

    if (userToBann.role != "ADMIN_ROLE") {

        await User.findByIdAndUpdate(id, { status: false });

        res.json({
            msg: 'Usuario Baneado con exito'
        });
    } else {
        res.status(401).json({
            msg: 'No puedes banear a otro administrador'
        })
    }

}

const userUnBann = async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndUpdate(id, { status: true });

    res.json({
        msg: 'Usuario Desbaneado con exito'
    });

}

module.exports = { userGet, getYourData, userPut, userPost, userDelete, userBann, userUnBann }