// let befores: (() => void)[] = [];
// let summary = {
//   success: 0,
//   fails: 0,
// };

export function describe(name: string, func: () => void) {
  console.log('>>> ' + name + ' <<<');
  func();
  // console.log('Test count:  ' + (summary.success + summary.fails));
  // console.log('Test passes: ' + summary.success);
  // console.log('Test fails:  ' + summary.fails);
}

export function beforeEach(func: () => void) {
  // befores.push(func);
}

export function it(name: string, func: () => void) {
  try {
    // befores.forEach(func => func());
    func();
  }
  catch (error) {
    console.warn(`~ ${name}: FAILED`);
    console.error(error);
    // summary.fails++;
    return;
  }
  console.log(`~ ${name}: Pass`);
  // summary.success++;
}

class Matcher<T> {
  public constructor(public value: T) {
  }

  public toBeTruthy(): void {
    if (!!this.value) return;
    throw Error();
  }
  public toBeFalsy(): void {
    if (!this.value) return;
    throw Error();
  }
  public toBe(value: T): void {
    if (this.value === value) return;
    throw Error();
  }
}

export function expect<T>(value: T): Matcher<T> {
  return new Matcher(value);
}
