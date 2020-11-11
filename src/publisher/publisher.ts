import { Observable, Subject } from 'rxjs';
import { Type } from './angular.core';

export interface IPublisher {
  publish(message: any): void;
  listen(type: any): Observable<any>;
}

export class Publisher implements IPublisher {
  private subject = new Subject<any>();

  public publish(message: any): void {
    // TODO: implement
  }

  public listen(type: any): Observable<any> {
    // TODO: implement
    throw Error('Not implemented');
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
