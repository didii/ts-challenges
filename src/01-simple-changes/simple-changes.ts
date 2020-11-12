import { SimpleChanges as NgSimpleChanges, OnChanges, SimpleChange } from './angular.core';

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
let assert: Assert = false;

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
    id: new SimpleChange(0, 75, true),
});

comp.id = 999;
comp.name = 'duck';
comp.ngOnChanges({
    id: new SimpleChange(75, 999, false,),
    name: new SimpleChange('', 'duck', true),
});
