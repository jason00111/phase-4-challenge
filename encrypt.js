const bcrypt = require('bcrypt')

const saltRounds = 10

const hash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, generatedHash) => {
      if (error) {
        reject(error)
      } else {
        resolve(generatedHash)
      }
    })
  })
}

const compare = function(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, match) => {
      if (error) {
        resolve(error)
      } else if (!match) {
        reject({message: 'Incorrect password.'})
      } else if (match){
        resolve(match)
      }
    })
  })
}

module.exports = { hash, compare }
