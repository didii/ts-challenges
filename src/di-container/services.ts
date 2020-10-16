export class MyFirstService {
  public myUniqueAndVerySpecialVariable: string = 'trololo';
}

export class MySecondService { }

export class MyThirdService { }

export class HeroService {
  public constructor(public name: string) { }
}

export class SuperService {
  public isSuper: boolean = true;
  public name: string = 'SUPAH';
}
export class SuperVariantService1 extends SuperService {
  public name: string = 'SUPAAAH';
}
export class SuperVariantService2 extends SuperService {
  public name: string = 'SUUUUUUUPAH';
}
