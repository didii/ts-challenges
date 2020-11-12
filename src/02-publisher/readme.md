## Challenge: Publisher and listener

Try to make a simple message publisher where you can listen for any message based on its type.
Use the fact that classes exist at runtime to filter the correct messages.

### Requirements

* <input type="checkbox"> The method publish accepts any object type
* <input type="checkbox"> The method listen returns an observable of the message type that will only emit if an event of the given object type was published
* <input type="checkbox"> Refrain from using a symbol or plain string to identify message types

### Notes

* There are hidden properties on every object ;)

### Example

We want the publish/listen methods to be as easy as possible for consumers.
This is how we want to use this publisher:

```ts
class NameChangedMessage { /* ... */ }
class FormSubmitMessage { /* ... */ }

let publisher = new Publisher();
// Listen to the message type NameChangedMessage
publisher.listen(NameChangedMessage)
  .subscribe(x => console.log('Name changed:', x));
// Listen to the message type FormSubmitMessage
publisher.listen(FormSubmitMessage)
  .subscribe(x => console.log('Form submit firstName:', x.firstName));
//                                                        ^ auto-complete

// Publish a couple of messages
publisher.publish(new NameChangedMessage({ name: 'trololoo' }));
publisher.publish(new FormSubmitMessage({ firstName: 'rubber', lastName: 'duck', phone: '+32475123456' }));
```
