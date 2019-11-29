const profileModel = require('../models/profileModel');
const msgModel = require('../models/msgModel');
const ws = require('../utils/websocket')
const es = require('../utils/emailServices')

exports.messagePage = (req, res) => {
    if (req.query.user_id && req.query.user_id != req.session.userId) {
        profileModel.getUserProfile(req.query.user_id).then(data => {
            if (data[0] && data[0][0] && data[0][0].PROFILE_IMAGE_URL) {
                res.render('messagePage', {
                    layout: 'msg',
                    profile_img: data[0][0].PROFILE_IMAGE_URL,
                    receiver_id: req.query.user_id,
                    sender_id: req.session.userId
                });
            }
            else {
                //to do 
                //user not found, redirect to last page
                res.send("user not found")
            }
        })
    } else {
        //to do 
        //cant message yourslef, redirect to last page
        res.send("please provide a destination user of your message (can't message yourself)")
    }
}

exports.startConversation = (req, res) => {
    if (req.body.subject && req.body.details && req.body.receiver_id && req.body.sender_id) {
        const conversation = {
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            subject: req.body.subject,
            message: req.body.details
        }
        profileModel.getUserProfile(req.body.sender_id).then(data => {
            if (data[0] && data[0][0] && data[0][0].PROFILE_IMAGE_URL) {
                profile_img = data[0][0].PROFILE_IMAGE_URL
                name = data[0][0].FIRST_NAME + " " + data[0][0].LAST_NAME
                msgModel.create_conversations(conversation).then(data => {
                    if (data[0] && data[0][0] && data[0][0][0]) {
                        conversation["conversation_id"] = data[0][0][0].ID
                        conversation["subject"] = req.body.subject
                        conversation["date"] = data[0][0][0].DATE
                        conversation["profile_img"] = profile_img
                        conversation["name"] = name
                        ws.pushMsg(conversation)
                        es.sendEmail(data[0][0].EMAIL, name, err => {
                            if (err) console.log("email sending failed: ", err)
                        })
                        res.redirect(303, '/conversationPage')
                    }
                })
            }
        })
    } else {

    }
}

exports.conversationPage = (req, res) => {
    msgModel.get_user_conversations(req.session.userId).then(data => {
        if (data[0] && data[0][0]) {
            data = data[0][0]
            for (let i = 0; i < data.length; i++) {
                let read = 1;
                if (data[i].READ == 3) read = 0
                if (data[i].SENDER == req.session.userId && data[i].READ == 1) read = 0
                if (data[i].RECEIVER == req.session.userId && data[i].READ == 2) read = 0
                data[i].READ = read
            }
            res.render('conversationPage', {
                layout: 'msg',
                sender_id: req.session.userId,
                conversations: data,
                scripts: [{ script: '/js/msg.js' }],
                styles: [{ style: '/css/msg.css' }],
            });
        }
        else {
            //to do 
            //user not found, redirect to last page
        }
    }).catch(err => console.log(err))
}

exports.getMessages = (req, res) => {
    const conversation_id = req.query.id
    if (conversation_id) {
        msgModel.get_messages_for_conversations(conversation_id, req.session.userId).then(data => {
            if (data[0] && data[0][0]) {
                update_read(conversation_id, req.session.userId, true).then(receiver_id => {
                    res.json({
                        self_id: req.session.userId,
                        receiver_id: receiver_id,
                        messages: data[0][0]
                    })
                })
            }
        }).catch(err => {
            console.log(err.message)
            res.json({ error: "internal error" })
        })
    }
}

exports.sendMessage = (req, res) => {
    const message = {
        sender_id: req.body.sender_id,
        conversation_id: req.body.conversation_id,
        body: req.body.message
    }
    msgModel.create_message(message).then(data => {
        if (data[0] && data[0][0] && data[0][0][0]) {
            update_read(req.body.conversation_id, req.session.userId, false).then(() => {
                res.json(data[0][0][0])
            })
        }
    }).catch(err => {
        console.log(err.message)
        res.json({ error: "internal error" })
    })
}

const update_read = async (conversation_id, user_id, hasRead) => {
    let data = await msgModel.get_conversation_info(conversation_id);
    let receiver_id = -1;
    if (data[0] && data[0][0]) {
        let read = data[0][0].READ
        if (user_id == data[0][0].USER_ID_1) {
            if (hasRead)
                read |= 1
            else
                read &= 1
            receiver_id = data[0][0].USER_ID_2
        }
        if (user_id == data[0][0].USER_ID_2) {
            if (hasRead)
                read |= 2
            else
                read &= 2
            receiver_id = data[0][0].USER_ID_1
        }
        data = await msgModel.set_read(conversation_id, read)
        return receiver_id
    }
}


