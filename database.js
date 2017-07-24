const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

// Query helper function
const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const getAlbums = function(callback) {
  query("SELECT * FROM albums", [], callback)
}

const getAlbumsByID = function(albumID, callback) {
  query("SELECT * FROM albums WHERE id = $1", [albumID], callback)
}

const addUser = function(name, email, password, callback) {
  query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password], callback)
}

const getUserByEmail = function(email, callback) {
  query("SELECT * FROM users WHERE email = $1", [email], callback)
}

const getUserByID = function(userID, callback) {
  query("SELECT * FROM users WHERE id = $1", [userID], callback)
}

const reviewsQuery = `
  SELECT
    reviews.id, reviews.created, reviews.review,
    users.id AS user_id, users.name AS user,
    albums.id AS album_id, albums.title AS album, albums.artist
  FROM
    reviews
  JOIN
    albums
  ON
    albums.id = reviews.album_id
  JOIN
    users
  ON
    users.id = reviews.user_id `

const getRecentReviews = function(callback) {
  query(reviewsQuery + 'ORDER BY created DESC LIMIT 3', [], callback)
}

const getReviewsByAlbumID = function(albumID, callback) {
  query(reviewsQuery + 'WHERE album_id = $1 ORDER BY created DESC', [albumID], callback)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  addUser,
  getUserByEmail,
  getUserByID,
  getRecentReviews,
  getReviewsByAlbumID
}
