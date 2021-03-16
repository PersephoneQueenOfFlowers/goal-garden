//models
const Goal = require("../../models/Goal");
const Journal = require("../../models/Journal");

//this problem help solves asynchronicity issue of finding the journals for the goal
//and then using the checkInterval and expirationDate for that same goal

// asynchronicity + for loop of goals causes the goal variable to be set to other goals
// before the journals are returned (because the journal retrieval is an async call 
// putting it on the JS Callback Queue before getting evaluated). so this function creates
// a separate context in which that particular goal is saved.

// Mongoose allows find one with sort: 
// https://stackoverflow.com/questions/13443069/mongoose-findone-with-sorting

const generateCheckIns = function(goal) {
  Journal
      .find({ goal: goal._id})
      .limit(1)
      .sort('-createdAt')
      .then(journals => {
        const journal = journals[0];
        
        // maybe just use journal since I made it so when you create a new goal a first journal is created?
        // const latestDateISO = journal.createdAt;
        const latestDateISO = journal ? journal.createdAt : goal.createdAt;
    
        const lastCheckin = new Date(latestDateISO);

        const goalCreationDate = new Date(goal.createdAt);
        const millisecondsPerDay = 1000*60*60*24;
        const millisecondsPerCheckin = millisecondsPerDay * goal.checkInterval;
        
        const latestRelevantDate = Date.now() < goal.expirationDate ? Date.now() : goal.expirationDate
        const daysSinceGoalCreation = Math.floor((latestRelevantDate - goalCreationDate)/millisecondsPerDay);
        const dueDatesSinceGoalCreation = Math.floor(daysSinceGoalCreation/goal.checkInterval);
        
        
        const lastDueDate = new Date(goalCreationDate);
        lastDueDate.setDate(lastDueDate.getDate() + dueDatesSinceGoalCreation * goal.checkInterval);
        let dueDate = new Date(lastDueDate);
        
        const missingDueDates = [];
        
        while (dueDate - lastCheckin >= millisecondsPerCheckin){
          missingDueDates.push(dueDate.toISOString());
          dueDate.setDate(dueDate.getDate() - goal.checkInterval);
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
            .then(journal => {
              if (journal.createdAt.getTime() === lastDueDate.getTime()){
                goal.growthNumber = journal.goalState;
                goal.save()
                .then();
              }
            })
            .catch(err => console.log(err));
        }
      });
}


module.exports = (userId) => {
  Goal
    .find({ user: userId })
    .then(goals => {
      for (goal of goals){
        generateCheckIns(goal);
      }
    }).then(); 
};


