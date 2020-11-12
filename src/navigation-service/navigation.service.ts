import { Router } from './router';

export interface INavigationService {
  // TODO implement the definition type
  navigate(...params: any[]): any;
}

export class NavigationService implements INavigationService {
  public constructor(private router: Router) { }

  public navigate(...params: any[]) {
    // TODO implement INavigationService method
    throw new Error('Method not implemented.');
  }

}

let service = new NavigationService(new Router());
service.navigate('productsDetails', { id: 54 }); // The underlying router will console.log the route
// intellisense   ^ here and          ^ here
