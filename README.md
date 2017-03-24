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