module.exports = {

    attributes: {
        id: {
            type: 'string',
            required: true,
            unique: true,
        },
        content: {
            type: 'string',
            required: true,
        },
        userSend: {
            model: 'user'
        },
        userReceive: {
            model: 'user'
        }
    },

};

