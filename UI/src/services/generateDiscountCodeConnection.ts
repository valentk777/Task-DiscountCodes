import * as signalR from "@microsoft/signalr";
import { GenerateResponse } from "src/models/generateResponse";
import { GenerateRequest } from "src/models/generateRequest";

const URL = process.env.HUB_ADDRESS ?? "https://localhost:11111/hub";

class Connector {
  private connection: signalR.HubConnection;

  public events: (
    onGenerateDiscountCodeMessageReceived: (response: GenerateResponse) => void
  ) => void;

  static instance: Connector;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    this.connection.start().catch((err) => document.write(err));

    this.events = (onGenerateDiscountCodeMessageReceived) => {
      this.connection.on("generateDiscountCodeMessageReceived", (response: GenerateResponse) => {
        onGenerateDiscountCodeMessageReceived(response);
      });
    };
  }

  public generateDiscountCode = (request: GenerateRequest) => {
    this.connection.send("generateDiscountCode", request).then((response) => {
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
