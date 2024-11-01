export type Config = {
  base_url: string;
  ws_url: string;
};

export abstract class Base {
  public loading: boolean = false;

  public error: string = "";

  constructor(public config: Config) {
    this.config = config;
  }

  public setLoading = (loading: boolean): void => {
    this.loading = loading;
  };

  public setError = (error: string): void => {
    this.error = error;
  };

  protected async fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    this.setLoading(true);
    return new Promise((resolve, reject) => {
      fetch(input, init)
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            throw new Error("Error fetching data");
          }
          return response.json();
        })
        .then((data) => {
          this.setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          this.setError(error.message);
          this.setLoading(false);
          reject(error);
        });
    });
  }
}
