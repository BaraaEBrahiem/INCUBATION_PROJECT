import { realtimeManager } from "./realtimeManager";
import { WS_EVENTS } from "../constants/eventTypes";

class HeartbeatManager {
  constructor() {
    this.intervalId = null;

    this.intervalMs = 30000;

    this.lastAckAt = null;
  }

  start() {
    if (this.intervalId) {
      return;
    }

    this.sendHeartbeat();

    this.intervalId = setInterval(() => {
      this.sendHeartbeat();
    }, this.intervalMs);
  }

  stop() {
    if (!this.intervalId) {
      return;
    }

    clearInterval(this.intervalId);

    this.intervalId = null;
  }

  sendHeartbeat() {
    if (!realtimeManager.isConnected()) {
      return;
    }

    realtimeManager.send({
      type: WS_EVENTS.HEARTBEAT,
    });
  }

  onHeartbeatAck() {
    this.lastAckAt = Date.now();
  }

  getLastAckAt() {
    return this.lastAckAt;
  }
}

export const heartbeatManager =
  new HeartbeatManager();