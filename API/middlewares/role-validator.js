const adminRole = (req, res, next) => {

    if (!req.user_auth) {
        return res.status(500).json({
            message: 'Se intenta verificar el rol sin validar el token primero'
        });
    }

    if (req.user_auth.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: 'Unicamente los usuarios administradores pueden realizar esta accion'
        });
    }

    next();
}

const checkRole = (...roles) => {

    return (req, res, next) => {

        if (!req.user_auth) {
            return res.status(500).json({
                message: 'Se intenta verificar el rol sin validar el token primero'
            });
        }

        if (!roles.includes(req.user_auth.role)) {
            return res.status(401).json({
                message: 'No tiene permisos para realizar esta accion'
            });
        }

        next();
    }
}

module.exports = { adminRole, checkRole }