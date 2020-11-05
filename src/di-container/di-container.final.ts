import { Type } from "./angular.core";

/**
 * Helper interface for our registrations to allow registrations using factories or values.
 */
export interface Registration<T> {
    type: Type<T>;
    useType?: Type<any>;
    useFactory?: () => any;
    useValue?: any;
}

/** Our pretty container */
export class DiContainer {
    /** Keep a list of all our registrations */
    private _registrations: Registration<any>[] = [];

    /** Registers the given type */
    public register<T>(type: Type<T> | Registration<T>) {
        let registration: Registration<T>;
        // If the argument is a function, then it is Type<T>, so convert to a Registration
        if (typeof type === 'function') {
            registration = {
                type: type,
                useType: type,
            };
        } else {
            // Else, just use what the user provided us
            registration = type;
        }

        // Into the list!
        this._registrations.push(registration);
    }

    /** Resolves the given type */
    public resolve<T>(type: Type<T>): T | undefined {
        // Find the given registration based on the type
        let registration: Registration<T> | undefined = this._registrations.find(r => r.type === type);

        // Error when nothing was found
        if (!registration)
            throw Error(`No type ${type.name} registered`);

        // When type: use new
        if (registration.useType)
            return new registration.useType();
        // When factory: execute
        else if (registration.useFactory)
            return registration.useFactory();
        // When value: return value
        else if (registration.useValue)
            return registration.useValue;
        // When none, return undefined
        return;
    }
}
