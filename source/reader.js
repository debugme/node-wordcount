
// const file = 'input/input.txt'
// const format = 'utf-8'

// const text = fs.readFileSync(file, format)
// const synchApproach = updateMetrics.bind(this, {metrics}, primes, text)








//   fs.createReadStream('input/input.txt', { highWaterMark: 655360 })
//     .on('data', buffer => updateMetrics(metrics, primes, buffer.toString()))
//     .on('end', () => { delete metrics['']; fs.writeFileSync('./output/two.json', JSON.stringify(metrics, undefined, 2)); callback() })