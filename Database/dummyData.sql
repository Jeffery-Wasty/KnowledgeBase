INSERT INTO TOPICS
VALUES (0, 'php');
INSERT INTO TOPICS
VALUES (1, 'java');
INSERT INTO TOPICS
VALUES (2, 'sql');
INSERT INTO TOPICS
VALUES (3, 'zend');
INSERT INTO TOPICS
VALUES (4, 'nodejs');

SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM USERS), (SELECT MAX(ID) + 1 FROM USERS), 1));
INSERT INTO USERS
VALUES (@ID, 'BEN', 'pass', 'Ben', 'Smith', 'ben@coldmail.com', 
	'https://randomuser.me/api/portraits/med/men/1.jpg', 'US', '1987-05-24', 0, 'Hello! My name is sam!');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM USERS), (SELECT MAX(ID) + 1 FROM USERS), 1));
INSERT INTO USERS
VALUES (@ID, 'Thomas', 'pass', 'Thompson', 'Joe', 'thomJoe@gOgle.com', 
	'https://randomuser.me/api/portraits/med/men/3.jpg', 'Canada', '1962-11-10', 0, 'A chill Canadian living up in the north.');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM USERS), (SELECT MAX(ID) + 1 FROM USERS), 1));
INSERT INTO USERS
VALUES (@ID, 'ACCFfan', 'pass', 'Jilean', 'Jiang', 'jj1234@yoohoo.com', 
	'https://randomuser.me/api/portraits/med/women/13.jpg', 'France', '1984-01-19', 0, 'Senior developer at Nintendo for Animal Crossing : City Folk');
    

SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM DISCUSSIONS), (SELECT MAX(ID) + 1 FROM DISCUSSIONS), 0));
INSERT INTO DISCUSSIONS
VALUES (@ID, (SELECT ID FROM TOPICS WHERE TOPIC = 'java'), (SELECT ID FROM USERS WHERE USERNAME = 'BEN'), 'Java hello world', '2018-08-27',
	'I am new to java programming. I tried hello world program, but I got an error "not a statement". Whereas when I copy, paste the hello world program from the internet, my program compiled. This is the program I used. What is meant by "not a statement", please explain why I got this error and what is meant by it and what should I look for when I get this error in the future. Thanks!');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM DISCUSSIONS), (SELECT MAX(ID) + 1 FROM DISCUSSIONS), 0));
INSERT INTO DISCUSSIONS
VALUES (@ID, (SELECT ID FROM TOPICS WHERE TOPIC = 'php'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'), '“Hello, World” in PHP', '2019-01-12',
	'It\'s a "Hello, World" code snippet. I have tried to run it using XAMPP, and I am using Dreamweaver to write the code. Upon execution, the page does not display "Hello, World!". What would have went wrong?');


SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM POSTS), (SELECT MAX(ID) + 1 FROM POSTS), 0));
INSERT INTO POSTS
VALUES (@ID, (SELECT ID FROM DISCUSSIONS WHERE TITLE = 'Java hello world'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'), 
	'it\'s because you are using these weird quote characters, you have to use "hello", not “hello world”');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM POSTS), (SELECT MAX(ID) + 1 FROM POSTS), 0));
INSERT INTO POSTS
VALUES (@ID, (SELECT ID FROM DISCUSSIONS WHERE TITLE = 'Java hello world'), (SELECT ID FROM USERS WHERE USERNAME = 'Thomas'), 
	'Reason #284 not to use a word processor as an IDE.');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM POSTS), (SELECT MAX(ID) + 1 FROM POSTS), 0));
INSERT INTO POSTS
VALUES (@ID, (SELECT ID FROM DISCUSSIONS WHERE TITLE = '“Hello, World” in PHP'), (SELECT ID FROM USERS WHERE USERNAME = 'BEN'), 
	'is it called something.php? Did you check your webservers error logs?');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM POSTS), (SELECT MAX(ID) + 1 FROM POSTS), 0));
INSERT INTO POSTS
VALUES (@ID, (SELECT ID FROM DISCUSSIONS WHERE TITLE = '“Hello, World” in PHP'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'), 
	'No its .html');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM POSTS), (SELECT MAX(ID) + 1 FROM POSTS), 0));
