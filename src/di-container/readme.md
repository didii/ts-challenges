## Challenge: Dependency Injection container

Try to make a simple Dependency Injection Container.
Use the file [di-container.ts](./di-container.ts) for your own implementation.
A spec file is added so you can validate your changes.

### Requirements

* <input type="checkbox"> The method register accepts a plain type
* <input type="checkbox"> The method resolve resolves any registered service to a concrete type
* <input type="checkbox"> Refrain from using a symbol or plain string as identifier
* <input type="checkbox"> Allow resolving using a factory function
* <input type="checkbox"> Allow resolving using a given value
* <input type="checkbox"> Allow resolving using another/substitute type

### Notes

* I've explicitly not given the requirement to fetch dependent services, that is a LOT harder and requires type-information at runtime
* You can test the code using the `describe`/`it` methods, run `npm start test` to start testing
* There are simple test services defined for you in `./services.ts`
* Don't forget to set the variable `TEST` to `true` if you want to validate your implementation against the requirements
* Note that resolving nested services are a LOT harder and are out of scope for this challenge

### Solution

Check the file [./di-container.final.ts](./di-container.final.ts).
I used the same conventions as Angular with `useFactory`, `useValue`, etc.