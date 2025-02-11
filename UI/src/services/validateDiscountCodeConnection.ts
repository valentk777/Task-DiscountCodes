import * as signalR from "@microsoft/signalr";
import { UseCodeResponse } from "src/models/useCodeResponse";
import { UseCodeRequest } from "src/models/useCodeRequest";

const URL = process.env.HUB_ADDRESS ?? "https://localhost:11111/hub";

class Connector {
  private connection: signalR.HubConnection;

  public events: (
    onValidateDiscountCodeMessageReceived: (response: UseCodeResponse) => void
  ) => void;

  static instance: Connector;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    this.connection.start().catch((err) => document.write(err));

    this.events = (onValidateDiscountCodeMessageReceived) => {
      this.connection.on("validateDiscountCodeMessageReceived", (response) => {
        onValidateDiscountCodeMessageReceived(response);
      });
    };
  }

  public validateDiscountCode = (request: UseCodeRequest) => {
    this.connection.send("validateDiscountCode", request).then((_) => {
      console.log("sent");
    });
  };

  public static getInstance(): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector();
    }

    return Connector.instance;
  }
}

export default Connector.getInstance;
