goal garden root directory README


## **Technologies used:**
 
**Database**: **MongoDB** (document-based NoSQL database).

**Backend**: **Express** (web application framework for Node.), **Node.js**: (JavaScript runtime environment), **Mongoose** (object data modeling (ODM) library for MongoDB and Node.js).

**Frontend**: **React**, **Redux**, **Axios** (promise-based HTTP client to make HTTP requests).

![app architecture diagram](https://github.com/TheSethness/goal-garden/blob/master/frontend/public/css/images/diagram.png "diagram")


/**********( Git workflow )**********/
to begin work on a feature branch, from the 'master' branch 
* git checkout master
* git pull (to make sure master has latest content when you create the feature branch)
* git checkout -b <initials-da-mo-pageName-featureName> 
example git checkout -b <ss-2-21-home-goal-list>
* git add . 
* git commit -m 'built the whole thing and test it, too'
* git push
* when you are confident you have a feature done, checkout master, git pull for latest upstream changes, checkout feature branch, merge in master and test. 
* add, commit, push changes upstream in feature branch, and create a pull request and notify a team member you're ready for peer-review. 
* they'll check out the branch locally, look at it, run it, make sure that the pages and the work in the commit match what the feature branch says they are doing. 


Peer-reviewer, you may want to have some conversation with the other dev if you have some questions, about what they did. Then merge the code into master. Remember, we are branching off <master>.

Refer to https://open.appacademy.io/learn/swe-in-person/mern-stack-curriculum/git-workflow with git-workflow questions.

* Goal Garden is a curated space for personal goal setting and tracking. 
* In it, we can set goals for ourselves and set intervals for check-ins. 

![goal-setting demo](/frontend/public/css/images/creating_goal_reduced.gif "creating_goal")

* A check-in occurs when we write a journal into our goal that speaks to whether or not the goal has been reached definitively. 

![journaling-creation demo](/frontend/public/css/images/creating_journal.gif "creating_journal")

Records are kept of:
*   whether progress has been made, 
*   have we rewarded ourselves for progress, 
*   what kind of challenges or roadblocks we hit along the way. 

When we make a journal, we receive a motivational message. 

![missing-checkin demo](/frontend/public/css/images/missed_checkins.gif "missing_checkin")
  
1 or 2 cool features that we think are interesting. 


# Code Snippet Feature

## Auto-generated Journals for Missed Check-ins

One way we wanted to keep users honest about sticking to their goals was by creating a feature where the site would know when the user was supposed to check-in (based on the goal's `createdAt` date and the goal's `checkInterval`).

We decided to make this a backend feature and have the script run whenever the user logged in -- going through every goal the user had and creating new journals for every missed check-in period during which the user had not created a journal.

A couple of complications we ran into were whether the user had created any journals for that goal, whether the goal was still active or not (since goals have a `expirationDate`), and how to check whether a journal had been created within a check-in period.

If a user didn't have any journals for a particular goal, we would use the goal's createdAt date as the last date for the last checkin.

If the current datetime was past the goal's expirationDate, we would still potentially need to generate missed check-ins, as it is possible that the user has been away for a while.


```js
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
```

