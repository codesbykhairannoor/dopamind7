import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

// Aktifkan plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const formatToLocal = (date, userTimezone = 'UTC', format = 'DD MMM YYYY HH:mm') => {
    if (!date) return '-';
    // Ambil waktu UTC dari Laravel, lalu konversi ke Timezone user
    return dayjs.utc(date).tz(userTimezone).format(format);
};

export const timeAgo = (date) => {
    return dayjs().to(dayjs(date));
};

export default dayjs;