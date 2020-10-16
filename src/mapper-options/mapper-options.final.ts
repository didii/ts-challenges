import { PersonDto, Person } from "./person";

/** The options object we want */
type MapperOptions<TSource, TDest> = {
    // Modify all properties to be of type MapperPropertyOption using the property type, source type and destination type as parameters
    [K in keyof TDest]: MapperPropertyOption<TDest[K], TSource, TDest>;
};

/** Every option is one of these defined ones */
type MapperPropertyOption<TDestProp, TSource, TDest> = 'default'
    | 'ignore'
    | MapperPropertyMapFromOption<TDestProp, TSource, TDest>
    | MapperPropertyFunctionOption<TDestProp, TSource, TDest>;

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

/** A simple mapper class adhering to the given options rule */
abstract class Mapper<TSource, TDest> {
    /** Provide your options here */
    public abstract options: MapperOptions<TSource, TDest>;

    /** Maps the given object to the destination type */
    public map(source: TSource): TDest {
        let result: Partial<TDest> = {};
        for (let prop in this.options) {
            let option = this.options[prop];
            if (this.isDefault(option)) {
                result[prop] = (source as any)[prop];
            } else if (this.isMapFrom(option)) {
                result[prop] = (source as any)[option.mapFrom];
            } else if (this.isCustom(option)) {
                result[prop] = option.func(source);
            }
        }
        return result as TDest;
    }

    /** Simple discriminator function to determine if `option` is of type `'default'` */
    private isDefault<TProp>(option: MapperPropertyOption<TProp, TSource, TDest>): option is 'default' {
        return option === 'default';
    }
    /** Simple discriminator function to determine if `option` is of type `MapperPropertyMapFromOption` */
    private isMapFrom<TProp>(option: MapperPropertyOption<TProp, TSource, TDest>): option is MapperPropertyMapFromOption<TProp, TSource, TDest> {
        return typeof option === 'object' && option.hasOwnProperty('mapFrom');
    }
    /** Simple discriminator function to determine if `option` is of type `MapperPropertyFunctionOption` */
    private isCustom<TProp>(option: MapperPropertyOption<TProp, TSource, TDest>): option is MapperPropertyFunctionOption<TProp, TSource, TDest> {
        return typeof option === 'object' && option.hasOwnProperty('func');
    }
}

/** Maps a `PersonDto` to a `Person` */
class PersonMapper extends Mapper<PersonDto, Person> {
    public options: MapperOptions<PersonDto, Person> = {
        id: 'default',
        fullName: { func: (source) => `${source.firstName} ${source.lastName}` },
        nose: { mapFrom: 'noseShape' },
        eyes: 'ignore',
        hair: 'ignore',
    };
}
