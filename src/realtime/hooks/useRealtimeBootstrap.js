import { useEffect } from "react";

import { realtimeBootstrap } from "../services/realtimeBootstrap";

export function useRealtimeBootstrap() {
  useEffect(() => {
    realtimeBootstrap.initialize();

    return () => {
      realtimeBootstrap.destroy();
    };
  }, []);
}