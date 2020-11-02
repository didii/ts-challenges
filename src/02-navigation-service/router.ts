/** An object that allows easy building of query parameters */
export class QueryParams {
  private params: { [name: string]: string } = {};

  /** Does this object have any params? */
  public get any(): boolean {
    return Object.keys(this.params).length > 0;
  }

  /** The params as a string, does not contain a leading '?' */
  public get paramsString(): string {
    let result = '';
    for (let key in this.params) {
      result += encodeURIComponent(key) + '=' + encodeURIComponent(this.params[key]) + '&';
    }
    return result.substr(0, result.length - 1);
  }

  /** Set a single query param value. Don't provide value to remove it */
  public set(name: string, value?: string): QueryParams {
    if (value) {
      this.params[name] = value;
    } else {
      delete this.params[name];
    }
    return this;
  }
}

/** A router class defined by a generic framework */
export class Router {
  /** Navigate to the given url with optional query parameters. This one will only output the route to the console. */
  public navigateByUrl(route: string, params?: QueryParams): Promise<boolean> {
    let fullRoute = 'https://localhost/' + route;
    if (params?.any === true) {
      fullRoute += '?' + params.paramsString;
    }
    console.log('Navigated to: ' + fullRoute);
    return Promise.resolve(true);
  }
}
