const fetch = require('node-fetch')
module.exports = (url, referer) => {
  return fetch(url, { headers: { referer } })
}
