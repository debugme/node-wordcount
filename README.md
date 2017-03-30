// Some more tests to have
// 1. file to read from does not exist
// 2. file to read from is not actually a file
// 3. file to read from is not permissioned to let you read it
// 4. file is empty
// 5. Handle error cases to get 100% test coverage!!


import fs from 'fs'

import readFile from './source/readFile'

readFile({ filepath: 'input/input.txt', strategy: 'buffered' })
  .then(metrics => fs.writeFileSync('./output/one.json', JSON.stringify(metrics, undefined, 2)))

readFile({ filepath: 'input/input.txt', strategy: 'streamed' })
  .then(metrics => fs.writeFileSync('./output/two.json', JSON.stringify(metrics, undefined, 2)))


// const fs = require('fs')
// const primes = require('./primes.json')
// const NanoTimer = require('nanotimer')


// function updateMetrics(metrics, primes, text) {
//   const lines = text.toLowerCase().split(/\n/)
//   lines.reduce((info, data) => {
//     const line = data.replace(/--/g, ' ')
//     const tokens = line.split(/[\s+]/)
//     tokens.reduce((metrics, token) => {
//       const word = token.replace(/[^a-z]+/g, '')
//       if (metrics[word]) {
//         metrics[word].count++
//         metrics[word].prime = primes[metrics[word].count] || false
//       } else {
//         metrics[word] = { count: 0, prime: false }
//       }
//       return metrics
//     }, metrics)
//     return metrics
//   }, metrics)
//   return metrics
// }

// const approachOne = function (callback) {
//   const metrics = {}
//   const text = fs.readFileSync('input/input.txt', 'utf-8')
//   updateMetrics(metrics, primes, text)
//   delete metrics['']
//   fs.writeFileSync('./output/one.json', JSON.stringify(metrics, undefined, 2))
//   callback()
// }

// const approachTwo = function (callback) {
//   var metrics = {}
//   fs.createReadStream('input/input.txt', { highWaterMark: 655360 })
//     .on('data', buffer => updateMetrics(metrics, primes, buffer.toString()))
//     .on('end', () => { delete metrics['']; fs.writeFileSync('./output/two.json', JSON.stringify(metrics, undefined, 2)); callback() })
// }

// new NanoTimer().time(approachOne, '', 's', time => console.log(`Synchronous Approach took ${time} seconds`))
// new NanoTimer().time(approachTwo, '', 's', time => console.log(`Asynchronous Approach took ${time} seconds`))










// "the longest possible array could have 232-1 = 4,294,967,295 = 4.29 billion elements." (http://stackoverflow.com/questions/6154989/maximum-size-of-an-array-in-javascript)
// " 2^32 - 1 for an object in javascript i.e. 4294967295" (http://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object)




// 1. Write a synchronous version that reads a test file









How to read a file of values into an object

```
const lines = fs.readFileSync('./primes.txt', 'utf-8')
const tokens = lines.split(/\s+/)
const primes = tokens.reduce(function(acc, val) {
  if (val.trim().length)
    acc[val] = true
  return acc
}, {})

fs.writeFileSync('./primes.json', JSON.stringify(primes))
```

How to run ES6 tests and get coverage reports generated

```
https://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/
```



// "the longest possible array could have 232-1 = 4,294,967,295 = 4.29 billion elements." (http://stackoverflow.com/questions/6154989/maximum-size-of-an-array-in-javascript)
// " 2^32 - 1 for an object in javascript i.e. 4294967295" (http://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object)



// Use this reader for or files smaller than 512MB (32-BIT system) 1GB (64-BIT system)
// (http://stackoverflow.com/questions/29766868/node-js-read-big-file-with-fs-readfilesync)