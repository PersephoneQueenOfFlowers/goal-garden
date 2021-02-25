//models
const Goal = require("../../models/Goal");
const Journal = require("../../models/Journal");


module.exports = (userId) => {

  Goal
    .find({ user: userId })
    .then(goals => {
      // debugger
      for (goal of goals){
        // debugger
        // Step 1 -- find latest date
    
        Journal
          .find({ goal: goal._id})
          .limit(1)
          .sort('-createdAt')
          .then(journals => {
            const journal = journals[0];
            const latestDateISO = journal ? journal.createdAt : goal.createdAt;
        
            const latestDate = new Date(latestDateISO);

            //step 2 -- creating journals from latestDate until now -- 
            debugger

          })
      }
    })

  
};
