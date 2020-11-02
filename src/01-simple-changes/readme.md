## Challenge: Typed SimpleChanges

Make a typed implementation of the `SimpleChanges` of Angular (located in `./angular.core`).
There is an example component made 

### Requirements

* <input type="checkbox"> The type `SimpleChanges<T>` should list all properties of `T` (check using intellisense)
* <input type="checkbox"> The type of such a property is a typed variant of `SimpleChange` (note the lack of a trailing `s`)
* <input type="checkbox"> This type should have `currentValue` and `previousValue` to be of the same type of the selected property (check using intellisense)
* <input type="checkbox"> The access to the property `someNonExistingProperty` should raise a compilation error
* <input type="checkbox"> (Optional) Filter out properties that are not supposed to change, such as Angular lifecycle methods

Go to [simple.changes.ts](./simple-changes.ts) to start.

### Notes

* When implementing your type, the code in `MyComponent` will most likely not compile anymore. Keep trying until it does!
* This is one of the few exercises you'd might want to use in production code
* If the requirements aren't clear, check the example below

### Example

We expect the type `SimpleChanges<SomeComponent>` (or `Actual`) to *at least* contain all properties of `Expected`.

```ts
class SomeComponent = {
  id: number;
  name: string;
};
type Actual = SimpleChanges<SomeComponent>;
type Expected = {
    id?: {
        currentValue: number;
        previousValue: number;
        firstChange: boolean;
        isFirstChange(): boolean;
    };
    name?: {
        currentValue: string;
        previousValue: string;
        firstChange: boolean;
        isFirstChange(): boolean;
    };
}
type Assert = Expected extends Actual ? true : false;
let assert: Assert = true;
```

In words: we should mutate the types of the properties of `SomeComponent` to contain the properties of Angulars `SimpleChange` where `currentValue` and `previousValue` are of the type of the original parent type.

### Solution

Check the file [simple-changes.final1.ts](./simple-changes.final1.ts) for the implementation without the optional requirements.
Check [simple-changes.final2.ts](./simple-changes.final2.ts) for a possible implementation including the optional requirements.