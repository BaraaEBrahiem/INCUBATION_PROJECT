import store from "../../Redux/store";

class PresenceRealtimeHandler {
  handle(payload) {
    console.log(
      "[Presence]",
      payload
    );
  }
}

export const presenceRealtimeHandler =
  new PresenceRealtimeHandler();