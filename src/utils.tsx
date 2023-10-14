export const extractDateTime = (time: string) => {
    const extracted = time.match(/\d+/);
    return extracted ? +extracted[0] : -1
}

export const getDate = (time: string | undefined | null) => {
    if (time) {
        const datetime = extractDateTime(time);
        if (datetime !== -1) {
            return new Date(datetime).toLocaleDateString()
        }
    }
    return null
}

export const getTime = (time: string | undefined) => {
    if (time) {
        const datetime = extractDateTime(time);
        if (datetime !== -1) {
            return new Date(datetime).toLocaleTimeString()
        }
    }
    
    return null
}

export const thirtyDayDiff = (day: string | null) => {
    if (day) {
        const today = new Date();
        const selectedDay = new Date(day);
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return thirtyDaysAgo > selectedDay;
    }
    return null;
}