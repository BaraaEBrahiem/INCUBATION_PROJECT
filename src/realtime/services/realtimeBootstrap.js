import { realtimeManager } from "../core/realtimeManager";
import { eventRouter } from "../core/eventRouter";

class RealtimeBootstrap {
  constructor() {
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    eventRouter.initialize();

    realtimeManager.connect();
  }

  destroy() {
    realtimeManager.disconnect();
    subscriptionManager.clear();

    this.initialized = false;
  }
}

export const realtimeBootstrap =
  new RealtimeBootstrap();