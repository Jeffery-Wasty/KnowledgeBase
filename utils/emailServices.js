const nodemailer = require('nodemailer');



exports.sendEmail = (sendFrom, sendTo, senderName, callback) => {
    const transporter = nodemailer.createTransport({
        "host": process.env.SMTP_HOST,
        "port": process.env.SMTP_PORT,
        "secureConnection": true,
        "auth": {
            "user": process.env.SMTP_USER,
            "pass": process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: sendFrom,
        to: sendTo,
        subject: 'You got an new Conversation from KnowledgeBase',
        text: `<h1>${senderName} has started an conversation with you</h1>`
    };
    transporter.sendMail(mailOptions, callback);
}
