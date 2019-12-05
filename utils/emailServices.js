const nodemailer = require('nodemailer');

const sendEmail = (sendTo, senderName, callback) => {
    const transporter = nodemailer.createTransport({
        "host": "email-smtp.us-west-2.amazonaws.com",
        "port": 465,
        "secureConnection": true,
        "auth": {
            "user": "AKIAZH2XP2MHETXA7E4V",
            "pass": "BLNjRUOSMqKZkIhzz5ALnK6WLtON+p5uTDBVufbwBd6p"
        }
    });

    const mailOptions = {
        from: "Knowledge Base<sylvartore@gmail.com>",
        to: sendTo,
        subject: 'You got an new Conversation from KnowledgeBase',
        text: `${senderName} has started an conversation with you`
    };
    transporter.sendMail(mailOptions, callback);
}

exports.sendEmail = sendEmail


