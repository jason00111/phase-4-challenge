const query = require('./setup')

const addUser = (name, email, password) =>
  query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password])

const getUserByEmail = (email) =>
  query("SELECT * FROM users WHERE email = $1", [email])

const getUserByID = (userID) =>
  query(`
    SELECT
      id, name, email, password, to_char(joined, 'FMMonth FMDD, YYYY') AS joined
    FROM
      users
    WHERE
      id = $1`,
    [userID])

module.exports = {
  addUser,
  getUserByEmail,
  getUserByID
}
