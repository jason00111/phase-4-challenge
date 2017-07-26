const query = require('./setup')

const getAlbums = function() {
  return query("SELECT * FROM albums", [])
}

const getAlbumsByID = function(albumID) {
  return query("SELECT * FROM albums WHERE id = $1", [albumID])
}

module.exports = {
  getAlbums,
  getAlbumsByID
}
