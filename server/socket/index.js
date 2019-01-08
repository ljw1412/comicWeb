const io = require('socket.io')
const moment = require('moment')

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
      console.log('message:', msg)
      socket.emit('message', {
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        message: 'aaa'
      })
    })
  }
}

module.exports = SocketServer
