const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ETUSDATASTORE.db');

// db.run('CREATE TABLE etusPostTableEncrypted (titleFr TEXT,descFr TEXT, titleAr TEXT,descAr TEXT,postDate TEXT,image TEXT,actif TEXT)');

// db.run('CREATE TABLE etusUserTableEncrypted (etusEmailField TEXT,etusPasswordField TEXT)')
// db.run('DROP TABLE etusPostTableEncrypted ')

// db.run(`INSERT INTO etusUserTableEncrypted (etusEmailField, etusPasswordField) VALUES (?,?)`,["admin","admin"],
//     function(error){
//         console.log("CBON");
//     })cd

db.all('SELECT * from etusUserTableEncrypted', function(err, rows) {       
    console.log(rows);
});