import { SimpleChanges as NgSimpleChanges, OnChanges } from './angular.core';

// TODO: implement this type to be better than that of Angular
export type SimpleChanges<T> = NgSimpleChanges;

// ------------------------------------------------------------------------------------------------

// Make this code compile
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

// You can use the 'component' to test your code
export class MyComponent implements OnChanges {
    public id: number = 0;
    public name: string = '';

    public ngOnChanges(changes: any) {
        // Test your code here
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
