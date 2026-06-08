import { useEffect } from "react";

import { realtimeManager } from "../../realtime/core/realtimeManager";
import { eventRouter } from "../../realtime/core/eventRouter";

const RealtimeProvider = ({ children }) => {
  useEffect(() => {
    eventRouter.initialize();

    realtimeManager.connect();

    return () => {
      realtimeManager.disconnect();
    };
  }, []);

  return children;
};

export default RealtimeProvider;