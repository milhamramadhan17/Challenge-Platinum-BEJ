module.exports = (io, socket) => {
    const joinRoom = (payload) => {
        console.log(payload, 'joinRoom');
    }

    const sendChat = (payload) => {
        console.log(payload, 'sendChat');
    }

    socket.on('chat:joinRoom', joinRoom);
    socket.on('chat:sendChat', sendChat);

}