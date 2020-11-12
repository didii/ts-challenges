import { QueryParams, Router } from './router';

// Represent parameter list as an array and define every 'overload' this way
type NamedRoutes =
  | ['productsOverview'] // /products
  | ['productsOverview', { query?: string, priceMin?: number, priceMax?: number, orderby?: string }] // /products
  | ['productsDetails', { id: number }] // /products/:id
  | ['productsCompare', { ids: number[] }]; // /products/compare/:ids

export interface INavigationService {
  // Simply spread the parameter array
  navigate(...params: NamedRoutes): Promise<boolean>
}

export class NavigationService implements INavigationService {
  // Use the router from ./router
  public constructor(private router: Router) { }

  public navigate(...params: NamedRoutes): Promise<boolean> {
    // Note that you cannot use 'let [name, data] = params;' since that would sever the link between them
    // Use a switch on the first parameter
    switch (params[0]) {
      case 'productsDetails':
        // TS now nows that params[1] is of type { id: number }
        return this.router.navigateByUrl('products/' + params[1].id);
      case 'productsOverview':
        let data = params[1];
        let queryParams = new QueryParams()
          .set('query', data?.query)
          .set('pricemin', data?.priceMin?.toPrecision(2))
          .set('pricemax', data?.priceMax?.toPrecision(2))
          .set('orderby', data?.orderby);
        return this.router.navigateByUrl('products', queryParams);
      case 'productsCompare':
        return this.router.navigateByUrl('products/compare/' + params[1].ids.join(';'));
    }
  }

}

// Check console for routes
let service = new NavigationService(new Router());
service.navigate('productsOverview');
service.navigate('productsOverview', { query: 'rubber duck', priceMin: 45, orderby: 'recommended' });
service.navigate('productsDetails', { id: 66 });
service.navigate('productsDetails', { id: 54 });
service.navigate('productsDetails', { id: 994 });
service.navigate('productsCompare', { ids: [66, 54, 994] });
// intellisense   ^ here and          ^ here
