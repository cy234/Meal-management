const app=getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: '搜索'
    },
    height: app.globalData.height*2+20,
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
 
});