const sql = require('mssql');

const config = {
    server: 'groupedapp.cks6s2hqxqr4.eu-west-1.rds.amazonaws.com',
    database: 'groupedapp',
    user: 'admin',
    password: 'admin123',
    options: {
      encrypt: true,
      trustServerCertificate: true,
      enableArithAbort: true, // You can adjust other options as needed
      ssl: {
        rejectUnauthorized: false // Bypass certificate validation
      }
    }
};

const pool = new sql.ConnectionPool(config);

async function connect(){
    if(!pool.connected)
    {
      await pool.connect();
    }
    
}

function checkPoolStatus(){
  console.log(pool.connected);
  return pool.connected;
}

function closeConnection(){
  if (pool.connected)
    pool.close();
}

async function excuteQuery(sqlQuery, parameters){
  try
  {
    let result = undefined;
    // Check if the connection pool is already connected
    if (!pool.connected) await pool.connect();
    const request = new sql.Request(pool);
    for (const [key, value] of Object.entries(parameters)) {
      request.input(key, value);
    }
    result = await request.query(sqlQuery);
    await pool.close();
    return result.recordset;
  }
  catch (err)
  {
    console.error(err);
  }
}

async function executeGet(sqlQuery){
  try
  {
    let result = undefined;
    // Check if the connection pool is already connected
    if (!pool.connected) await pool.connect();
    const request = new sql.Request(pool);
    result = await request.query(sqlQuery);
    await pool.close();
    return result.recordset;
  }
  catch (err)
  {
    console.error(err);
  }
}


module.exports = {excuteQuery, closeConnection, checkPoolStatus, connect, executeGet};
  