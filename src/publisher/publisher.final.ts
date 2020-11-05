import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Type } from './angular.core';

/** A typed event publisher */
export class Publisher {
  private subject = new Subject<any>();

  /** Publishes a message of type T */
  public publish<T extends Object>(message: T) {
    console.log('Publishing "' + message.constructor.name + '" with payload', message);
    this.subject.next(message);
  }

  /** Listens to all messages of a certain type */
  public listen<T extends Object>(type: Type<T>): Observable<T> {
    return this.subject.pipe(filter(x => x.constructor === type));
  }

  /** Closes all listeners, the publisher cannot be used anymore after this is called */
  public close() {
    this.subject.complete();
  }
}

// ------------------------------------------------------------------------------------------------

class NameChangedMessage {
  public constructor(init: NameChangedMessage) {
    Object.assign(this, init);
  }

  public name!: string;
}

class FormSubmitMessage {
  public constructor(init: FormSubmitMessage) {
    Object.assign(this, init);
  }

  public firstName!: string;
  public lastName!: string;
  public phone!: string;
}

let publisher = new Publisher();
publisher.listen(NameChangedMessage).subscribe(x => console.log('Name changed:', x));
publisher.listen(FormSubmitMessage).subscribe(x => console.log('Form submit:', x));

publisher.publish(new NameChangedMessage({ name: 'trololoo' }));
publisher.publish(new NameChangedMessage({ name: 'tralalaa' }));
publisher.publish(new FormSubmitMessage({ firstName: 'rubber', lastName: 'duck', phone: '+32475123456' }));
publisher.publish({ firstName: 'rubber', lastName: 'duck', phone: '+32475123456' });

publisher.close();
