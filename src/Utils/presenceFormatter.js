export function formatPresence(
    isOnline,
    lastSeen,
) {

    if (isOnline) {
        return "متصل الآن";
    }

    if (!lastSeen) {
        return "غير متصل";
    }

    const date = new Date(lastSeen);

    const now = new Date();

    const isToday =
        date.toDateString() ===
        now.toDateString();

    if (isToday) {

        return (
            "آخر ظهور اليوم الساعة " +
            date.toLocaleTimeString(
                "ar",
                {
                    hour: "numeric",
                    minute: "2-digit",
                }
            )
        );
    }

    const yesterday = new Date();

    yesterday.setDate(
        yesterday.getDate() - 1
    );

    const isYesterday =
        date.toDateString() ===
        yesterday.toDateString();

    if (isYesterday) {

        return (
            "آخر ظهور أمس الساعة " +
            date.toLocaleTimeString(
                "ar",
                {
                    hour: "numeric",
                    minute: "2-digit",
                }
            )
        );
    }

    return (
        "آخر ظهور " +
        date.toLocaleDateString("ar") +
        " الساعة " +
        date.toLocaleTimeString(
            "ar",
            {
                hour: "numeric",
                minute: "2-digit",
            }
        )
    );
}