const app = require("./index");
const db = require("./models");
const port = 3000;

/** DATABASE SYNCHRONISATION */
db.sequelize.sync()
    .then(() => { console.log('Synced db.') })
    .catch((err) => { console.log('Error : ' + err.message) });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
