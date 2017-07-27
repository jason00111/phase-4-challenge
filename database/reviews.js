const query = require('./setup')

const reviewsQuery = `
  SELECT
    reviews.id, to_char(reviews.created, 'FMMonth FMDD, YYYY') AS created,
    reviews.created AS time, reviews.review,
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

const getRecentReviews = () =>
  query(reviewsQuery + 'ORDER BY time DESC LIMIT 3', [])

const getReviewsByAlbumID = (albumID) =>
  query(reviewsQuery + 'WHERE album_id = $1 ORDER BY time DESC', [albumID])

const addReview = (albumID, userID, review) =>
  query("INSERT INTO reviews (album_id, user_id, review) VALUES ($1, $2, $3) RETURNING *",
    [albumID, userID, review])

const getReviewsByUserID = (userID) =>
  query(reviewsQuery + 'WHERE user_id = $1 ORDER BY time DESC', [userID])

const deleteReview = (reviewID) =>
  query("DELETE FROM reviews WHERE id = $1", [reviewID])

const getReviewByID = (reviewID) =>
  query(reviewsQuery + 'WHERE reviews.id = $1', [reviewID])

module.exports = {
  getRecentReviews,
  getReviewsByAlbumID,
  addReview,
  getReviewsByUserID,
  deleteReview,
  getReviewByID
}
