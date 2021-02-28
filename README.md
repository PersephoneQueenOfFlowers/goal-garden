goal garden root directory README


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

### Goal FLower
&nbsp;&nbsp;&nbsp;&nbsp;The goal flower visually connects the backend of the application to the front end. When a user makes a goal the goal is represented as a flower. This goal starts off as a seedling and as users successfully meet their check in and journal about it their goal flower will grow representing the growth the user has made in their goal. However if a user misses a check in for their goal the goal flower will either shrink and revert back to a seedling if it has not reached full bloom or if it had previously reached full bloom it will start to wilt and wither and will keep doing so until the user successfully checks in again.
	
&nbsp;&nbsp;&nbsp;&nbsp;A challenge for this was deciding how to add in the flower images and connect them to  the back end. We resolved this issue by giving the goal model a growthNumber property that represents what stage the flower should be in. When a successful or unsuccessful journal is written for a goal it updates the growth number accordingly. This growth number property of the goal is then referenced during the rendering of the goal show component and depending on the growthNumber it will apply different css properties on the flower image to show the correct state of the flower.  The flower image is actually one image sprite with all stages of the flower on it. The growthNumber changes the background position of the flower sprite so that the correct flower is shown.

