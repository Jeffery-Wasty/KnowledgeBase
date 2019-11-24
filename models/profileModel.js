const profileDb = require('../Database/databaseConnection');

exports.createUser = (user) => {
    const sql =
        `
            INSERT INTO 
            USERS (ID, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL) 
            VALUES (
                 ${user.id},
                '${user.password}',
                '${user.fname}',
                '${user.lname}',
                '${user.email}')
        `;
    return profileDb.execute(sql);
}

exports.registerUser = (data) => {
    const sql = 
        `
            UPDATE USERS
            SET 
                PROFILE_IMAGE_URL = '${data.imgURL}',
                COUNTRY = '${data.country}',
                ABOUT = '${data.about}',
                DATE_OF_BIRTH = '${data.birthdate}'
            WHERE ID=${data.id}
    `;
    return profileDb.execute(sql);
}

exports.login = (data) => {
    const sql = 
        `
            SELECT * FROM USERS
            WHERE EMAIL = '${data.email}'
        `
    return profileDb.execute(sql);
}