export type Config = {
  base_url: string;
  access_token?: string;
  client_id?: string;
};

export abstract class Base {
  public loading: boolean = false;

  public error: string = "";

  constructor(public config: Config) {
    this.config = config;
  }

  public onLoading = (loading: boolean, callback = (): void => {}): void => {
    this.loading = loading;
    callback();
  };

  public onResponse = (response: Response, callback = (): void => {}): void => {
    callback();
  };

  public onError = (error: Error, callback = (): void => {}): void => {
    this.error = error.message;
    callback();
  };

  protected async fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    this.onLoading(true);

    // Add default headers
    const defaultHeaders = {
      "Content-Type": "application/json",
      "Authorization": this.config.access_token
        ? `Bearer ${this.config.access_token}`
        : ""
    };

    // Merge default headers with any headers passed in init
    const headers = {
      ...defaultHeaders,
      ...init?.headers,
    };

    return new Promise((resolve, reject) => {
      fetch(input, { ...init, ...headers })
        .then((response: Response) => {
          this.onResponse(response);

          if (response.status !== 200) {
            if (response.status === 401) {
              throw new Error("Unauthorized");
            } else {
              throw new Error(`Something went wrong ${response.status}`);
            }
          }
          return response.json();
        })
        .then((data) => {
          this.onLoading(false);
          resolve(data);
        })
        .catch((error) => {
          this.onError(error);
          this.onLoading(false);
          reject(error);
        })
    });
  }
}
