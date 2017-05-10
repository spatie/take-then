class Pipe<T> {
    value: T

    constructor(value: T) {
        this.value = value;
    }

    through<U>(mapper: (subject: T) => U): Pipe<U> {
        if (this.isNothing()) {
            // In this case, we know `T` is null or undefined. To be able to
            // continue our pipeline while assuming a specific type, we need to
            // cast the this method's return type to `Pipe<U>`. TypeScript won't
            // let us cast `Pipe<T>` to `Pipe<U>`, so we'll cast to `any` first
            // as a workaround.
            return this as any as Pipe<U>;
        }

        return new Pipe(mapper(this.value));
    }

    withDefault<U>(fallback: U): T | U {
        if (this.isNothing()) {
            return fallback;
        }

        return this.value;
    }

    isSomething(): boolean {
        return this.value !== null && this.value !== undefined;
    }

    isNothing(): boolean {
        return ! this.isSomething();
    }

    get(): T {
        return this.value;
    }

    log(): Pipe<T> {
        console.log(this.value);
        return this;
    }
}

const pipe = <T>(subject: T) => new Pipe(subject);

export default pipe;