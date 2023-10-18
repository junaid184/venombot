const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    const buttons = [
        {
            type: 'reply',
            reply: 'Battery Replacement',
            text: 'Battery Replacement',
        },
        {
            type: 'reply',
            reply: 'Battery Prices',
            text: 'Battery Prices',
        },
        {
            type: 'reply',
            reply: 'Assistance',
            text: 'Assistance',
        },
    ];

    client.sendMessage('923122975086@c.us', {
        content: {
            buttons: buttons,
            text: 'Select an option:',
        },
    }).then((response) => {
        console.log('Message sent successfully:', response);
    }).catch((error) => {
        console.error('Error sending message:', error);
    });
});

client.initialize();
