// 得到统计数据
const cloud = require("wx-server-sdk")

cloud.init()
const db = cloud.database()
const _ = db.command
let flag;
// 统计
exports.main = async (event, context) => {

console.log("date",event.date)
console.log("typeof",typeof(event.date)=="undefined")
  let date ={}
  if (typeof (event.date) == "undefined"){
    date = _.in(getweek())
    flag=0; //标记为统计当周
  }else{
     //date = {$regex:'.*'+event.date}
    date = eval("/^" + event.date + "/")
   flag=1;//标记为月统计
    
  }
  console.log("查询条件", date)
  const wxContext = cloud.getWXContext;  //获取openId
  const openid = wxContext.OPENID
  //user 对应的各营养素消费量

  const datalist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  function getweekstr(count) {
    var nowdate = new Date();

    nowdate.setDate(nowdate.getDate() - count);
    var y = nowdate.getFullYear();
    var m = (nowdate.getMonth() + 1) < 10 ? "0" + (nowdate.getMonth() + 1) : (nowdate.getMonth() + 1);
    var d = nowdate.getDate() < 10 ? "0" + nowdate.getDate() : nowdate.getDate();
    return y + "-" + m + "-" + d
  }
  
  function getweek() {
    var week = [];
    for (let i = 0; i < 7; i++)
      week[i] = getweekstr(i)
    return week
  }


 await db.collection('user_meal').where({
    uid: '1',
   date: date
  }).get().then(res => {
    console.log("all length",res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      console.log(typeof (res.data[i].id))
      console.log(typeof (res.data[i].date))
     return db.collection('food').where({
        id: res.data[i].id
      }).get().then(fe => {

        datalist[0] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].ca) / 100 
        console.log("for 中" + datalist[0])
        datalist[1] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].VC) / 100 

        datalist[2] += Math.round(parseFloat(res.data[i].weight) * parseFloat(fe.data[0].VE)) / 100 

        datalist[3] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].VB1) / 100 

        datalist[4] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].VB2) / 100 

        datalist[5] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].VA) / 100 

        datalist[6] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].fe) / 100 

        datalist[7] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].energy) / 100 

        datalist[8] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].protein) / 100 

        datalist[9] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].carbon) / 100 

        datalist[10] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].fat) / 100 

        datalist[11] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].niacin) / 100 

        datalist[12] += parseFloat(res.data[i].weight) * parseFloat(fe.data[0].na)/100

        for(let i=0;i<=12;i++){
          if(flag==0){
            datalist[i]=Math.round(datalist[i]/7);
          }else{
            datalist[i]=Math.round(datalist[i]/30);
          }
        }
        console.log("for 结束" + datalist[0])
       
      })

      console.log("for 结束"+datalist[0])
    }
   
  }

  )
  return {
    openid, datalist
  }
}


