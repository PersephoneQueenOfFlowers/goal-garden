const Validator = require('validator');
const validText = require('./valid-text');
const validFutureDate = require('./valid-future-date');
module.exports = function validateCreateGoal(data) {
    let errors = {};
    
    // data is req.body

    goalProps = ["body", "title", "expirationDate", "avatar", "checkInterval", "active", "count", "streak"
    ];

    for (prop of goalProps) {
      data[prop] = validText(data[prop]) ? data[prop] : "";
    }


    // Validator Methods -- https://www.npmjs.com/package/validator

    // 

    // body validations -- not empty

    // title validations -- not empty, unique to user 
    //       Doesn't make sense to have two goals of the same name

    // if active --- 
    // expirationDate validations -- not empty, actual date,
    //       Must be after today's date and must be completable
    //       Since we are making the checkins to be at most daily
    //       Can calculate based on current count 

    // avatar --- must be an integer that references a valid avatar
    //        --- probably want to check for inclusion?


    // 

    if(Validator.isEmpty(data.body)) {
        errors.body = 'Body field is rquired';
    }

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required'
    }
    if (Validator.isEmpty(data.expirationDate)) {
      errors.expirationDate = "Expiration Date field is required";
    }
    if (!Validator.isISO8601(data.expirationDate)) {
        errors.expirationDate = "Expiration Date must be a valid date";
    } else if (!validFutureDate(data.expirationDate)){
        errors.expirationDate = "Expiration Date must be at least 24 hours from now";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}