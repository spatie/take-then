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

## Support us

Learn how to create a package like this one, by watching our premium video course:

[![Laravel Package training](https://spatie.be/github/package-training.jpg)](https://laravelpackage.training)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Kruikstraat 22, 2018 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

`take-then` can be installed with yarn or npm:

```bash
yarn add take-then
```

## Usage

`take-then` exposes one function: `take`. The `take` function decorates an object that lets us chain a series of operations on it.

The methods on the wrapped object are *(`T` is the type of the wrapped object)*:

### `then(callback: (value: T) => U): Wrapper<U>`

`then` performs an operation on the wrapped object if the object isn't `null` or `undefined`, and returns a new wrapped opject containing the transformed value.

```js
const object = take('foo').then(string => string.toUpperCase());
```

In the example, `object` contains `FOO` internally. Since `object` is a `Wrapper`, `then` calls can be chained.

### `get(): T`

Return the wrapped value.

```js
const value = take('foo')
    .then(string => string.toUpperCase())
    .get();
```

In the example, `value` equals "FOO".

### `withDefault(fallback: U): T | U`

Return the wrapped value, or the fallback if the wrapped value is `null` or `undefined`.

```js
const value = take(['a', 'b'])
    .then(chars => chars[2])
    .withDefault('z');
```

In the example, `value` equals "z", since `chars[2]` is `undefined`.

### `isSomething(): boolean`

Returns `true` if the wrapped value **isn't** `null` or `undefined`.

### `isNothing(): boolean`

Returns `true` if the wrapped value **is** `null` or `undefined`.

### `log(message: string | null): Wrapper<T>`

Log the value and (optionally) a message, and return the value in the wrapper. Useful for debugging chains.

## Real world refactoring example

`take-then` is great for refactoring processes with intermediate `null` or `undefined` checks into a clean & composable pipeline.

Consider a case where we want to retrieve a user's role by passing the user's name. Roles are object stored in a different array. Here's our setup:

```js
const users = [
    { id: 1, name: 'Sebastian', role: 1 },
    { id: 2, name: 'Freek', role: 1 },
    { id: 3, name: 'Willem', role: 2 },
];

const roles = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Designer' },
];
```

Now for our first implementation.

```js
const findRoleNameByUserName = name => {
    const user = users.find(u => u.name === name);
    const role = roles.find(r => r.id === user.role);

    return role.name;
};
```

There are some issues here. If either the user or the role isn't found, we'll have runtime errors, since we'd be trying to retrieve a property from something `undefined` (`user.role` and `role.name` are the dangerous parts here).

We can avoid this with early returns. Let's return an empty string in this case, since we're expecting a string in the first place.

```js
const findRoleNameByUserName = name => {
    const user = users.find(u => u.name === name);

    if (! user) {
        return '';
    }

    const role = roles.find(r => r.id === user.role);

    if (! role) {
        return '';
    }

    return role.name;
};
```

Our code works, but it's not the prettiest thing... Time to refactor this to a single statement with `take-then`! Since `take-then` avoids calling a function when the wrapped object is `null` or `undefined`, we don't need to worry about those checks anymore—without reintroducing the potential runtime errors.

```js
const findRoleNameByUserName = name =>
    take(name)
        .then(name => users.find(u => u.name === name))
        .then(user => roles.find(r => r.id === user.role))
        .then(role => role.name)
        .withDefault('');
```

Voila! Our chain won't throw any runtime errors, and if our value became `null` or `undefined` at any part, we'll return an empty string instead. We can make this even more readable by splitting our pipeline into bite-sized pieces instead of a chain of anonymous functions.

```js
const findUserByName = name => users.find(u => u.name === name);
const findRoleForUser = user => roles.find(r => r.id === user.role);

const findRoleNameByUserName = name =>
    take(name)
        .then(findUserByName)
        .then(findRoleForUser)
        .then(role => role.name)
        .withDefault('');
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ yarn test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Freek Van der Herten](https://github.com/freekmurze) instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
