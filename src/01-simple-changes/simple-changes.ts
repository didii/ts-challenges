import { SimpleChanges as NgSimpleChanges } from '@angular/core';
import { MyComponent } from './my-component';

// TODO: implement this type to be better than that of Angular
export type SimpleChanges<T> = NgSimpleChanges;

// A simple interface to auto-implement the method
export interface OnChanges {
    ngOnChanges(changes: SimpleChanges<this>): void;
}

// TODO: make this code compile
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
