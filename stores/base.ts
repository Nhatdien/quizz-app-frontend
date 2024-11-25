import { Client } from "@stomp/stompjs";

export type Config = {
  base_url: string;
  websocket_url?: string;
  access_token?: string;
  client_id?: string;
};

export abstract class Base {
  public loading: boolean = false;

  public error: string = "";

  public config: Config = {
    base_url: "",
    websocket_url: "",
    access_token: "",
    client_id: "",
  };
  
  constructor(config: Config) {
    this.config = config;
  }

  private static wsClientInstance: Client;

  public get webSocketClient(): Client {
    if (!Base.wsClientInstance) {
      Base.wsClientInstance = new Client({
        brokerURL: `${this.config.websocket_url!}/quiz-room`,
        reconnectDelay: 5000,
        connectHeaders: {
          Authorization: this.config.access_token as string,
        },
      });
    }
    return Base.wsClientInstance;
  }

  public onLoading = (loading: boolean, callback = (): void => {}): void => {
    this.loading = loading;
    callback();
  };

  public onResponse = (callback = (): void => {}): void => {
    callback();
  };

  public onError = (error: Error, callback = (): void => {}): void => {
    this.error = error.message;
    callback();
  };

  protected async fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    this.onLoading(true);

    // Add default headers
    const defaultProperty: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: this.config.access_token
          ? `Bearer ${this.config.access_token}`
          : "",
      },
      ...init,
    };

    // Merge default headers with any headers passed in init

    return new Promise((resolve, reject) => {
      fetch(input, defaultProperty)
        .then((response: Response) => {
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
        });
    });
  }
}
