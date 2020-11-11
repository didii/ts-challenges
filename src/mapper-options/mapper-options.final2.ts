import { PersonDto, Person, ColorDto, Color } from './person';

/** The options object we want */
type MapperOptions<TSource, TDest> = {
    // Modify all properties to be of type MapperPropertyOption using the property type, source type and destination type as parameters
    [K in keyof TDest]: MapperPropertyOption<TDest[K], TSource, TDest>;
};

/** Every option is one of these defined ones */
type MapperPropertyOption<TDestProp, TSource, TDest> = 'default'
    | 'ignore'
    | MapperPropertyMapFromOption<TDestProp, TSource, TDest>
    | MapperPropertyFunctionOption<TDestProp, TSource, TDest>
    | MapperPropertyOptionsOption<TDestProp, TSource, TDest>;

/** Given the property `mapFrom`, it requires a property name of the correct type */
type MapperPropertyMapFromOption<TDestProp, TSource, TDest> = {
    mapFrom: PropertiesOfType<TSource, TDestProp>;
};

/** Gets all properties of type `T` that are of type `TProp` */
type PropertiesOfType<T, TProp> = {
    // Select all properties and set their value type as their property name when the type is correct, otherwise as never
    [K in keyof T]: T[K] extends TProp ? K : never;
}[keyof T]; // Then keep only the value types which removes the never types

/** Given the property `func`, it requires a function that accepts the source type and must return the destination type */
type MapperPropertyFunctionOption<TDestProp, TSource, TDest> = {
    func: (source: TSource) => TDestProp;
};    

/** Given the property `options`, allow  */
type MapperPropertyOptionsOption<TDestProp, TSource, TDest> = {
    options: {
        [K in keyof TSource]?: MapperOptions<TSource[K], TDestProp>
    },
};    


/** A simple mapper class adhering to the given options rule */
abstract class Mapper<TSource, TDest> {
    /** Provide your options here */
    public abstract options: MapperOptions<TSource, TDest>;

    /** Maps the given object to the destination type */
    public map(source: TSource): TDest {
        return this.mapWithOptions(source, this.options);
    }

    /** Does the actual mapping, but generic to allow nesting */
    protected mapWithOptions<TFrom, TTo>(source: TFrom, options: MapperOptions<TFrom, TTo>): TTo {
        let result: Partial<TTo> = {};
        for (let prop in options) {
            let propOption = options[prop];
            if (this.isDefault(propOption)) {
                result[prop] = (source as any)[prop];
            } else if (this.isMapFrom(propOption)) {
                result[prop] = (source as any)[propOption.mapFrom];
            } else if (this.isCustom(propOption)) {
                result[prop] = propOption.func(source);
            } else if (this.isOption(propOption)) {
                // TODO: make this work somehow!
                result[prop] = this.mapWithOptions((source as any)[prop], propOption as any);
            }
        }
        return result as TTo;
    }

    /** Simple discriminator function to determine if `option` is of type `'default'` */
    private isDefault<TProp, TFrom, TTo>(option: MapperPropertyOption<TProp, TFrom, TTo>): option is 'default' {
        return option === 'default';
    }
    /** Simple discriminator function to determine if `option` is of type `MapperPropertyMapFromOption` */
    private isMapFrom<TProp, TFrom, TTo>(option: MapperPropertyOption<TProp, TFrom, TTo>): option is MapperPropertyMapFromOption<TProp, TFrom, TTo> {
        return typeof option === 'object' && option.hasOwnProperty('mapFrom');
    }
    /** Simple discriminator function to determine if `option` is of type `MapperPropertyFunctionOption` */
    private isCustom<TProp, TFrom, TTo>(option: MapperPropertyOption<TProp, TFrom, TTo>): option is MapperPropertyFunctionOption<TProp, TFrom, TTo> {
        return typeof option === 'object' && option.hasOwnProperty('func');
    }
    /** Simple discriminator function to determine if `option` is of type `MapperPropertyOptionsOption` */
    private isOption<TProp, TFrom, TTo>(option: MapperPropertyOption<TProp, TFrom, TTo>): option is MapperPropertyOptionsOption<TProp, TFrom, TTo> {
        return typeof option === 'object' && option.hasOwnProperty('options');
    }
}

/** Maps a `ColorDto` to a `Color` */
class ColorMapper extends Mapper<ColorDto, Color> {
    public static options: MapperOptions<ColorDto, Color> = {
        r: { mapFrom: 'red' },
        g: { mapFrom: 'green' },
        b: { mapFrom: 'blue' },
    };

    public options = ColorMapper.options;
}

/** Maps a `PersonDto` to a `Person` */
class PersonMapper extends Mapper<PersonDto, Person> {
    public static options: MapperOptions<PersonDto, Person> = {
        id: 'default',
        fullName: { func: (source) => `${source.firstName} ${source.lastName}` },
        nose: { mapFrom: 'noseShape' },
        hair: { options: { hairColor: ColorMapper.options } },
        eyes: 'ignore',
    };

    public options = PersonMapper.options;
}


// Create a DTO, then map it using our PersonMapper
console.log('Options', PersonMapper.options);
let dto: PersonDto = {
    eyesColor: [{red: 5, blue: 10, green: 22}, {red: 5, blue: 10, green: 22}],
    firstName: 'didii',
    hairColor: {red: 0, blue: 23, green: 12},
    id: 37,
    lastName: 'vb',
    noseShape: 'sharp',
};
console.log('DTO', dto);

let personMapper = new PersonMapper();
let result = personMapper.map(dto);
console.log('Mapped', result);
