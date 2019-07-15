/* eslint-disable no-console */
const { isAddress } = require('../lib');

const val = isAddress('0x0');

// val === false
console.log(val);
