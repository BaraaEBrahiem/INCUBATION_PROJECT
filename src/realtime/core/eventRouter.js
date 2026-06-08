import { websocketClient } from "./websocketClient";

import { heartbeatManager } from "./heartbeatManager";

import { WS_EVENTS } from "../constants/eventTypes";

import { messageRealtimeHandler } from "../handlers/messageRealtimeHandler";

import { notificationRealtimeHandler } from "../handlers/notificationRealtimeHandler";

import { conversationRealtimeHandler } from "../handlers/conversationRealtimeHandler";

import { presenceRealtimeHandler } from "../handlers/presenceRealtimeHandler";

class EventRouter {
  constructor() {
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    websocketClient.onMessage((event) => {
      this.route(event);
    });
  }

  route(event) {
    if (!event?.type) {
      return;
    }

    switch (event.type) {
      case WS_EVENTS.NEW_MESSAGE:
        messageRealtimeHandler.handleNewMessage(
          event.data
        );
        break;

      case WS_EVENTS.MESSAGE_READ:
        messageRealtimeHandler.handleMessageRead(
          event.data
        );
        break;

      case WS_EVENTS.NOTIFICATION:
        notificationRealtimeHandler.handle(
          event.data
        );
        break;

      case WS_EVENTS.CONVERSATION_UPDATED:
        conversationRealtimeHandler.handle(
          event.data
        );
        break;

      case WS_EVENTS.PRESENCE:
        presenceRealtimeHandler.handle(
          event.data
        );
        break;

      case WS_EVENTS.HEARTBEAT_ACK:
        heartbeatManager.onHeartbeatAck();
        break;

      case WS_EVENTS.SUBSCRIBED:
        this.handleSubscribed(
          event.data ?? event
        );
        break;

      case WS_EVENTS.UNSUBSCRIBED:
        this.handleUnsubscribed(
          event.data ?? event
        );
        break;

      case WS_EVENTS.ERROR:
        this.handleError(
          event.data ?? event
        );
        break;

      default:
        console.warn(
          "[Realtime] Unknown event type:",
          event.type,
          event
        );
    }
  }

  handleSubscribed(data) {
    console.debug(
      "[Realtime] SUBSCRIBED",
      data
    );
  }

  handleUnsubscribed(data) {
    console.debug(
      "[Realtime] UNSUBSCRIBED",
      data
    );
  }

  handleError(data) {

    console.error(
      "[Realtime Error]",
      data
    );

    if (
      data?.code ===
      "RATE_LIMITED"
    ) {
      console.warn(
        "Websocket rate limit exceeded"
      );
    }
  }
}

export const eventRouter =
  new EventRouter();