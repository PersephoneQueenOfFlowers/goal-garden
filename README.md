goal garden root directory README



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

/**********( Styles )**********/

New SCSS preprocessor folders and commands. 
When we write CSS, we write it into the files under the src/styles directory and write it as SCSS code. NOTE: The files will still accept CSS, but what a waste. Better to write SCSS into the src/styles directory. 

Run:
  cd frontend
  [npm install node-sass --save] 
  
Then, with terminal inside frontend dir: 
Run:
  [npm run build-css] - to build public/CSS file from src/styles/App.scss and scss imports
  [npm run watch-css] - to watch for changes in the src/styles directory during development and rebuild. 

  


