const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b164f918dfb74e',
  password : 'a7cdfb38',
  database : 'heroku_ae73573e7ae6edf'
});

db.connect((err) => {
  if(err){
    throw err
  }
  console.log('mySQL Connected...')
});


module.exports = db
