#!/usr/bin/env node

const app = require('./')
const minimist = require('minimist')
const args = minimist(process.argv)

if (args._[2] === 'sign') {
  app.sign(args._[3])
}
