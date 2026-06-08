import { websocketClient } from "./websocketClient";
import { heartbeatManager } from "./heartbeatManager";
import { reconnectManager } from "./reconnectManager";
import { subscriptionManager } from "../services/subscriptionManager";

class RealtimeManager {
  constructor() {
    this.listenersRegistered = false;
  }

  registerCoreListeners() {
    if (this.listenersRegistered) {
      return;
    }

    this.listenersRegistered = true;

    websocketClient.onOpen(() => {
      reconnectManager.reset();

      heartbeatManager.start();

      this.resubscribeAll();
    });

    websocketClient.onClose(() => {
      heartbeatManager.stop();

      reconnectManager.scheduleReconnect();
    });
  }

  buildUrl() {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    const protocol =
      window.location.protocol === "https:"
        ? "wss"
        : "ws";

    const host =
      import.meta.env.VITE_WS_HOST ||
      "127.0.0.1:8000";

    return `${protocol}://${host}/ws/realtime/?token=${token}`;
  }

  connect() {
    this.registerCoreListeners();

    if (websocketClient.isConnected()) {
      return;
    }

    const url = this.buildUrl();

    if (!url) {
      return;
    }

    websocketClient.connect(url);
  }

  disconnect() {
    reconnectManager.stop();

    heartbeatManager.stop();

    websocketClient.disconnect();
  }

  send(payload) {
    websocketClient.send(payload);
  }

  subscribeConversation(conversationId) {
    subscriptionManager.add(conversationId);

    this.send({
      type: "SUBSCRIBE_CONVERSATION",
      conversation_id: conversationId,
    });
  }

  unsubscribeConversation(conversationId) {
    subscriptionManager.remove(conversationId);

    this.send({
      type: "UNSUBSCRIBE_CONVERSATION",
      conversation_id: conversationId,
    });
  }

  resubscribeAll() {
    const conversations =
      subscriptionManager.getAll();

    conversations.forEach(
      (conversationId) => {
        this.send({
          type: "SUBSCRIBE_CONVERSATION",
          conversation_id: conversationId,
        });
      }
    );
  }

  isConnected() {
    return websocketClient.isConnected();
  }

  getStatus() {
    return websocketClient.getStatus();
  }
}

export const realtimeManager =
  new RealtimeManager();