import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Type } from "./angular.core";

export class Message<T> {
  public constructor(
    public payload: T
  ) { }
}

export class Publisher {
  private subject = new Subject<InternalMessage<any>>();

  public publish<T>(message: Message<T>) {
    let msg: InternalMessage<T> = { type: message.constructor, message };
    console.log('Publishing "' + message.constructor.name + '" with payload', message.payload);
    this.subject.next(msg);
  }

  public listen<T>(type: Type<Message<T>>): Observable<Message<T>> {
    return this.subject.pipe(filter(x => x.type === type), map(x => x.message));
  }

  public close() {
    this.subject.unsubscribe();
  }
}

interface InternalMessage<T = any> {
  type: Function;
  message: Message<T>;
}

interface NameChangedPayload {
  name: string;
}
class NameChangedMessage extends Message<NameChangedPayload> {
  public constructor(payload: NameChangedPayload) {
    super(payload);
  }
}

interface FormSubmitPayload {
  firstName: string;
  lastName: string;
  phone: string;
}
class FormSubmitMessage extends Message<FormSubmitPayload> {
  public constructor(payload: FormSubmitPayload) {
    super(payload);
  }
}

let publisher = new Publisher();
publisher.listen(NameChangedMessage).subscribe(x => console.log('Name changed:', x.payload));
publisher.listen(FormSubmitMessage).subscribe(x => console.log('Form submit:', x.payload));

publisher.publish(new NameChangedMessage({ name: 'trololoo' }));
publisher.publish(new FormSubmitMessage({ firstName: 'rubber', lastName: 'duck', phone: '+32475123456' }));

publisher.close();
