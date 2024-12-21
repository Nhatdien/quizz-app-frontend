import { Client } from "@stomp/stompjs";
import type { IFrame, ActivationState } from "@stomp/stompjs";
import { useToast } from "@/components/ui/toast/use-toast";

export type Config = {
  base_url: string;
  base_frontend_url?: string;
  current_username?: string;
  websocket_url?: string;
  access_token?: string;
  client_id?: string;
};

export abstract class Base {
  public loading: boolean = false;

  public error: string = "";

  public config: Config = {
    base_url: "",
    current_username: "",
    base_frontend_url: "",
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

  public set webSocketClient(config: Config) {
    if (Base.wsClientInstance) {
      Base.wsClientInstance.deactivate();
    }
    Base.wsClientInstance = new Client({
      brokerURL: `${config.websocket_url!}/quiz-room`,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: config.access_token as string,
      },
    });

    Base.wsClientInstance.onConnect = (frame: IFrame) => {
      console.log("Connected to websocket", frame);
    };

    Base.wsClientInstance.onStompError = (frame: IFrame) => {
      console.error("Error", frame);
    };

    Base.wsClientInstance.onChangeState = (state: ActivationState) => {
      console.log("State", state);
    };

    Base.wsClientInstance.onWebSocketError = (event: Event) => {
      console.error("Websocket error", event);
      Base.wsClientInstance.deactivate();
    };
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
    console.error(error);
    callback();
  };

  protected async fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    // Add default headers
    const defaultProperty: RequestInit = {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.config.access_token
          ? `Bearer ${this.config.access_token}`
          : "",
        ...init?.headers,
      },
    };

    // Merge default headers with any headers passed in init

    return new Promise((resolve, reject) => {
      fetch(input, defaultProperty)
        .then((response: Response) => {
          if (response.status !== 200) {
            if (response.status === 401) {
              throw new Error("401 Unauthorized");
            }
            if (response.status >= 400 && response.status < 500) {
              throw new Error(response.statusText + response.status);
            }
          }
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text();
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error: Error) => {
          useToast().toast({
            title: `Error: ${error.message}`,
            description: `An error occurred while fetching data`,
            variant: "destructive",
          });
          reject(error);
        });
    });
  }
}
