## Challenge: Publisher and listener

Try to make a simple message publisher where you can listen for any message based on its type.
Use the fact that classes exist at runtime to filter the correct messages.

### Requirements

* <input type="checkbox"> The method publish accepts any object type
* <input type="checkbox"> The method listen returns an observable that will only emit if an event of the given object type was published
* <input type="checkbox"> Refrain from using a symbol or plain string to identify message types

### Notes

* There are hidden properties on every object ;)

### Solution

Check the file [./publisher.final.ts](./publisher.final.ts).
