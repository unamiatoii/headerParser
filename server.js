const express = require('express');
const cors = require('cors');
const os = require('os');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Fonction pour obtenir l'adresse IP locale
const getLocalIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
};

app.listen(port, () => {
    const ipAddress = getLocalIpAddress();
    console.log(`Serveur en écoute sur http://${ipAddress}:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/whoami', function(req, res){
    res.json({ipaddress: req.ip, language: req.headers['accept-language'], software: req.headers['user-agent']})
})

module.exports = app;
