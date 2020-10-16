import { PersonDto, Person } from './person';

// TODO: implement type
type MapperOptions<TSource, TDest> = {};

// TODO: have intellisense show up here
let personMapperOptions: MapperOptions<PersonDto, Person> = {
    id: 'default',
    name: { custom: (source: PersonDto) => `${source.lastName} ${source.firstName}` },
    email: { mapFrom: 'emailAddress' },
};
