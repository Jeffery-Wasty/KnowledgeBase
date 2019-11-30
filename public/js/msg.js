let mws;
let last_time = 0;
let display_new_message = 1;
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".m-list").firstElementChild.click()
    getMsgPush()
});

const send = () => {
    const data = {
        conversation_id: document.getElementById("conversation_id").value,
        message: document.getElementById("text").value,
        sender_id: document.getElementById("sender_id").value,
        receiver_id: document.getElementById("receiver_id").value
    }
    const body = JSON.stringify(data)
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    };
    fetch("/message/send", settings)
        .then(response => response.json())
        .then(msg => {
            appendMsg(msg, 1, 0, msg.TIME != last_time, msg.DATE)
        })
        .catch(e => console.log("Fetch error when sending msg", e));
    if (mws != null && mws.readyState === 1) {
        const msg = {
            type: "send",
            data: data
        }
        console.log("sended", msg)
        mws.send(JSON.stringify(msg));
    }
}

const fetchMsg = async (conversation_id) => {
    document.getElementById(conversation_id).querySelector("p").setAttribute("class", "name")
    document.getElementById("conversation_id").value = conversation_id
    fetch("/messages/get?id=" + conversation_id)
        .then(response => response.json())
        .then(data => renderMsg(data))
        .catch(e => console.log("Fetch error when rendering msg", e));
}

const renderMsg = (data) => {
    const msg = data.messages;
    display_new_message = 1;
    document.getElementById("receiver_id").value = data.receiver_id
    const messageNode = document.querySelector(".m-message");
    while (messageNode.firstChild) messageNode.removeChild(messageNode.firstChild);
    let cur_date = ""
    for (let i = 0; i < msg.length; i++) {
        let isSelf = msg[i].USER_ID === data.self_id
        let showDate = msg[i].DATE != cur_date
        if (showDate) cur_date = msg[i].DATE
        let showTime = i == 0 || msg[i].DATE != cur_date || msg[i].TIME != last_time
        appendMsg(msg[i], isSelf, showDate, showTime, cur_date)
    }
}

const appendMsg = (msg, isSelf, showDate, showTime, cur_date) => {
    const ul = document.querySelector(".m-message").appendChild(document.createElement("ul"))
    let li = ul.appendChild(document.createElement("li"))
    if (isSelf) {
        li.setAttribute("class", "self")
    }
    if (showDate) {
        let date = li.appendChild(document.createElement("div"))
        date.setAttribute("class", "date")
        date.textContent = cur_date
    }
    if (showTime) {
        last_time = msg.TIME
        let time = li.appendChild(document.createElement("p"))
        time.setAttribute("class", "time")
        time.appendChild(document.createElement("span")).textContent = msg.TIME
    }
    let main = li.appendChild(document.createElement("div"))
    main.setAttribute("class", "main")
    let img = main.appendChild(document.createElement("img"))
    img.setAttribute("class", "avatar")
    img.setAttribute("width", "30")
    img.setAttribute("height", "30")
    img.setAttribute("src", msg.PROFILE_IMG_URL)
    let txt = main.appendChild(document.createElement("div"))
    txt.setAttribute("class", "text")
    txt.textContent = msg.MESSAGE_BODY
}
const getMsgPush = () => {

    mws = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port);
    mws.onopen = (e) => {
        data = {
            type: "register",
            user_id: document.getElementById("sender_id").value
        }
        mws.send(JSON.stringify(data));
        console.log("MSG push OPEN");
    }
    mws.onmessage = (e) => {
        console.log(e.data)
        let msg = JSON.parse(e.data)
        if (msg.type === "receive") {
            if (msg.data.conversation_id === document.getElementById("conversation_id").value) {
                let now = new Date()
                let now_time = now.getHours() + ":" + now.getMinutes()
                new_msg = {
                    PROFILE_IMG_URL: document.getElementById(msg.data.conversation_id).querySelector("img").src,
                    TIME: now_time,
                    MESSAGE_BODY: msg.data.message
                }
                appendMsg(new_msg, 0, display_new_message, now_time != last_time, "new message")
                display_new_message = 0
            } else {
                if (document.getElementById(msg.data.conversation_id)) {
                    document.getElementById(msg.data.conversation_id).querySelector("p").setAttribute("class", "name red-point")
                } else {
                    const container = document.createElement("div")
                    container.setAttribute("class", "searchable")
                    container.setAttribute("onclick", "fetchMsg('" + msg.data.conversation_id + "')")
                    container.setAttribute("id", msg.data.conversation_id)
                    const l1 = document.createElement("li")
                    const img = document.createElement("img")
                    img.setAttribute("class", "avatar")
                    img.setAttribute("width", "30")
                    img.setAttribute("height", "30")
                    img.setAttribute("src", msg.data.profile_img)
                    l1.appendChild(img)
                    const p = document.createElement("p")
                    p.setAttribute("class", "name red-point")
                    p.textContent = msg.data.name
                    l1.appendChild(p)
                    const l2 = document.createElement("li")
                    l2.setAttribute("class", "properties")
                    l2.textContent = msg.data.subject + " " + msg.data.date
                    container.appendChild(l1)
                    container.appendChild(l2)
                    const conversations = document.querySelector(".m-list")
                    conversations.insertBefore(container, conversations.firstChild);
                }
            }
        }
    }
    mws.onerror = function (e) {
        console.log("MSG push ERROR");
    }
    mws.onclose = function (e) {
        console.log("MSG push CLOSE");
    }
}

