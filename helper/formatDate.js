function formatDate(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + "/" + month + "/" + day;
}

module.exports = { formatDate }