import fs from 'fs'
import primes from '../utilities/primes'

function updateMetrics(metrics, primes, text) {
  const lines = text.toLowerCase().split(/\n/)
  lines.reduce((info, data) => {
    const line = data.replace(/--/g, ' ')
    const tokens = line.split(/[\s+]/)
    tokens.reduce((metrics, token) => {
      const word = token.replace(/[^a-z]+/g, '')
      if (metrics[word]) {
        metrics[word].count++
        metrics[word].prime = primes[metrics[word].count] || false
      } else {
        metrics[word] = { count: 1, prime: false }
      }
      return metrics
    }, metrics)
    return metrics
  }, metrics)
  if (metrics[''])
    delete metrics['']
  return metrics
}

const bufferedRead = options => {
  return new Promise(function(resolve, reject) {
    try {
      const text = fs.readFileSync(options.filepath, 'utf-8')
      const metrics = updateMetrics({}, primes, text)
      resolve(metrics)
    } catch (error) {
      reject(error)
    }
  })
}

const streamedRead = options => {
  return new Promise(function(resolve, reject) {
    try {
      const highWaterMark = options.highWaterMark || 655360
      const metrics = {}
      let store = []
      fs.createReadStream(options.filepath, { highWaterMark })
        .on('data', data => {
          const fragment = data.toString()
          store.push(fragment)
          console.log(`PUSH [${fragment}]`)
          if (fragment.endsWith(' ')) {
            const text = store.join('')
            store = []
            console.log(`UPDT [${text}]`)
            updateMetrics(metrics, primes, text)
          }
        })
        .on('end', (data) => {
          if (store.length > 0) {
            const text = store.join('')
            store = []
            console.log(`UPDT [${text}]`)
            updateMetrics(metrics, primes, text)
          }
          // console.log(metrics)
          resolve(metrics)
        })
        .on('error', error => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}

const readFile = options => {
  if (options.approach === 'buffered')
    return bufferedRead(options)
  else
    return streamedRead(options)
}

export default readFile