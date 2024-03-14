import { formatDistanceToNow } from "date-fns";

export const formatDateToNow = (isoDateFormat: string): string => {
    const date = new Date(isoDateFormat);

    const timeAgo = formatDistanceToNow(date, { addSuffix: true }).replace(
        "about",
        ""
    );

    return timeAgo;
};
