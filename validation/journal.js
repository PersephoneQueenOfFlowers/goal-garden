const { default: validator } = require('validator');
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateJournalInput(data){
    let errors = {};
    
    data.body = validText(data.body) ? data.body : '';

    if(validator.isEmpty(data.body)) {
        errors.body = 'Body field is required'
    }

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}