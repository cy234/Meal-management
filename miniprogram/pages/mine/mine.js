const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //1表示显示图标
      title: '我的'
    },
    height: app.globalData.height * 2 + 20,
  },

//   //获取近7天
//   getweekstr:function(count){
//     var nowdate=new Date();
   
//     nowdate.setDate(nowdate.getDate()-count);
//     var y=nowdate.getFullYear();
//     var m=(nowdate.getMonth()+1)<10?"0"+(nowdate.getMonth()+1):(nowdate.getMonth()+1);
//     var d=nowdate.getDate()<10?"0"+nowdate.getDate():nowdate.getDate();
//     return y+"-"+m+"-"+d
// },
// getweek:function(){
//   var week=[];
//   for(let i=0;i<7;i++)
//   week[i]=this.getweekstr(i)
//   return week
// },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var week=this.getweek()
    console.log(week)
  },

  
})