const fs = require('fs')
const primes = require('./primes.json')
const NanoTimer = require('nanotimer')

function updateMetrics(metrics, primes, text) {
  const allText = text.toLowerCase()
  const lines = allText.split(/\n/)
  lines.reduce(function (info, data) {
    const line = data.replace(/--/g, ' ')
    const tokens = line.split(/[\s+]/)
    const words = tokens.map(token => token.replace(/[^a-z]+/g, ''))
    words.forEach(function(word) {
      if (!metrics[word])
        metrics[word] = { count: 0, prime: false }
      metrics[word].count++
      metrics[word].prime = primes[metrics[word].count] || false
    })
  }, metrics)
}

const metrics = {}
const text = fs.readFileSync('/Users/debugme/Desktop/smallData.txt', 'utf-8')
const approachOne = function (callback) {
  updateMetrics(metrics, primes, text)
  callback()
}

new NanoTimer().time(approachOne, '', 's', function(time) { console.log(`It took ${time} seconds`)})
fs.writeFileSync('./smallOutput.json', JSON.stringify(metrics))
