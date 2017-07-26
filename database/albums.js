const query = require('./setup')

const getAlbums = async () => await query("SELECT * FROM albums", [])

const getAlbumsByID = async (albumID) =>
  await query("SELECT * FROM albums WHERE id = $1", [albumID])

module.exports = {
  getAlbums,
  getAlbumsByID
}
