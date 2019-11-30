const db = require('../Database/databaseConnection');

exports.get_user_conversations = (user_id) => {
    const sql =
        `
            CALL GET_USER_CONVERSATIONS(${user_id})
        `
    return db.execute(sql);
}

exports.get_messages_for_conversations = (conversation_id) => {
    const sql =
        ` 
            CALL GET_MESSAGES_FOR_CONVERSATION(${conversation_id})
        `
    return db.execute(sql);
}

exports.create_conversations = (conversation) => {
    const sql =
        `
            CALL CREATE_CONVERSATION(
                ${conversation.sender_id},
                ${conversation.receiver_id},
                "${conversation.subject}",
                "${conversation.message}"
                )
        `
    return db.execute(sql);
}

exports.create_message = (message) => {
    const sql =
        `
            CALL CREATE_MESSAGE(
                ${message.conversation_id},
                ${message.sender_id},
                "${message.body}"
                )
        `
    return db.execute(sql);
}

exports.get_conversation_info = (conversation_id) => {
    const sql =
        `
        SELECT USER_ID_1, USER_ID_2, c.READ FROM conversations c WHERE ID = ${conversation_id};
        `
    return db.execute(sql);
}

exports.set_read = (conversation_id, read) => {
    const sql =
        `
        UPDATE conversations c SET c.READ = '${read}' WHERE (\`ID\` = ${conversation_id});
        `
    return db.execute(sql);
}
