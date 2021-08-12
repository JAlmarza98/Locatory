const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, adminRole, jwtValidator } = require('../middlewares')

const { validRole, emailExist, userID } = require('../helpers')

const { userGet, getYourData, userPut, userPost, userDelete, userBann, userUnBann } = require('../controllers/user.controller');

const router = Router();

router.get('/', [
    jwtValidator,
    adminRole
], userGet);

router.get('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
], getYourData);

router.post('/', [
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(validRole),
    fieldsValidator
], userPost);

router.put('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userPut);

router.delete('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userDelete);

router.delete('/bann/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userBann);

router.delete('/unbann/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userUnBann);

module.exports = router;