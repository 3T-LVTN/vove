function getVietnamTime(date: Date) {
    date.setTime(date.getTime() + 7 * 60 * 60 * 1000)
    return date.toISOString()
}

export function formatDate(time: string) {
    const gmtTime = new Date(time)
    const vnTime = getVietnamTime(gmtTime)
    const formatTime = 
        vnTime.substring(8, 10) + '/' +
        vnTime.substring(5, 7) + '/' +
        vnTime.substring(0, 4) + ' ' +
        vnTime.substring(11, 19)
    return formatTime
}