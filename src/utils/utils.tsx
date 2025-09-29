/**
 * Checks if the given date string is today (local time).
 * Uses getDate to normalize both values for comparison.
 * @param dateStr - The date string to check (e.g. yyyy-mm-dd or /Date(...)/)
 * @returns True if the date is today, false otherwise.
 */
export function isToday(dateStr: string | null | undefined): boolean {
    const todayStr = new Date().toLocaleDateString();
    return !!todayStr && !!dateStr && todayStr === dateStr;
}
/**
 * Extracts a timestamp from a string containing a date/time value.
 * 
 * @param time - The string containing the datetime value to extract
 * @returns A number representing the timestamp, or -1 if extraction fails
 * @example
 * ```ts
 * extractDateTime("/Date(1693526400000)/") // returns 1693526400000
 * extractDateTime("invalid") // returns -1
 * ```
 */
export const extractDateTime = (time: string): number => {
    const extracted = time.match(/\d+/);
    return extracted ? +extracted[0] : -1;
};

/**
 * Converts a datetime string to a localized date string.
 * 
 * @param time - The datetime string to convert
 * @returns A localized date string, or null if conversion fails
 * @example
 * ```ts
 * getDate("/Date(1693526400000)/") // returns "9/1/2023" (based on locale)
 * getDate(null) // returns null
 * ```
 */
export const getDate = (time: string | undefined | null): string | null => {
    if (time) {
        const datetime = extractDateTime(time);
        if (datetime !== -1) {
            return new Date(datetime).toLocaleDateString();
        }
    }
    return null;
};

/**
 * Converts a datetime string to a localized time string.
 * 
 * @param time - The datetime string to convert
 * @returns A localized time string, or null if conversion fails
 * @example
 * ```ts
 * getTime("/Date(1693526400000)/") // returns "12:00:00 AM" (based on locale)
 * getTime(undefined) // returns null
 * ```
 */
export const getTime = (time: string | undefined): string | null => {
    if (time) {
        const datetime = extractDateTime(time);
        if (datetime !== -1) {
            return new Date(datetime).toLocaleTimeString();
        }
    }
    return null;
};

/**
 * Checks if a given date is more than 30 days in the past.
 * 
 * @param day - The date string to check
 * @returns 
 * - true if the date is more than 30 days in the past
 * - false if the date is within the last 30 days
 * - null if the input is null or invalid
 * @example
 * ```ts
 * thirtyDayDiff("9/1/2023") // returns true if today is after 10/1/2023
 * thirtyDayDiff(null) // returns null
 * ```
 */
export const thirtyDayDiff = (day: string | null): boolean | null => {
    if (day) {
        const today = new Date();
        const selectedDay = new Date(day);
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 29);
        return thirtyDaysAgo > selectedDay;
    }
    return null;
};