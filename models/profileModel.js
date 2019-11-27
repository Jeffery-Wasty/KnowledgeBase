const profileDb = require('../Database/databaseConnection');

exports.createUser = (user) => {
    console.log("IN CREATE USER")
    console.log(user)
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
    // const sql = 
    //     `
    //         UPDATE USERS
    //         SET 
    //             PROFILE_IMAGE_URL = '${data.imgURL}',
    //             COUNTRY = '${data.country}',
    //             ABOUT = '${data.about}',
    //             DATE_OF_BIRTH = '${data.birthdate}'
    //         WHERE ID=${id}
    // `;
    const sql = 
        `
            CALL MODIFY_USER(
                ${id},
                '${data.fname}',
                '${data.lname}',
                '${data.email}',
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