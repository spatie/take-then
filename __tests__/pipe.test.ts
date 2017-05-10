import pipe from '../src';

describe('pipe', () => {

    it('can wrap an object in a pipe', () => {
        expect(pipe('foo').get()).toBe('foo');
    });
});