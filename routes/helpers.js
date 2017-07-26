const dbUsers = require('../database/users')

const userExists = function(email) {
  return new Promise((resolve, reject) => {
    dbUsers.getUserByEmail(email)
    .then(users => {
      const user = users[0]

      if (!user) {
        reject({message: 'Email not found. Sign up first.'})
      } else {
        resolve(user)
      }
    })
    .catch(error => reject(error))
  })
}

module.exports = { userExists }
