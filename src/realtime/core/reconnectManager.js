import { realtimeManager } from "./realtimeManager";

class ReconnectManager {
  constructor() {
    this.reconnectTimer = null;

    this.reconnectAttempts = 0;

    this.maxReconnectAttempts = 10;

    this.baseDelay = 1000;

    this.maxDelay = 30000;

    this.isReconnecting = false;
  }

  scheduleReconnect() {
    if (this.isReconnecting) {
      return;
    }

    if (
      this.reconnectAttempts >=
      this.maxReconnectAttempts
    ) {
      console.warn(
        "Maximum reconnect attempts reached"
      );

      return;
    }

    this.isReconnecting = true;

    const delay = Math.min(
      this.baseDelay *
        Math.pow(
          2,
          this.reconnectAttempts
        ),
      this.maxDelay
    );

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts += 1;

      this.isReconnecting = false;

      realtimeManager.connect();
    }, delay);
  }

  reset() {
    this.reconnectAttempts = 0;

    this.isReconnecting = false;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);

      this.reconnectTimer = null;
    }
  }

  stop() {
    this.reset();
  }
}

export const reconnectManager =
  new ReconnectManager();