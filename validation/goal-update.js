const Validator = require('validator');
const validText = require('./valid-text');
module.exports = function validateCreateGoal(data) {
    let errors = {};


    // user: req.user.id,
    // body: req.body.body,
    // title: req.body.title,
    // expirationDate: req.body.expirationDate,
    // avatar: req.body.avatar,
    // checkInterval: req.body.checkInterval,
    // active: req.body.active,
    // count: req.body.count,
    // streak: req.body.streak


    // data.email = validText(data.email) ? data.email : '';
    // data.password = validText(data.password) ? data.password : '';


    
    // data is req.body

    goalProps = ["body", "title", 
    //"expirationDate", "avatar", "checkInterval", "active", "count", "streak"
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

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}