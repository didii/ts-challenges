import { OnInit, OnDestroy, OnChanges, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from 'src/01-simple-changes/angular.core';

/**
 * An alias for all Angular lifecycle methods
 */
type AngularLifecycleMethods =
    | keyof OnInit
    | keyof OnDestroy
    | keyof OnChanges
    | keyof AfterViewInit
    | keyof AfterViewChecked
    | keyof AfterContentInit
    | keyof AfterContentChecked;

/**
 * Utility type to filter keys out: take the keys of T without the ones defined in TProp
 * @example
 * interface MyType {
 *     prop1: number;
 *     prop2: string;
 *     prop3: Date;
 *     prop4: boolean;
 * };
 * type FilteredKeys = KeyOfExcept<MyType, 'prop1' | 'prop3'>; //= 'prop2' | 'prop4'
 */
type KeyOfExcept<T, TProp extends string> = {
    // Take all keys
                    // When K is in TProp: Choose type never, else the property name K
                    //    this gives us the object (see example) { prop1: never, prop2: 'prop2', prop3: never, prop4: 'prop4' }
    [K in keyof T]: K extends TProp ? never : K;
}[keyof T];
// Then select and combine all properties of T (i.e. concat all types)
//    this gives (see example) (never | 'prop2' | never | 'prop4') = ('prop2' | 'prop4')

/**
 * Sub-type of SimpleChanges to denote changes to a single property
 */
export type SimpleChange<T> = {
    previousValue: T; // T instead of any
    currentValue: T;  // T instead of any
    firstChange: boolean;
    isFirstChange(): boolean;
};

/**
 * The type we need want to see, where Angular lifecycle methods are filtered out
 * @example
 * class MyComponent {
 *     ngOnChanges(changes: SimpleChanges<MyComponent>) {
 *         // some logic...
 *         //if (changes.ngOnChanges) {} //<- compiler error!
 *     }
 * }
 */
export type SimpleChanges<T> = Partial<{
    // Take all keys of T, except those of lifecycle methods
                                                    // Change their type to SimpleChange<T[K]>
                                                    //    where T[K] is the type of property K from T
    [K in KeyOfExcept<T, AngularLifecycleMethods>]: SimpleChange<T[K]>;
}>;

// ------------------------------------------------------------------------------------------------

type Actual = SimpleChanges<MyComponent>;
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

// ------------------------------------------------------------------------------------------------

export class MyComponent implements OnChanges {
    public id: number = 0;
    public name: string = '';

    public ngOnChanges(changes: SimpleChanges<MyComponent>) {
        if (changes.id) {
            console.log('Id changed from ' + changes.id.previousValue.toExponential(2)
                + ' to ' + changes.id.currentValue.toExponential(2));
        }
        if (changes.name) {
            console.log('Name changed from length ' + changes.name.previousValue.length
                + ' to ' + changes.name.currentValue.length);
        }
    }
}

let comp = new MyComponent();
comp.id = 75;
comp.ngOnChanges({
    id: {
        currentValue: 75,
        previousValue: 0,
        firstChange: true,
        isFirstChange() { return true; },
    },
});

comp.id = 999;
comp.name = 'duck';
comp.ngOnChanges({
    id: {
        currentValue: 999,
        previousValue: 75,
        firstChange: false,
        isFirstChange() { return false; },
    },
    name: {
        currentValue: 'duck',
        previousValue: '',
        firstChange: true,
        isFirstChange() { return true; },
    },
});
