//models
const Goal = require("../../models/Goal");
const Journal = require("../../models/Journal");


module.exports = (userId, res) => {

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
        
            const lastCheckin = new Date(latestDateISO);

            //step 2 -- find number of journals need to create
            const goalCreationDate = new Date(goal.createdAt);
            const millisecondsPerDay = 1000*60*60*24;
            const millisecondsPerCheckin = millisecondsPerDay * goal.checkInterval;
            
            const daysSinceGoalCreation = Math.floor((Date.now() - goalCreationDate)/millisecondsPerDay);
            const dueDatesSinceGoalCreation = Math.floor(daysSinceGoalCreation/goal.checkInterval);
            
            
            const lastDueDate = new Date(goalCreationDate);
            lastDueDate.setDate(lastDueDate.getDate() + dueDatesSinceGoalCreation * goal.checkInterval);

            
            const missingDueDates = [];
            
            while (lastDueDate - lastCheckin > millisecondsPerCheckin){
              missingDueDates.push(lastDueDate.toISOString());
              lastDueDate.setDate(lastDueDate.getDate() - goal.checkInterval);
            }

            let newJournal;
            // step 3 -- creating journals from latestDate until now -- 
            for (missedDate of missingDueDates){
              newJournal = new Journal({
                goal: goal.id,
                body: "Missed check-in :(",
                createdAt: missedDate
              })
              newJournal
                .save()
                .then()
                .catch(err => console.log(err));
            }
          })
      }
    }).then(
      res.json({ msg: "Finished" })
    )

  
};
