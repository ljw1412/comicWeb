const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz=+'
const chars = str.split('')
export default class UUID {
  constructor(length = 16) {}

  static random(length = 16) {
    let uuid = ''
    for (let i = 0; i < length; i++) {
      uuid += chars[parseInt(Math.random() * chars.length)]
    }
    return uuid
  }
}
