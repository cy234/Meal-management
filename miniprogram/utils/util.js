const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime1 = date =>{
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour,minute].map(formatNumber).join(':')
}
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
   
  return [year,month,day].map(formatNumber).join('-')
}
module.exports = {
  formatTime:formatTime,
  formatTime1:formatTime1,
  formatTime2:formatTime2
}