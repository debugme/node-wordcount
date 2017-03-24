// declare an object to store words e.g. let words = {};
// declare the largest number of hits for a specific word e.g. let maxCount = 0;
// open a file for reading
// for each line in file
//   convert line to lowercase and trim
//   tokenize line on non-alphabetic
//   for each token in line
//     replace non-alphabetic with empty space
//     if token does not exist in object
//        put token in map with value { count: 0, isPrime: false }
//     put token in map and increment value by 1 e.g. words[token].count++
//     update the current value of maxCount e.g. maxCount = Math.max(maxCount, words[token].count)
//
// define an object of primes between 0 and maxCount e.g. primes = {1: true, 2: true, 3: true, 5: true, .... maxCount: true}
// for each word in words
//   word.isPrime = !!primes(word.count)

// How to create a React Tag Cloud
// https://www.npmjs.com/package/react-tagcloud


const fs = require('fs')
const primes = require('./primes.json')
const NanoTimer = require('nanotimer')

function showTimeInfo(time) {
  console.log(`It took ${time} seconds`)
}

const timer = new NanoTimer()



function updateMetrics(metrics, primes, text) {
  const allText = rawText.toLowerCase()
  const lines = allText.split(/\n/)
  lines.reduce(function(info, data) {
    const line = data.replace(/--/g, ' ')
    const tokens = line.split(/[\s+]/)
    const words = tokens.map(token => token.replace(/[^a-z]+/g, ''))
    if (!metrics[word])
      metrics[word] = { count: 0, prime: false }
    metrics[word].count++
    metrics[word].prime = primes(metrics[word].count) || false
  }, metrics)
}



// Approach 1 - When file fits inside memory
function approachOne(callback) {

  const rawText = fs.readFileSync('/Users/debugme/Desktop/smallData.txt', 'utf-8')
  const allText = rawText.toLowerCase()
  const lines = allText.split(/\n/)
  const metrics = lines.reduce(function(info, data) {
    const line = data.replace(/--/g, ' ')
    const tokens = line.split(/[\s+]/)
    const words = tokens.map(token => token.replace(/[^a-z]+/g, ''))


  }, {})


  // const words = tokens.map(token => token.replace(/[^a-z]/, '').trim())

  // fs.createWriteStream('./output.json', JSON.stringify({ lines: lines }), 'utf-8' )

  // const metrics = words.reduce(function(info, word) {
  //   if (!info[word])
  //     info[word] = { count: 0, prime: false }
  //   info[word].count++
  //   info[word].prime = primes[info[word].count] || false
  //   return info
  // }, {})


  // for (var m in metrics)
  // console.log(m, metrics[m])


  // let maxCount = 0;
  // const words = tokens.reduce(function(accumulator, token, index) {

  //   word = token.replace(/([^a-z]|\.)/, '').trim()
  //   if (!word)
  //     return accumulator
  //   if (!accumulator[word])
  //     accumulator[word] = { count: 0, prime: false }
  //   accumulator[word].count++
  //   accumulator[word].prime = !!primes[accumulator[word].count]
  //   maxCount = Math.max(maxCount, accumulator[word].count)
  //   if (index === tokens.length - 1) {
  //     console.log('maxCount', maxCount)
  //     for (var key in accumulator)
  //       console.log(`${key} ---> ${JSON.stringify(accumulator[key])}`)
  //   }
  //   return accumulator
  // }, {})

  callback()
}
timer.time(approachOne, '', 's', showTimeInfo)


// Approach 2 - When file does not fit inside memory
// FileSize (bytes)   BufferSize (bytes)      TimeTaken (seconds)
// 4,432,557,003      65536                   3.01
// 4,432,557,003      65536 * 10              2.85
// 4,432,557,003      65536 * 100             2.65
// 4,432,557,003      65536 * 1000            2.09
// 4,432,557,003      65536 * 2000            2.20
// function approachTwo(callback) {
//   var chunk = 0;
//   fs.createReadStream('/Users/debugme/Desktop/largeData.txt', { highWaterMark: (65536 * 2000) })
//     .on('data', function(buffer){chunk++; /*if(chunk === 10) console.log(buffer.toString().length)*/})
//     .on('end', function(){console.log('finished...', chunk); callback()})
// }
// timer.time(approachTwo, '', 's', showTimeInfo)







// var s = "asad\n";
// var t = "asad";

// console.log(s.lastIndexOf('\n'))
// console.log(t.lastIndexOf('\n'))