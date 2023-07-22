module.exports = {
    formatHomeDate: (date) => {
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        let objectDate = `${year}/${month + 1}/${day}`
        return objectDate
    },
    formatEditDate: (date) => {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        if (month < 10) {
            month = `0${month}`
        }
        let day = date.getDate()
        let objectDate = `${year}-${month}-${day}`
        return objectDate
    }
}