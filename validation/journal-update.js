const Validator = require('validator');
const validText = require('./valid-text');
module.exports = (data) => {
    let errors = {};

    // journalProps = [
    //   "goal", "highlights", "body", "success",
    //   "media", "goalState", "cues", "rewards"
    // ];

    // presentProps = {}

    // for (prop of journalProps) {
    //     if(data[prop] === undefined){
    //         presentProps[prop] = false;
    //     } else{
    //         if(!validText(data[prop])) data[prop] = "";
    //         presentProps[prop] = true;
    //     }
    // }
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
    // if (presentProps["body"]){
    //     if(Validator.isEmpty(data.body)) {
    //         errors.body = 'Body field is rquired';
    //     }
    // }

    // if(Validator.isEmpty(data.body)) {
    //     errors.body = 'Body field is rquired';
    // }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}