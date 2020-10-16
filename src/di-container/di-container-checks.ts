import { DiContainer } from './di-container';
import { MyFirstService, MySecondService, MyThirdService, HeroService, SuperService, SuperVariantService1 } from './services';
import { describe, beforeEach, it, expect } from '../lib/test';

describe('DI-container', () => {
    let container: DiContainer;

    beforeEach(() => {
        container = new DiContainer();
    });

    it('should resolve simple service', () => {
        container.register(MyFirstService);

        let myFirstService = container.resolve(MyFirstService);
        expect(myFirstService).toBeTruthy();
        expect(myFirstService!.myUniqueAndVerySpecialVariable).toBe('trololo');
    });

    it('should resolve correct service', () => {
        container.register(MyFirstService);
        container.register(MySecondService);
        container.register(MyThirdService);

        let secondService = container.resolve(MySecondService);
        let firstService = container.resolve(MyFirstService);

        expect((secondService as Object).constructor).toBe(MySecondService);
        expect((firstService as Object).constructor).toBe(MyFirstService);
    });

    it('should resolve another service by type', () => {
        container.register({ type: SuperService, useType: SuperVariantService1 });

        let superService = container.resolve(SuperService);
        expect(superService).toBeTruthy();
        expect(superService!.isSuper).toBe(true);
        expect(superService!.name).toBe('SUPAAAH');
    });

    it('should resolve using a factory', () => {
        container.register({ type: HeroService, useFactory: () => new HeroService('myHero') });

        let heroService = container.resolve(HeroService);
        expect(heroService).toBeTruthy();
        expect(heroService!.name).toBe('myHero');
    });

    it('should resolve using a value', () => {
        container.register({ type: HeroService, useValue: new HeroService('notMyHero') });

        let heroService = container.resolve(HeroService);
        expect(heroService).toBeTruthy();
        expect(heroService!.name).toBe('notMyHero');
    });
});
