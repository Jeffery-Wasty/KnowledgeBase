const dotenv = require("dotenv")

console.log('Initializing Environment Variables');

dotenv.config({ path: ".env" });

const environmentVariables = [
    "MYSQL_HOST",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "DB_NAME",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS"
];

let missingVariables = false
environmentVariables.forEach((key) => {
    if (!process.env[key]) {
        console.log(`Missing environment variable ${key}`);
        missingVariables = true
    }
});

if (missingVariables) {
    console.log(`Please check if your .env file is at root directory and using the correct format, contact Boning if you have further problems with setting .env`);
}