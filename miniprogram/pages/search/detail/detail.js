// miniprogram/pages/search/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: ''
    },
    height: app.globalData.height * 2 + 20,
    // 营养素
    listData: [{
        "name": "维生素A",
        "weight": -1,
        "level": "",
        nrv: 800
      },
      {
        "name": "维生素B1",
        "weight": -1,
        "level": "",
        nrv: 1.4
      },
      {
        "name": "维生素B2",
        "weight": -1,
        "level": "",
        nrv: 1.4
      },
      {
        "name": "维生素C",
        "weight": -1,
        "level": "",
        nrv: 100
      },
      {
        "name": "维生素E",
        "weight": -1,
        "level": "",
        nrv: 14
      },
      {
        "name": "钙",
        "weight": -1,
        "level": "",
        nrv: 800
      },
      {
        "name": "碳水化合物",
        "weight": -1,
        "level": "",
        nrv: 300
      },
      {
        "name": "胆固醇",
        "weight": -1,
        "level": "",
        nrv: 300
      },
      {
        "name": "能量",
        "weight": -1,
        "level": "",
        nrv: 8400
      },
      {
        "name": "脂肪",
        "weight": -1,
        "level": "",
        nrv: 60
      },
      {
        "name": "铁",
        "weight": -1,
        "level": "",
        nrv: 15
      },
      {
        "name": "纤维素",
        "weight": -1,
        "level": "",
        nrv: 25000
      },
      {
        "name": "钠",
        "weight": -1,
        "level": "",
        nrv: 2000
      },
      {
        "name": "烟酸",
        "weight": -1,
        "level": "",
        nrv: 14
      },
      {
        "name": "蛋白质",
        "weight": -1,
        "level": "",
        nrv: 60
      },
      {
        "name": "水",
        "weight": -1,
        "level": "",
        nrv: -1
      }
    ]
  },
  findEvent: function() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(
      function() {
        wx.hideLoading()
      }, 1000)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findEvent();
    var that = this;
    this.setData({
      inputVal: options.inputVal, //inputVal食品名称
      'nvabarData.title': options.inputVal
    })

    //数据库查询并将相关信息存储到数组中
    const db = wx.cloud.database()
    db.collection('food').where({
      name: this.data.inputVal
    }).get({
      success(res) {
        that.setData({
          'listData[0].weight': parseFloat(res.data[0].VA)
        });
        that.setData({
          'listData[1].weight': parseFloat(res.data[0].VB1)
        });
        that.setData({
          'listData[2].weight': parseFloat(res.data[0].VB2)
        });
        that.setData({
          'listData[3].weight': parseFloat(res.data[0].VC)
        });
        that.setData({
          'listData[4].weight': parseFloat(res.data[0].VE)
        });
        that.setData({
          'listData[5].weight': parseFloat(res.data[0].ca)
        });
        that.setData({
          'listData[6].weight': parseFloat(res.data[0].carbon)
        });
        that.setData({
          'listData[7].weight': parseFloat(res.data[0].cholesterol)
        });
        that.setData({
          'listData[8].weight': parseFloat(res.data[0].energy)
        });
        that.setData({
          'listData[9].weight': parseFloat(res.data[0].fat)
        });
        that.setData({
          'listData[10].weight': parseFloat(res.data[0].fe)
        });
        that.setData({
          'listData[11].weight': parseFloat(res.data[0].fiber)
        });
        that.setData({
          'listData[12].weight': parseFloat(res.data[0].na)
        });
        that.setData({
          'listData[13].weight': parseFloat(res.data[0].niacin)
        });
        that.setData({
          'listData[14].weight': parseFloat(res.data[0].protein)
        });
        that.setData({
          'listData[15].weight': parseFloat(res.data[0].water)
        });
        var i;
        var num;
        for (i = 0; i < 16; i++) {
          var a = 'listData[' + i + '].weight'
          num = that.data.listData[i].weight.toFixed(2);
          that.setData({
            [a]: num
          })
        }
        var temp;
        var tempVal;
        for (temp = 0; temp < 15; temp++) {
          tempVal = (that.data.listData[temp].weight / that.data.listData[temp].nrv) * 100
          tempVal = tempVal.toFixed(2)
          var a = 'listData[' + temp + '].level'
          that.setData({
            [a]: tempVal
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
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
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
})