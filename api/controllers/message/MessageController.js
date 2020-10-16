var uuid = require('uuid');

var Pusher = require('pusher');
var pusher = new Pusher({
    appId: '1085401',
    key: 'f2becd7560a32a501c51',
    secret: '4a2952b9ebb9b1d4845f',
    cluster: 'us2',
    encrypted: true
});

module.exports = {
    sendMessage(req, res) {
        data = req.body;
        pusher.trigger('my-chat', 'send-message', {
            'message': data.message,
            'userSend': data.userSend,
            'userReceive': data.userReceive,
        });

        return res.json("Contenido enviado!");
    },
};