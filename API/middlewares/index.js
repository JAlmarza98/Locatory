const fieldsValidator = require('../middlewares/fields-validator');
const roleValidator = require('../middlewares/role-validator');
const jwtValidator = require('../middlewares/jwt-validator')

module.exports = {
    ...fieldsValidator,
    ...roleValidator,
    ...jwtValidator
}