goal garden root directory README


![alt text](https://github.com/TheSethness/goal-garden/blob/master/frontend/public/css/images/diagram.png "diagram")

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
* In it, we can set goals for ourselves and set intervals for check-ins. A check-in occurs when we write a journal into our goal that speaks to whether or not the goal has been reached definitively. 
*   whether progress has been made. 
*   have we rewarded ourselves for progress. 
*   what kind of challenges or roadblocks we hit along the way. 
*   when we make a journal, we receive a motivational message. 
* How to use it. 
  
1 or 2 cool features that we think are interesting. 

