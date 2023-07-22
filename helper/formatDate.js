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
        let month = String(date.getMonth() + 1).padStart(2, '0')
        let day = String(date.getDate()).padStart(2, '0')
        let objectDate = `${year}-${month}-${day}`
        return objectDate
    }
}