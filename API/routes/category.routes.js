const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator } = require('../middlewares');

const { categoryID } = require('../helpers');

const { getCategory, getOneCategory, postCategory, putCategory, deleteCategory } = require('../controllers/category.controller')

const router = Router();

router.get('/', [
    jwtValidator
], getCategory);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
],  getOneCategory);

router.post('/', [
    jwtValidator,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    fieldsValidator
], postCategory);

router.put('/:id', [
    jwtValidator,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
    fieldsValidator
], putCategory);

router.delete('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
    fieldsValidator
], deleteCategory);

module.exports = router;