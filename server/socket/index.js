const io = require('socket.io')
const moment = require('moment')
const mangaBoxSpider = require('../src/comic/crawler/mangaBox')

class SocketServer {
  constructor(server) {
    this.server = server
    this.io = io(server)
  }

  init() {
    this.io.on('connection', socket => {
      console.log('a user conected')
      this.addListener(socket)
      socket.on('disconnect', function() {
        console.log('user disconnected')
      })
    })
  }

  addListener(socket) {
    socket.on('message', msg => {
      const { api, param } = msg
      console.log('message:', msg)
      switch (api) {
        case '/comic/crawler':
          try {
            mangaBoxSpider(socket)
          } catch (error) {
            this.emit(socket, error)
          }

          break
      }
    })
  }

  emit(socket, message) {
    socket.emit('message', {
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      message
    })
  }
}

module.exports = SocketServer
