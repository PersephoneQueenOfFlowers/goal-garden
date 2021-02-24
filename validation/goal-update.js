const Validator = require('validator');
const validFutureDate = require('./valid-future-date');
const validText = require('./valid-text');
module.exports = (data) => {
    let errors = {};
    // data is req.body

    // might be useful in future to separate data keys

    // textGoalProps = ["body", "title"];
    // dateGoalProps = ["expirationDate"];
    // intGoalProps = ["avatar, checkInterval, count, streak"];
    // boolGoalProps = ["active"];
    

    // for (prop of textGoalProps) {
    //   if(!validText(data[prop])) data[prop] = "";
    // }

    // for (prop of dateGoalProps) {
    //   if(!validText(data[prop])) data[prop] = "";
    // }

    goalProps = ["body", "title", "expirationDate"
    ///, "avatar", "checkInterval", "active", "count", "streak"
    ];

    presentProps = {}

    for (prop of goalProps) {
        if(data[prop] === undefined){
            presentProps[prop] = false;
        } else{
            if(!validText(data[prop])) data[prop] = "";
            presentProps[prop] = true;
        }
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
    if (presentProps["body"]){
        if(Validator.isEmpty(data.body)) {
            errors.body = 'Body field is rquired';
        }
    }

    if (presentProps["title"]){
        if(Validator.isEmpty(data.title)) {
            errors.title = 'Title field is required';
        }
    }

    if (presentProps["expirationDate"]){
        if (Validator.isEmpty(data.expirationDate)) {
          errors.expirationDate = "Expiration Date field is required";
        }
        if (!Validator.isISO8601(data.expirationDate)) {
            errors.expirationDate = "Expiration Date must be a valid date";
        } else if (!validFutureDate(data.expirationDate)){
            errors.expirationDate = "Expiration Date must be at least 24 hours from now";
        }
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}