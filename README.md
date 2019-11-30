# COMP 4711 Term Project – Fall 2019

## Knowledge Base
In today’s world, knowledge is very easily accessible. We can simply google something and find tons of information about it. But the problem today is information overload. Since there is so much to choose from, finding a reliable source can be somewhat of a challenge. We want to solve, this problem.
Our task is to create a social media for knowledge sharing, Knowledge Base (KB). Individuals can signup and begin sharing their knowledge about certain topics. Individuals can post questions, answer questions, message other individuals, like other profiles.

For new users once the individual clicks ‘signup’, a new screen is displayed where the user is prompted to enter a few more details

After a user completes registration, they are taken to their homepage, which may look like the one shown below after user has made some posts, received message and likes

The number of replies is clickable (toggles, show and hide) and will show all the replies made for the post and gives the option to comment on the post (see page 5)

The latest 5 discussions will be shown on the homepage, also there will the ability to paginate (Next) (there will also be a Previous button to navigate back)
The Posts and Messages are also clickable links (see page 9,10)
There will be 5 topics the user can post in: php, nodejs, java, sql, zend

### Breakdown
If the user types in the search and hits enter, only those posts where subject has occurrences of typed characters show

If I click on the number of replies, It will show all the replies for the post and present a comment box to add a reply. Then user can then add his reply to the post and consequently, the count of replies will update for the post

The user can also search by topic and only those matching the specified topic will show up

If the profile picture of any user is clicked upon, it will render the profile for the user

After the message details are filled and submitted, the user is returned back to the messaged users profile. The user should also receive an email with the contents of the message.

Clicking on the logo will take me to my home page. Clicking on posts shows all my posts, till date. In Edit Profile view, the user can edit his name, imageURL, country, date of birth and about.

Clicking on messages shows a list of all conversations

## Deliverables
A rubrix will be set up
* Nov 14 (11:59 PM)
  * Initial Report
    * 10%
    * See ‘Intial-report.pdf’
* Dec 4/5 (Based on your Lab)
  * Demo and hand in code base (Link to repo)
    * 20%
  * Final Report
    * 5%
    * See ‘Final-report.pdf’

The application <b>needs</b> to follow MVC architecture, use of any other frameworks (React , Angular , Java etc) not taught in lectures is <b>not allowed</b>

The application needs to use node/express as the backend, driven with views written in handlebars, ejs .. Need to use a SQL database (MySQL , PostGres, MariaDB)

Need to follow best practices: https://github.com/airbnb/javascript

#### Assets
* https://randomuser.me/
* https://ibb.co/2NLf22M
#### Other
* Bitbucket free for upto 5 users
