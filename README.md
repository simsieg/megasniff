# Megasniff

Better debugging for chained functions (promises, streams, etc.).
Inspired by [supersniff](https://github.com/mpj/supersniff), but with these improvements in mind:

- [x] Support for custom loggers (like [bunyan](https://github.com/trentm/node-bunyan), [winston](https://github.com/winstonjs/winston), or other services)
- [x] Pre- and suffix support
- [x] No forced `tag`
- [x] Using error levels for errors

Things to do:

- [ ] Custom configureable log levels
- [ ] Decorator functions (e.g. ```error => error.message```)


## Motivation

Can be found [here](https://github.com/mpj/supersniff#why-this-is-useful).
It shall be a readable replacement for:

```javascript
getData()
  .then(data => {
    console.info(data)
    return data
  })
  .then(transformData)
```

## Installation

```shell
npm install megasniff
```

## Examples

```javascript
const megasniff = require('megasniff')

const reveersedList = new Promise(resolve => resolve([3, 1, 2]))
  .then(megasniff)
  .then(list => list.sort())
  .then(megasniff)
  .then(list => list.reverse())
  .then(megasniff)
```

This yields in the console:

```javascript
[ 3, 1, 2 ]
[ 1, 2, 3 ]
[ 3, 2, 1 ]
```

```javascript
const megasniff = require('megasniff')

new Promise(resolve => resolve('Good'))
  .then(megasniff.config({ suffix: `Value at ${new Date()}:` }))
```
This yields on stdout:
```shell
Good Value at Wed Oct 17 2018 15:47:26 GMT+0200 (Central European Summer Time)
```

```javascript
const megasniff = require('megasniff')
const logger = console

new Promise((resolve, reject) => reject(new Error('Bad')))
  .catch(megasniff.config({ suffix: '.. We are doomed' }))
  .catch(error => error)
```

This yields on stderr:
```shell
Error: Bad ... We are doomed
```

## API

### Default Usage:

```javascript
const megasniff = require('megasniff')

const sortedList = new Promise(resolve => resolve([3, 1, 2]))
  .then(megasniff)
  .then(list => list.sort())
  .then(megasniff)
```

`megasniff` is a function that logs and returns the passed value.
The value is logged either to stdout or sterr depending on the passed value.

### Configuration:

```javascript
const megasniff = require('megasniff')
const logger = console
new Promise(resolve => resolve('Good Software'))
  .then(megasniff.config({ prefix: `[megasniff]`, logger }))

```
`megasniff.config` takes an object as argument.
Megasniff can be configured with these optional parameters:

| key    | value                             |
|--------|-----------------------------------|
| log    | External logger                   |
| logger | Other key for external logger     |
| prefix | Will be prefixed the logged value |
| suffix | Will be suffixed the logged value |
