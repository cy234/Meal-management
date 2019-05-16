// miniprogram/pages/add/mark/mark.js

var util = require('../../../utils/util.js');
const app = getApp();
var foodid = '';
var openid=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: '记录'
    },
    height: app.globalData.height * 2 + 20,
    // 搜索框状态
    inputShowed: true,
    //显示结果view的状态
    viewShowed: false,
    //显示警告窗口的状态
    warnShowed:true,
    // 搜索框值
    inputName: "",
    //搜索渲染推荐数据
    foodList: [],
    //日期
    date: "",
    foodname: "",
    list: [],
    weight: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //隐藏搜索框样式
  hideInput: function() {
    this.setData({
      inputName: '',
      inputShowed: false
    })
  },
  //键盘抬起事件
  inputTyping: function(e) {
    console.log(e.detail.value)
    
    var that = this;
    if (e.detail.value == '') {
      return;
    }
    that.setData({
      viewShowed: false,
      inputName: e.detail.value
    });

    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('food').where({
      name: {
        $regex: '.*' + e.detail.value,
        $options: 'i'
      }
    }).get({
      success(res) {
        console.log(res.data),

          that.setData({
            foodList: res.data
          })
      }
    })

  },

  //清空输入框的值
  clearInput: function() {
    this.setData({
      inputName: ""
    });
  },

  //选中列表中的值
  food_name: function(res) {
    console.log(res.currentTarget.dataset.index, res.currentTarget.dataset.name);
    console.log(res.currentTarget.dataset.id);
    var that = this;
    foodid = res.currentTarget.dataset.id;
    that.hideInput();
    that.setData({
      viewShowed: true,
      inputName: res.currentTarget.dataset.name,
      foodid: res.currentTarget.dataset.id
    });
    wx.cloud.init();
    const db = wx.cloud.database()

  },

  //存进数据库
  submit: function(e) {
    console.log(e.detail.value);

    var that = this;
    var w = e.detail.value.weight;
    var f = e.detail.value.food;
    var d = util.formatTime2(new Date());
    if (e.detail.value == '') {
      return;
    }
    that.setData({
      'foodname': f,
      'weight': w,
      'date': d
    });
    wx.cloud.init();
    const db = wx.cloud.database();
    console.log('food' + foodid);
    if (d != '' && foodid != '' && w != '') {
      db.collection('user_meal').add({
        data: {
          date: d,
          id: foodid,
          uid: '1', //需获取openid
          weight: w,
          name:f
        },
        success(res) {
          console.log(res),
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
        },
        fail(res){
          wx.showToast({
            title: '添加失败',
            icon:'none'
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '添加失败',
        duration:2000,
        image:'/images/warns.png'
      })
    }
  }
})