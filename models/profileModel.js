const profileDb = require('../Database/databaseConnection');

exports.createUser = (user) => {
    const sql =
        `
            CALL CREATE_USER(
                '${user.password}',
                '${user.fname}',
                '${user.lname}',
                '${user.email}',
                '',
                '',
                '',
                ''
            )
        `
    return profileDb.execute(sql);
}

exports.registerUser = (data, id) => {
    const sql =
        `
            CALL MODIFY_USER(
                ${id},
                NULL,
                NULL,
                NULL,
                '${data.imgURL}',
                '${data.country}',
                '${data.about}'
            )
        `
    return profileDb.execute(sql);
}

exports.login = (data) => {
    const sql =
        `
            CALL GET_USER_PER_EMAIL_PASSWORD(
                '${data.email}',
                '${data.password}'
            )
        `
    return profileDb.execute(sql);
}

exports.getUserProfile = user_id => {
    const sql =
        `SELECT * FROM knowledgebase.users where id = '${user_id}'
        `
    return profileDb.execute(sql);
}