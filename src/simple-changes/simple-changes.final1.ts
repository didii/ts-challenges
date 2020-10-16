/*************
 * First proper implementation of typed SimpleChanges. This adheres to every requirement.
 */

import { MyComponent } from './my-component';
import { describe } from '@test';

describe('test', () => {
    console.log('yay?');
});

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
 * The type we need want to see
 * @example
 * class MyComponent {
 *     ngOnChanges(changes: SimpleChanges<MyComponent>) {
 *         // some logic...
 *     }
 * }
 */
export type SimpleChanges<T> = {
    // Take all keys of T and make them optional (?)
    // The type of any such property is of type SimpleChange<T[K]>
    //    where T[K] the type of property K represents
    [K in keyof T]?: SimpleChange<T[K]>;
};


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