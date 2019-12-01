const db = require('../Database/databaseConnection.js');

exports.searchWithString = (search_string) => {
    return(db.query(`CALL GET_DISCUSSIONS_WITH_SEARCH(NULL, '${search_string}')`))
}

exports.searchWithTopic = (topic) => {
    return(db.query(`CALL GET_DISCUSSIONS_WITH_SEARCH(${topic}, '')`))
}