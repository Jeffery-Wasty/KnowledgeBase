const nodemailer = require('nodemailer');

const sendEmail = (sendTo, senderName, callback) => {
    const transporter = nodemailer.createTransport({
        "host": "email-smtp.us-west-2.amazonaws.com",
        "port": 465,
        "secureConnection": true,
        "auth": {
            "user": "AKIAZH2XP2MHNT2K5INN",
            "pass": "BG6rDN9lPWRpeHa02YR0hrlG4GdzZMG4VnLOAe7C4xK9"
        }
    });

    const mailOptions = {
        from: "Knowledge Base<sylvartore@gmail.com>",
        to: "sylvartore@gmail.com",
        subject: 'You got an new Conversation from KnowledgeBase',
        text: `${senderName} has started an conversation with you`
    };
    transporter.sendMail(mailOptions, callback);
}

exports.sendEmail = sendEmail


