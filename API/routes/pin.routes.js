const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator } = require('../middlewares');

const { categoryID, pinID } = require('../helpers');

const { getPin, postPin, putPin, changePinStatus, deletePin } = require('../controllers/pin.controller')

const router = Router();

router.get('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoryID),
], getPin);

router.post('/', [
    jwtValidator,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('lat', 'La latitud es obligarotia').not().isEmpty(),
    check('long', 'La longitud es obligarotia').not().isEmpty(),
    fieldsValidator
], postPin);

router.put('/:id', [
    jwtValidator,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(pinID),
    fieldsValidator
], putPin);
router.put('/:id/status', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(pinID)
], changePinStatus);

router.delete('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(pinID),
    fieldsValidator
], deletePin);

module.exports = router;