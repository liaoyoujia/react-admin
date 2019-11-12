export function formateDate (time) {
  if (!time) {
    return ''
  }
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDay()
  let hour = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
  let min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
  let second = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
  return `${year}-${month}-${day}  ${hour}:${min}:${second}`
}
