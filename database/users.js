const query = require('./setup')

const addUser = function(name, email, password) {
  return query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password])
}

const getUserByEmail = function(email) {
  return query("SELECT * FROM users WHERE email = $1", [email])
}

const getUserByID = function(userID) {
  return query(`
    SELECT
      id, name, email, password, to_char(joined, 'FMMonth FMDD, YYYY') AS joined
    FROM
      users
    WHERE
      id = $1`,
    [userID])
}

module.exports = {
  addUser,
  getUserByEmail,
  getUserByID
}
