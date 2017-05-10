# A crossbreed of a pipeline and a maybe construct

[![Latest Version on NPM](https://img.shields.io/npm/v/pipe-through.svg?style=flat-square)](https://npmjs.com/package/pipe-through)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/pipe-through/master.svg?style=flat-square)](https://travis-ci.org/spatie/pipe-through)

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

`pipe-through` can be installed with yarn or npm:

```bash
yarn add pipe-through
```

## Usage

```js
import pipe from 'pipe-through';

const fourthLetterInUpperCase = string =>
    pipe(string)
        .through(s => s.toUpperCase())
        .through(s => s[3])
        .withDefault(😢);

fourthLetterInUpperCase('hello'); // 'L'
fourthLetterInUpperCase('foo'); // '😢'
```

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
