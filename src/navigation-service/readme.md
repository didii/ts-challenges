## Challenge: Navigation service

Create a service that is an abstraction around a navigation service and that provides a compile-time safe way to provide data for each route such.

### Requirements

* <input type="checkbox"> The service should have a `navigate` method that accepts a string as first argument and an object as second.
* <input type="checkbox"> The first argument represents a route by name, it should be a limited list where non-existing routes won't compile.
* <input type="checkbox"> The second argument is dependent on the first: for routes that require parameters, they must be provided here. Specifying the wrongly spelled names, wrong type or forgetting required ones will throw a compiler error.
* <input type="checkbox"> Implement the `navigate` method to property navigate the browser to the correct page which is also entirely type-safe

You can create your own routing if you want.
Otherwise you can use this routing structure:

* `/products`
  * Shows a list of products, with optional query params such as `query`, `pricemin`, `pricemax`, `orderby`, ...
* `/products/:id`
  * Shows details of a single product
* `/products/compare/:ids`
  * Compares a couple of products (`:ids` is a ';'-separated list of ids)

Go to [navigation.services.ts](navigation.services.ts) to start.

### Notes

* If you do it the same way I did, VSCodes auto-complete won't correctly suggest properties on the data object. All properties of all routes will be shown. TypeScript will still correctly fail the compile.
* It's debatable if you'd want this in production code. When routes are properly split up between modules, this gets a lot more tricky to implement properly and the extra effort might not be worth it
