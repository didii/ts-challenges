## Challenge: Object options

Create a type that represents an options object for mapping purposes.
We'll want to map an object from a source type `TSource` to a destination type `TDest` and provide it with simple and custom rules when necessary.

### Requirements

* <input type="checkbox"> The options object should list all properties of `TDest`
* <input type="checkbox"> The value of each property should be a choice between the mapping options. These are:
  * <input type="checkbox"> `default`: property name of `TSource` is the same as the configured property
  * <input type="checkbox"> `ignore`: skips the mapping of the configured property
  * <input type="checkbox"> `mapFrom`: maps the given property name of `TSource` to the configured property)
    * <input type="checkbox"> Intellisense should list all properties with matching type of `TSource`
  * <input type="checkbox"> `func`: maps using the given function with `TSource` as argument and the configured property type as return type)
  * <input type="checkbox"> (Optional) Allow for nested options
* <input type="checkbox"> (Optional) Allow modular configuration for nested objects
* <input type="checkbox"> (Optional) Support for arrays

Open up [mapper-options.ts](./mapper-options.ts) to start.

### Example

From the server we get a person `PersonDto` and we'd like to map it to an internal model `Person`.

```ts
export interface PersonDto {
    id: number;
    firstName: string;
    lastName: string;
    noseShape: string;
    hairColor: ColorDto;
    eyesColor: [ColorDto, ColorDto];
}

export interface Person {
    id: number;
    fullName: string;
    nose: string;
    hair: Color;
    eyes: [Color, Color];
}

export interface ColorDto {
    red: number;
    green: number;
    blue: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}
```

Provide an options object so we can specify the following mapping without having to write it out manually:

| Destination (from `Person`) | | Source (from `PersonDto`) |
|-|:-:|-|
| `id` | <== | `id` |
| `fullName` | <== | `firstName` + `' '` + `lastName` |
| `nose` | <== | `noseShape` |
| `hair` | <== | `{ r: hairColor.red, g: hairColor.green, b: hairColor.blue }`
| `eyes` | <== | `[{r: eyesColor.red, g: eyesColor.green, ...}, ...]`

For example

```ts
let colorOptions = {
    r: { mapFrom: 'red' },
    g: { mapFrom: 'green' },
    b: { mapFrom: 'blue' },
};

let options = {
    id: 'default',
    fullName: { custom: source => source.fistName + ' ' + source.lastName },
    nose: { mapFrom: 'noseShape' },
    hair: {
        mapFrom: 'hairColor',
        options: colorOptions,
    },
    eyes: {
        mapFrom: 'eyesColor',
        options: colorOptions,
    },
};
```
