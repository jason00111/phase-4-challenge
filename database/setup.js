const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

const query = function(sql, variables){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  return new Promise((resolve, reject) => {
    client.query(sql, variables, function(error, result){
      if (error){
        console.log('QUERY <- !!ERROR!!')
        console.error(error)
        reject(error)
      } else {
        console.log('QUERY <-', JSON.stringify(result.rows))
        resolve(result.rows)
      }
    })
  })
}

module.exports = query
