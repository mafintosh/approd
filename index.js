const win = require('./win')

if (process.platform === 'win32') module.exports = win
else throw new Error('Unsupported platform')
