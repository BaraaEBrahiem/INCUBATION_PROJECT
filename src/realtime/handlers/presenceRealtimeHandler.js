import store from "../../Redux/store";

import {
  updatePresence,
} from "../../Redux/features/presence/presenceSlice";

class PresenceRealtimeHandler {

  handle(payload) {

    console.log(
      "[Presence Event]",
      payload
    );

    store.dispatch(
      updatePresence(payload)
    );
  }
}

export const presenceRealtimeHandler =
  new PresenceRealtimeHandler();