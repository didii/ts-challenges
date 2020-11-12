import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export class Publisher {
  private subject = new Subject<any>();

  public publish(message: any): void {
    // TODO: implement
  }

  public listen(type: any): Observable<any> {
    // TODO: implement the filter
    return this.subject.pipe(filter(x => true));
  }

  public close(): void {
    this.subject.unsubscribe();
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
publisher.listen(FormSubmitMessage).subscribe(x => console.log('Form submit firstName:', x.firstName));
//                                                                                         ^ auto-complete

publisher.publish(new NameChangedMessage({ name: 'trololoo' }));
publisher.publish(new FormSubmitMessage({ firstName: 'rubber', lastName: 'duck', phone: '+32475123456' }));

publisher.close();
