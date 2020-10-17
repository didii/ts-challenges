import { OnChanges } from "./angular.core";

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
