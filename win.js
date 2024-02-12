const fs = require('fs')
const path = require('path')
const run = require('./lib/spawn')

exports.sign = sign

async function sign (filename) {
  const signTool = await findSignTool()
  await run(signTool, 'sign', '/tr', 'http://timestamp.digicert.com', '/td', 'sha256', '/fd', 'sha256', '/a', filename)
}

async function findSignTool () {
  let p = 'C:\\Program Files (x86)\\Windows Kits\\10\\bin'

  const names = await fs.promises.readdir(p)

  let top = null
  for (const name of names) {
    if (!top || cmp(top, name) < 0) top = name
  }

  return path.join(p, top, 'x64', 'signtool.exe')
}

function cmp (a, b) {
  a = a.split('.').map(n => parseInt(n))
  b = b.split('.').map(n => parseInt(n))

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] || 0) < (b[i] || 0)) return -1
    if ((a[i] || 0) > (b[i] || 0)) return 1
  }

  return 0
}

