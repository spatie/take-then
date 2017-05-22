export class Wrapper<T> {
    value: T

    constructor(value: T) {
        if (value === undefined) {
            this.value = null;
        } else {
            this.value = value;
        }
    }

    then<U>(mapper: (subject: T) => U): Wrapper<U> {
        if (this.isNothing()) {
            // In this case, we know `T` is null or undefined. To be able to
            // continue our pipeline while assuming a specific type, we need to
            // cast the this method's return type to `Wrapper<U>`. TypeScript won't
            // let us cast `Wrapper<T>` to `Wrapper<U>`, so we'll cast to `any` first
            // as a workaround.
            return this as any as Wrapper<U>;
        }

        return new Wrapper(mapper(this.value));
    }

    withDefault<U>(fallback: U): T | U {
        if (this.isNothing()) {
            return fallback;
        }

        return this.value;
    }

    isSomething(): boolean {
        return this.value !== null;
    }

    isNothing(): boolean {
        return ! this.isSomething();
    }

    get(): T {
        return this.value;
    }

    log(message: string | null = null): Wrapper<T> {
        if (message) {
            console.log(this.message, this.value);
        } else {
            console.log(this.value);
        }
        return this;
    }
}

export default <T>(subject: T) => new Wrapper(subject);
