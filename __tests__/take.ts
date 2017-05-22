import take from '../src';

describe('take', () => {

    it('can take an object and hold it', () => {
        expect(
            take('foo').get()
        ).toBe('foo');
    });

    it('can take an object and transform it', () => {
        expect(
            take('foo').then(s => s.toUpperCase()).get()
        ).toBe('FOO');
    });

    it('can take an object and apply a chain of transformations', () => {
        expect(
            take('foo')
                .then(s => s.toUpperCase())
                .then(s => `Hello, ${s}`)
                .get()
        ).toBe('Hello, FOO');
    });

    it('is nothing the object is null or undefined', () => {
        expect(take(null).isNothing()).toBe(true);
        expect(take(undefined).isNothing()).toBe(true);

        expect(take(0).isNothing()).toBe(false);
        expect(take('').isNothing()).toBe(false);
        expect(take([]).isNothing()).toBe(false);
        expect(take({}).isNothing()).toBe(false);
    });

    it('is something the object isn\'t null or undefined', () => {
        expect(take(0).isSomething()).toBe(true);
        expect(take('').isSomething()).toBe(true);
        expect(take([]).isSomething()).toBe(true);
        expect(take({}).isSomething()).toBe(true);

        expect(take(null).isSomething()).toBe(false);
        expect(take(undefined).isSomething()).toBe(false);
    });

    it('stops appling transformations and returns null when the object is nothing', () => {
        expect(
            take('foo')
                .then(s => s.toUpperCase())
                .then(() => undefined)
                .then(s => `Hello, ${s}`)
                .get()
        ).toBe(null);
    });

    it('can return a default if the object is nothing', () => {
        expect(take('foo').withDefault('bar')).toBe('foo');
        expect(take(null).withDefault('bar')).toBe('bar');
        expect(take('foo').then(s => s.toUpperCase()).withDefault('bar')).toBe('FOO');
        expect(take('foo').then(() => null).withDefault('bar')).toBe('bar');
    });
});
