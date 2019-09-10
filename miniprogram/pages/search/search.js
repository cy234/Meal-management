const app = getApp();
var foodid = '';
Page({
  data: {
    LENGTH: 0,
    lists: [],
    inputShowed: false,
    inputVal: '',
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: '搜索'
    },
    viewShowed: false,
    foodList: [],
    height: app.globalData.height * 2 + 20,
    foodname: "",
  },

  //搜索点击事件
  bindKeyInput: function(e) {
    var val = this.data.inputVal; //val为输入内容
    if (val == '') { //输入为空
      wx.showToast({
        title: '输入不能为空！',
        duration: 2000,
        image: '/images/warn.png'
      })

    } else {
      if (this.data.LENGTH == 0) {
        wx.showToast({
          title: '未搜索到此物品',
          duration: 2000,
          image: '/images/warn.png'
        })
      } else if (this.data.LENGTH > 1) {
        wx.showToast({
          title: '请选择具体食物',
          duration: 2000,
          image: '/images/warn.png'
        })
      } else {
        wx.navigateTo({
          url: 'detail/detail?inputVal=' + val,
        })
      }
    }
    var val = this.data.inputVal; //val为输入内容
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  //隐藏搜索框样式
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  //input失去焦点时
  blur: function(e) {
    var val = e.detail.value
    this.setData({
      inputVal: val
    })
    this.setData({
      LENGTH: this.data.foodList.length
    })
  },
  //输入搜索内容
  inputTyping: function(e) {
    var that = this;
    if (e.detail.value == '') {
      return;
    }
    that.setData({
      viewShowed: false,
      inputVal: e.detail.value,
      LENGTH: that.data.foodList.length
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


        that.setData({
          foodList: res.data
        })
      }
    })

  },
  //选中列表中的值
  food_name: function(res) {
    var val;
    var that = this;
    foodid = res.currentTarget.dataset.id;
    that.hideInput();
    that.setData({
      viewShowed: true,
      inputVal: res.currentTarget.dataset.name,
      foodid: res.currentTarget.dataset.id
    });
    wx.cloud.init();
    const db = wx.cloud.database()
    this.setData({
      LENGTH: 1
    })
    val = this.data.inputVal;
    wx.navigateTo({
      url: 'detail/detail?inputVal=' + val
    })
  },
  //页面跳转至分类食物页面
  gotoPage: function(event) {
    var kind = event.currentTarget.id; //1或者2得到点击了按钮1或者按钮2
    wx.navigateTo({
      url: "category/category?inputVal=" + kind
    })
  },
});