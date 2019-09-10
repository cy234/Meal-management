const app = getApp()
const APP_ID = 'wx6bf37bf1484e92fe';
const db=wx.cloud.database()
const APP_SECRET = '7c32e1f80136f383bb35a01d56cba099'; 
var OPEN_ID = '';
var hasUserInfo = false;
var hasLogin=true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nvabarData: {
      showCapsule: 0, //1表示显示图标
      title: '我的'
    },
    height: app.globalData.height * 2 + 20,
    num: 0,
   
    day: 0,
    info: [
      {
        name: "年龄",
        value:""
      },
      {
        name: "性别",
        value:""
      }
    ]
  },
  toGuide:function(){
     wx.navigateTo({
       url: '/pages/mine/guide/guide',
     })
  },
  reference:function(){
    wx.navigateTo({
      url: '/pages/mine/reference/reference',
    })
  },
  //得到用户记录条数
  getRecord: function(){
    db.collection('user_meal').orderBy('date','desc').where({
      _openid:OPEN_ID
    }).count({
      success:function(res){
        console.log(res.total)
        this.setData({
          num: res.total
        })
      }
    }).get({
      success: function (res) {
        console.log(res.data[0].date)
      }
    })

  },
  
  onLoad: function (options) {
    //授权登录
    var that = this;
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      if (app.globalData.userInfo) {
        wx.navigateTo({
          url: '/pages/add/add'
        })
      } else {
        wx.showToast({
          title: '请先授权再使用',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        if (app.globalData.userInfo) {
          wx.navigateTo({
            url: '/pages/mine/mine'
          })
        } else {
          wx.showToast({
            title: '请先授权再使用',
            icon: 'none',
            duration: 2000
          })
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
  },

  getUserInfo: function (e) {
    var that = this;
    var id = '';

    console.log('userInfo' + e);
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });

    if (e.detail.userInfo) {
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: APP_ID,
              secret: APP_SECRET,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {

              OPEN_ID = res.data.openid,
                console.log('OPENID' + res.data.openid)
              wx.setStorageSync('openid', res.data.openid);

              that.setData({
                hasLogin:true
              }),

              wx.cloud.init();
              const db = wx.cloud.database();
              //判断用户是否存在
              db.collection('user').where({
                _openid: res.data.openid
              }).get({
                success: function (res1) {
                  console.log(res1);
                  //
                  if (res1.data.length == 0) {
                    db.collection('user').add({
                      data: {
                        _openid: res.data._openid
                      },
                      success: function (res3) {
                        console.log('添加成功' + res3)

                      }
                    })
                  }
                }
              })
            }
          })
        }
      });
    }
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/add/add'
      })
    } else {
      wx.showToast({
        title: '请先授权再使用',
        icon: 'none',
        duration: 2000
      })
    }

  },
  bindViewTap: function () {  

    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/add/mark/mark'
      })
    } else {
      wx.showToast({
        title: '请先授权再使用',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    //验证登录是否过期
 var that=this;
    wx.checkSession({
      success: function (res) {
        console.log(res, '未过期');
        let ses = wx.getStorageSync('openid');
        
        
       
      },
      fail: function (res2) {
        console.log(res2, '过期');

        wx.login({
          success: function (res2) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: APP_ID,
                secret: APP_SECRET,
                js_code: res2.code,
                grant_type: 'authorization_code'
              },
              method: 'GET',
              success: function (res3) {
                console.log(res3.data)
                OPEN_ID = res3.data.openid,
                  wx.setStorageSync('openid', res3.data.openid);
                console.log('OPENID' + OPEN_ID)
                that.setData({
                  hasLogin:true
                })
              }
            })
          }
        })
      }
    })  
  }
  

 

 
})