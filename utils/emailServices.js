const nodemailer = require('nodemailer');

const sendEmail = (sendTo, senderName, callback) => {
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
        from: process.env.SMTP_SEND_ADDRESS,
        to: sendTo,
        subject: 'You got an new Conversation from KnowledgeBase',
        text: `${senderName} has started an conversation with you`
    };
    transporter.sendMail(mailOptions, callback);
}

exports.sendEmail = sendEmail


