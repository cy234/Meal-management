//获得系统时间年月日
function formatTime(kind,date){
  var year=date.getFullYear()
  var month=date.getMonth()+1
  var day=date.getDate()
  if(kind==0)
  {
    return [year,month].map(formatNumber).join('-')
  }else{
    return [year, month,day].map(formatNumber).join('-')
  }
}

function formatNumber(n){
  n=n.toString()
  return n[1]?n:'0'+n
}



module.exports={
  formatTime: formatTime
}