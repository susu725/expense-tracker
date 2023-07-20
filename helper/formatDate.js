module.exports = {
    formatDate: (date) => {

        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        let objectDate = `${year}/${month + 1}/${day}`
        return objectDate
    }
}