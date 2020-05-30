export default {
    getTImeForm: (time) => {
        let hour, minute, second
        hour = Math.round(time / 3600)
        minute = Math.round(time / 60)
        second = Math.round(time - hour * 3600 - minute * 60)
        hour = hour >= 10 ? hour + "" : "0" + hour
        minute = minute >= 10 ? minute + "" : '0' + minute
        second = second >= 10 ? second + '' : '0' + second
        let timeString = hour + ":" + minute + ":" + second
        return timeString
    }
}
