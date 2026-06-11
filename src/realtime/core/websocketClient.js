import { SOCKET_STATUS } from "../constants/socketStatus";

class WebSocketClient {
  constructor() {
    this.socket = null;

    this.status = SOCKET_STATUS.IDLE;

    this.messageListeners = new Set();

    this.openListeners = new Set();

    this.closeListeners = new Set();

    this.errorListeners = new Set();
  }

  connect(url) {
    if (
      this.socket &&
      (
        this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING
      )
    ) {
      return;
    }

    this.status = SOCKET_STATUS.CONNECTING;

    this.socket = new WebSocket(url);

    this.socket.onopen = (event) => {
      console.log("WS OPEN");

      this.status = SOCKET_STATUS.CONNECTED;

      this.openListeners.forEach(
        (listener) => listener(event)
      );
    };

    this.socket.onmessage = (event) => {
      let parsedData;

      try {
        parsedData = JSON.parse(event.data);
      } catch (error) {
        console.error(
          "WebSocket JSON parse error",
          error
        );
        return;
      }

      console.log(
        "WS RECEIVED:",
        parsedData
      );

      this.messageListeners.forEach((listener) =>
        listener(parsedData)
      );
    };

    this.socket.onerror = (event) => {
      this.status = SOCKET_STATUS.ERROR;

      this.errorListeners.forEach((listener) =>
        listener(event)
      );
    };

    this.socket.onclose = (event) => {
      console.log(
        "WS CLOSE",
        event.code,
        event.reason
      );

      this.status = SOCKET_STATUS.DISCONNECTED;

      this.closeListeners.forEach(
        (listener) => listener(event)
      );
    };
  }

  disconnect() {
    if (!this.socket) {
      return;
    }

    const socket = this.socket;

    this.socket = null;

    socket.close();
  }

  send(payload) {

    console.log(
      "WS SEND",
      payload,
      this.socket?.readyState
    );

    if (!this.isConnected()) {
      return false;
    }

    this.socket.send(
      JSON.stringify(payload)
    );

    return true;
  }

  isConnected() {
    return (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    );
  }

  getStatus() {
    return this.status;
  }

  onMessage(listener) {
    this.messageListeners.add(listener);

    return () => {
      this.messageListeners.delete(listener);
    };
  }

  onOpen(listener) {
    this.openListeners.add(listener);

    return () => {
      this.openListeners.delete(listener);
    };
  }

  onClose(listener) {
    this.closeListeners.add(listener);

    return () => {
      this.closeListeners.delete(listener);
    };
  }

  onError(listener) {
    this.errorListeners.add(listener);

    return () => {
      this.errorListeners.delete(listener);
    };
  }
}

export const websocketClient =
  new WebSocketClient();