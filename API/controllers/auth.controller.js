const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const { generateJWT, googleVerify } = require('../helpers');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        //Verificar si el email existe
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos"
            });
        }

        //Verificar si el usuario esta activo
        if (user.status === false) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos"
            });
        }

        //Verificar el password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Email o contraseña incorrectos"
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Algo salio mal"
        });
    }


}

const googleSingIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {

            const data = {
                name,
                email,
                password: '😊',
                img,
                google: true
            }

            user = new User(data);
            await user.save();
        }

        if (!user.status) {

            return res.status(401).json({
                message: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generateJWT(user.id);

        return res.json({
            user,
            token
        });

    } catch (error) {

        return res.status(400).json({
            message: "Token de Google no es valido"
        });
    }
}

const refreshToken = async (req = request, res = response) => {

    const { user_auth } = req;

    const token = await generateJWT(user_auth.id);

    const user = await User.findById(user_auth.id);

    res.json({ token, user });
}

module.exports = { login, googleSingIn, refreshToken }