INSERT INTO POSTS
VALUES (@ID, (SELECT ID FROM DISCUSSIONS WHERE TITLE = '“Hello, World” in PHP'), (SELECT ID FROM USERS WHERE USERNAME = 'BEN'), 
	'You are trying to execute PHP code on an HTML page. All PHP files should have the .php extension (implied from the OP\'s comments). Change your filename.\r\n\r\nPHP handlers don\'t work in .html pages for efficiency reasons. When you use .html instead of .php, you are telling the server not to embed PHP in that page, to save server resources.');
    

SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM CONVERSATIONS), (SELECT MAX(ID) + 1 FROM CONVERSATIONS), 0));
INSERT INTO CONVERSATIONS
VALUES (@ID, (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'), (SELECT ID FROM USERS WHERE USERNAME = 'BEN'), '2019-11-03', 'Interested in a nodejs job?');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM CONVERSATIONS), (SELECT MAX(ID) + 1 FROM CONVERSATIONS), 0));
INSERT INTO CONVERSATIONS
VALUES (@ID, (SELECT ID FROM USERS WHERE USERNAME = 'Thomas'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'), '2019-10-17', 'Lets go get ice cream');
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM CONVERSATIONS), (SELECT MAX(ID) + 1 FROM CONVERSATIONS), 0));
INSERT INTO CONVERSATIONS
VALUES (@ID, (SELECT ID FROM USERS WHERE USERNAME = 'Thomas'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'), '2019-10-21', 'Why does this site have multiple conversations for the same person?');

   
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM MESSAGES), (SELECT MAX(ID) + 1 FROM MESSAGES), 0));
INSERT INTO MESSAGES
VALUES (@ID, (SELECT ID FROM CONVERSATIONS WHERE SUBJECT = 'Interested in a nodejs job?'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'), '2019-11-03 16:45', 
	'Loooking for someone to do some php work for this totally jank school project that I don\t wanna do called knowledge base?');  
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM MESSAGES), (SELECT MAX(ID) + 1 FROM MESSAGES), 0));
INSERT INTO MESSAGES
VALUES (@ID, (SELECT ID FROM CONVERSATIONS WHERE SUBJECT = 'Interested in a nodejs job?'), (SELECT ID FROM USERS WHERE USERNAME = 'BEN'),  '2019-11-05 08:23', 
	'Sorry, will be busy till next year studying for OS');  
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM MESSAGES), (SELECT MAX(ID) + 1 FROM MESSAGES), 0));
INSERT INTO MESSAGES
VALUES (@ID, (SELECT ID FROM CONVERSATIONS WHERE SUBJECT = 'Interested in a nodejs job?'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'),  '2019-11-05 08:27', 
	'r.i.p my web mark then');  
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM MESSAGES), (SELECT MAX(ID) + 1 FROM MESSAGES), 0));
INSERT INTO MESSAGES
VALUES (@ID, (SELECT ID FROM CONVERSATIONS WHERE SUBJECT = 'Lets go get ice cream'), (SELECT ID FROM USERS WHERE USERNAME = 'Thomas'),  '2019-10-17 12:45', 
	'ICE ICE ICE BABY ~ from some random law lecture that plays songs during class'); 
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM MESSAGES), (SELECT MAX(ID) + 1 FROM MESSAGES), 0));
INSERT INTO MESSAGES
VALUES (@ID, (SELECT ID FROM CONVERSATIONS WHERE SUBJECT = 'Lets go get ice cream'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'),  '2019-10-17 12:45', 
	'...');   
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM MESSAGES), (SELECT MAX(ID) + 1 FROM MESSAGES), 0));
INSERT INTO MESSAGES
VALUES (@ID, (SELECT ID FROM CONVERSATIONS WHERE SUBJECT = 'Why does this site have multiple conversations for the same person?'), (SELECT ID FROM USERS WHERE USERNAME = 'Thomas'),  '2019-10-21 23:06', 
	'Like, what is this project'); 
SET @ID = (SELECT IF(EXISTS(SELECT 1 FROM MESSAGES), (SELECT MAX(ID) + 1 FROM MESSAGES), 0));
INSERT INTO MESSAGES
VALUES (@ID, (SELECT ID FROM CONVERSATIONS WHERE SUBJECT = 'Why does this site have multiple conversations for the same person?'), (SELECT ID FROM USERS WHERE USERNAME = 'ACCFfan'),  '2019-11-21 09:35', 
	'LOLOLOLOLOLOLOLOLOLOLOLOLOL'); 
    
    
    
    
    
    
    