
CALL GET_TOPICS(NULL);
CALL GET_USER_PER_EMAIL_PASSWORD('ben@coldmail.com', 'pass');
CALL GET_PRIVATE_USER_INFO(1);
CALL GET_PUBLIC_USER_INFO(1);
CALL LIKE_USER(2, 3);
CALL LIKE_USER(1, 2);
CALL MODIFY_USER(1, NULL, NULL, NULL, NULL, NULL, NULL);
CALL CREATE_USER('littlej', 'John', ' Hoang', 'johnquochoang@gmail.com', 'https://randomuser.me/api/portraits/med/men/2.jpg', 'Canada', '1920-04-06',
    'I am just a rag tag bunch of mistakes and regrets balled together into a sexy asian form, #fuckyoujeff');
CALL GET_USER_DISCUSSIONS(1);
CALL GET_ALL_DISCUSSIONS();
CALL GET_DISCUSSIONS(1, 1);
CALL GET_DISCUSSIONS_WITH_SEARCH(NULL, 'hello');
CALL GET_POSTS_FOR_DISCUSSION(1);
CALL CREATE_DISCUSSION(1, 0, 'A ridiculously awesome title', 'A very short body');
CALL CREATE_POST(1, 1, 'A random sadhlgashdglasdjg post body');
CALL GET_USER_CONVERSATIONS(1);
CALL GET_MESSAGES_FOR_CONVERSATION(1);
CALL CREATE_CONVERSATION(1, 2, 'This is my really awesome subject', 'And here is my less awesome message');
CALL CREATE_MESSAGE(0, 2, 'I do hope this message is in the right conversation');


