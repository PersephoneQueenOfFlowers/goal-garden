goal garden root directory README

Git workflow notes
/**********()**********/
to begin work on a feature branch, from the 'master' branch 
* git checkout master
* git pull (to make sure master has latest content when you create the feature branch)
* git checkout -b <initials-da-mo-pageName-featureName> 
example git checkout -b <ss-2-21-home-goal-list>
* git add . 
* git commit -m 'built the whole thing and test it, too'
* git push
* when you are confident you have a feature done, create a pull request and notify a team member you're ready for peer-review. 
* they'll check out the branch locally, look at it, run it, make sure that the pages and the work in the commit match what the feature branch says they are doing. 

Peer-reviewer, you may want to have some conversation with the other dev if you have some questions, about what they did. Then merge the code into master. Remember, we are branching off <master>.