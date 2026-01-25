// Class decorator factory
function Component(id: number) {
    console.log('Component decorator executed');

    return <T extends new (...args: any[]) => object>(
        target: T,
        context: ClassDecoratorContext
    ) => {
        target.prototype.componentId = id;
        console.log(`Component decorator applied to: ${String(context.name)} ${id}`);
        return target;
    };
}

// Class decorator factory
function Logger() {
    console.log('Logger decorator executed');

    return <T extends new (...args: any[]) => object>(
        target: T,
        context: ClassDecoratorContext
    ) => {
        console.log(`Logger decorator applied to: ${String(context.name)}`);
        return target;
    };
}

// Method decorator
function Method<T>(
    _target: (this: T, ...args: any[]) => any,
    context: ClassMethodDecoratorContext
) {
    console.log('Method decorator executed');
    console.log(`Method decorator applied to: ${String(context.name)}`);

    return function (this: T, ...args: any[]): number {
        console.log(`Method ${String(context.name)} is called with args: ${args}`);
        return args[0] * 10;
    };
}

// Accessor field decorator (intercepts get/set)
function PropAccessor<T, V>(
    target: ClassAccessorDecoratorTarget<T, V>,
    context: ClassAccessorDecoratorContext<T, V>
): ClassAccessorDecoratorResult<T, V> {
    console.log('PropAccessor decorator executed');
    console.log(`PropAccessor applied to: ${String(context.name)}`);

    return {
        get(this: T): V {
            const value = target.get.call(this);
            console.log(`Getting ${String(context.name)}: ${value}`);
            return value;
        },
        set(this: T, newVal: V) {
            console.log(`Setting ${String(context.name)} to: ${newVal}`);
            target.set.call(this, newVal);
        },
    };
}

// Regular field decorator (initialization only)
function PropField<T, V>(
    _target: undefined,
    context: ClassFieldDecoratorContext<T, V>
): (initialValue: V) => V {
    console.log('PropField decorator executed');
    console.log(`PropField applied to: ${String(context.name)}`);

    return function (initialValue: V): V {
        console.log(`Initializing ${String(context.name)} with: ${initialValue}`);
        return initialValue;
    };
}

@Logger()
@Component(1)
export class User {
    @PropField id: number = 0;
    @PropAccessor accessor name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    @Method
    updateId(newId: number): number {
        this.id = newId;
        return this.id;
    }
}

console.log('\n=== Creating User ===');
const user = new User(1, 'John');

console.log('\n=== Reading fields ===');
console.log('user.id:', user.id);
console.log('user.name:', user.name);

console.log('\n=== Writing fields ===');
user.id = 10;
user.name = 'Jane';

console.log('\n=== Calling method ===');
console.log('updateId(5):', user.updateId(5));
