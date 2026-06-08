import { useState } from "react";

import NotificationBadge from "./NotificationBadge";
import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = () => {
  const [
    open,
    setOpen,
  ] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          relative
          p-2
        "
      >
        🔔

        <NotificationBadge />
      </button>

      {open && (
        <NotificationDropdown
          onClose={() =>
            setOpen(false)
          }
        />
      )}
    </div>
  );
};

export default NotificationBell;