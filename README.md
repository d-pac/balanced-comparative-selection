 [![NPM version][npm-image]][npm-url]

> Balanced comparative selection algorithm plugin for d-pac platform

## Description

The algorithm accepts a queue (Array) of items, then:

1.  pseudo-randomizes the queue order
2.  sorts the queue by `compared.length`
3.  retains the first item as 'selected'
4.  finds its position in the list sorted by ability
5.  retains the next valid item as 'opponent':
    -   from the other half of the ability sorted list
    -   giving preference to the items 'selected' has been compared with the least
6.  returns both items

## Install

```sh
$ yarn add balanced-comparative-selection
```

## Usage

```js
var cs = require('balanced-comparative-selection');

cs.select( representations );
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Item

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of the item
-   `ability` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the ability of the item
-   `compared` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** An array containing id's of the items this item has been compared with.
    N.B. this _must_ contain duplicate ID's if the item has been compared multiple times with another item.

### Comparison

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `a` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the ID of the "A" item
-   `b` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the ID of the "B" item

### select

Simple comparative selection algorithm

**Parameters**

-   `payload` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The payload object
    -   `payload.items` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Item](#item)>** An array of [Item](#item)s

**Examples**

```javascript
const selected = cs.select([
  {
    id         : "3",
    compared    : [ "2", "4" ]
  },
  {
    id         : "2",
    compared    : [ "3" ]
  },
  {
    id         : "1",
    compared    : []
  },
  {
    id         : "4",
    compared    : [ "3", "5", "6" ]
  }
]);
console.log( selected );
// outputs:
// { a:"1", b:"2" }
```

Returns **[Comparison](#comparison)** the pair of items to compare

## Development

### Testing

```sh
$ yarn test
```

### Linting

```sh
$ yarn lint
```

## License

GPL v3 © [d-pac](http://www.d-pac.be)

[npm-url]: https://npmjs.org/package/balanced-comparative-selection

[npm-image]: https://badge.fury.io/js/balanced-comparative-selection.svg
