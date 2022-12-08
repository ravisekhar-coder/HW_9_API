const sql = require('mssql')
const sqlConfig = {
  user: 'DB_GROUP_32',
  password: 'DB_GROUP_32',
  database: 'DB_GROUP_32',
  server: '141.215.69.65',
  options: {
    trustServerCertificate: true 
  }
}


async function getConnection(){
    try {
 

        let pool = await new sql.ConnectionPool(sqlConfig);
        let connect = await pool.connect();
        let request = await connect.request();
          return request;
       } catch (err) {
        // ... error checks
        console.log(err.message)
       }
}

module.exports = {
    getConnection
}