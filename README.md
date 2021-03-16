### **Live Link**:
<a href="https://goalgarden.herokuapp.com/#/" target="_blank"><img width="375px" style="border:2px inset #fcfeff;border-radius:50%; max-width:100%" src="frontend/public/gg-logo-inset.png" /></a>

## **Overview**:
Goal Garden is a curated space for personal goal accountability and tracking. The application provides interactive spaces for goal progress visualization and journaling and technical opportunities for accountability.


## **Technologies used:**
 
**Database**: **MongoDB** (document-based NoSQL database).

**Backend**: **Express** (web application framework for Node.), **Node.js**: (JavaScript runtime environment), **Mongoose** (object data modeling (ODM) library for MongoDB and Node.js).

**Frontend**: **React**, **Redux**, **Axios** (promise-based HTTP client to make HTTP requests).

![app architecture diagram](https://github.com/TheSethness/goal-garden/blob/master/frontend/public/css/images/diagram.png "diagram")

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
  

# Code Snippet Feature

## Updating the Flower to Represent The State of The Goal
&nbsp;&nbsp;&nbsp;&nbsp;The goal flower visually connects the backend of the application to the front end. When a user makes a goal the goal is represented as a flower. This goal starts off as a seedling and as users successfully meet their check in and journal about it their goal flower will grow representing the growth the user has made in their goal. However if a user misses a check in for their goal the goal flower will either shrink and revert back to a seedling if it has not reached full bloom or if it had previously reached full bloom it will start to wilt and wither and will keep doing so until the user successfully checks in again.
	
&nbsp;&nbsp;&nbsp;&nbsp;A challenge for this was deciding how to add in the flower images and connect them to the back end. We resolved this issue by giving the goal model a `growthNumber` property that represents what stage the flower should be in. When a successful or unsuccessful journal is written for a goal it updates the growth number accordingly. This `growthNumber` property of the goal is then referenced during the rendering of the goal show component and depending on the `growthNumber` it will apply different css properties on the flower image to show the correct state of the flower.  The flower image is actually one image sprite with all stages of the flower on it. The `growthNumber` changes the background position of the flower sprite so that the correct flower is shown.

```css
#growth0{
    background-position-x: 10px;
    width: 140px;
}

#growth1{
    background-position-x: -150px;
    width: 147px;
}

#growth2{
    background-position-x: -320px;
    width: 147px;
}

#growth3{
    background-position-x: -477px;
    width: 160px;
}

#growth4{
    background-position-x: -662px;
    // padding-right: 45px;
    width: 178px;
}

#growth5{
    background-position-x: -833px;
    width: 147px;
}

#growth6{
    background-position-x: -993px;
    width: 147px;
}
```

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

