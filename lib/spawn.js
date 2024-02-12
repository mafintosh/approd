const { spawn } = require('child_process')

module.exports = function run (cmd, ...args) {
  const proc = spawn(cmd, [...args], { stdio: 'inherit' })
  return new Promise((resolve, reject) => {
    proc.on('exit', function (code) {
      if (code) return reject(new Error('Failed with: ' + code))
      resolve()
    })
  })
}
