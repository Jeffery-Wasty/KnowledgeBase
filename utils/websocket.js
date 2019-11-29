const WebSocket = require("ws")
const http = require("http")

const userId2Socket = new Map();
exports.start = (app) => {
    const server = http.createServer(app);

    const wss = new WebSocket.Server({ server });

    wss.on("connection", socket => {
        socket.on('message', (message) => {
            let msg = JSON.parse(message)
            if (msg.type === "register") {
                userId2Socket.set(msg.user_id, socket);
            }
            if (msg.type === "send") {
                send(msg.data)
            }
        });
        socket.on("close", () => {
            for (let [key, value] of userId2Socket) {
                if (value === socket) userId2Socket.delete(key);
            }
        })
    })
    return server;
};

const send = (data) => {
    let client = userId2Socket.get(data.receiver_id)
    if (client && client.readyState === 1) {
        let response = {
            type: "receive",
            data: data
        }
        client.send(JSON.stringify(response))
    }
}
exports.pushMsg = send