/*************
 * Similar to the final1 version, but this also filters out angular lifecycle methods out of the list of possible properties.
 */

import { OnInit, OnDestroy, OnChanges, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
import { MyComponent } from './my-component';

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