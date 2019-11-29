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

environmentVariables.forEach((key) => {
    if (!process.env[key]) {
        console.log(`Missing environment variable ${key}`);
    }
});