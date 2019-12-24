const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gabyta168',
  database : 'pizza_appdb'
});

db.connect((err) => {
  if(err){
    throw err
  }
  console.log('mySQL Connected...')
});


module.exports = db
