//models
const Goal = require("../../models/Goal");
const Journal = require("../../models/Journal");


module.exports = (userId) => {

  Goal
    .find({ user: userId })
    .then(goals => {
      for (goal of goals){

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

            // step 3 -- creating journals from latestDate until now -- 
            // go through the array backwards -> that way able to keep
            // goal state updated
            //  +1 on goalState if (success and goalstate between 0 and 2 incl) or (failure and goalState between 3 and 5 incl)
            //  -1 on goalState if (failure and goalState between 1 and 2 incl) or (success and goalState between 4 and 6 incl)
            
            let newJournal;
            let goalState = journal ? journal.goalState : 0;
            const goalStateUpdate = {0:0, 1:0, 2:1, 3:4, 4:5, 5:6, 6:6};

            for (missedDate of missingDueDates.reverse()) {
              
              goalState = goalStateUpdate[goalState];

              newJournal = new Journal({
                goal: goal.id,
                body: "Missed check-in :(",
                createdAt: missedDate,
                goalState: goalState
              });

              newJournal
                .save()
                .then()
                .catch(err => console.log(err));
            }
          })
      }
    }).then(
      // res.json({ msg: "Finished" })
    )

  
};
