# A crossbreed of a pipeline and a maybe construct

[![Latest Version on NPM](https://img.shields.io/npm/v/take-then.svg?style=flat-square)](https://npmjs.com/package/take-then)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/take-then/master.svg?style=flat-square)](https://travis-ci.org/spatie/take-then)

The `take` function allows you to perform a sequence of operations on any object without needing to create intermediate variables and without needing to worry about `null` or `undefined` values.

```js
import take from 'take-then';

const fourthLetterInUpperCase = string =>
    take(string)
        .then(string => string.toUpperCase())
        .then(string => string[3])
        .withDefault(😢);

fourthLetterInUpperCase('hello'); // 'L'
fourthLetterInUpperCase('foo'); // '😢'
```

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

`take-then` can be installed with yarn or npm:

```bash
yarn add take-then
```

## Usage

`take-then` exposes one function: `take`. The `take` function decorates an object so we can chain a series of operations on it.

The methods on the wrapped object are:

...

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ yarn test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Sebastian De Deyne](https://github.com/sebastiandedeyne) instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
