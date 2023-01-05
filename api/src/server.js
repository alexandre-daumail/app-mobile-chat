const app = require("./index");
const port = 3000;
const db = require('./models');

db.sequelize.sync()
    .then(() => {
        console.log('Synced db.');
    })
    .catch((err) => {
        console.log('Error : ' + err.message);
    });

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`);
})