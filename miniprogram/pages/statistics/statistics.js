//微信渲染数据表格
const app = getApp()
const db=wx.cloud.database()
const util = require('../../utils/util.js');
const suggestdatas = [
  [[200, 40, 0.002, 0.1, 0.4, 0.3, 0.3, 90, 9000, 60000, 48000, 2, 170], [200, 40, 0.002, 0.1, 0.4, 0.3, 0.3, 90, 9000, 60000, 48000, 2, 170]],

  [[250, 40, 0.01, 0.3, 0.5, 0.35, 10, 80, 20000, 85000, 40000, 3, 350], [250, 40, 0.01, 0.3, 0.5, 0.35, 10, 80, 20000, 85000, 40000, 3, 350]],

  [[600, 40, 0.03, 0.6, 0.6, 0.31, 9, 800, 25000, 60000, 35000, 6, 700], [600, 40, 0.03, 0.6, 0.6, 0.31, 9, 900, 25000, 60000, 35000, 6, 700]],
  
  [[800, 50, 0.04, 0.8, 0.7, 0.36, 10, 1250, 30000, 60000, 25000, 8, 900], [800, 50, 0.04, 0.8, 0.7, 0.26, 10, 1300, 30000, 60000, 25000, 8, 900]],

  [[1000, 65, 0.05, 1, 1, 0.5, 13, 1700, 40000, 60000, 25000, 11, 1200], [1000, 65, 0.05, 1, 1, 0.5, 13, 1700, 40000, 60000, 25000, 10, 1200]],

  [[1200, 90, 0.07, 1.3, 1.3, 0.67, 18, 2050, 55000, 60000, 25000, 14, 1500], [1200, 90, 0.07, 1.1, 1.3, 0.63, 15, 2350, 60000, 60000, 25000, 12, 1500]],

  [[1000, 100, 0.075, 1.6, 1.5, 0.82, 18, 2300, 60000, 60000, 25000, 16, 1900], [1000, 100, 0.075, 1.3, 1.2, 0.63, 16, 1850, 75000, 60000, 25000, 13, 1900]],

  [[800, 100, 0.08, 1.4, 1.4, 0.8, 20, 2100, 55000, 60000, 25000, 15, 2200], [800, 100, 0.08, 1.2, 1.2, 0.7, 12, 1600, 65000, 60000, 25000, 12, 2200]],

  [[1000, 100, 0.08, 1.4, 1.4, 0.8, 12, 2050, 55000, 60000, 25000, 14, 2000], [1000, 100, 0.08, 1.2, 1.2, 0.7, 12, 1450, 65000, 60000, 25000, 12, 2000]],

  [[1000, 100, 0.08, 1.4, 1.4, 0.8, 12, 1950, 55000, 60000, 25000, 14, 2000], [1000, 100, 0.08, 1.2, 1.2, 0.7, 12, 1350, 65000, 60000, 25000, 11, 2000]],

  [[1000, 100, 0.08, 1.4, 1.4, 0.8, 12, 1750, 55000, 60000, 25000, 13, 2000], [1000, 100, 0.08, 1.2, 1.2, 0.7, 12, 2200, 65000, 60000, 25000, 10, 2000]]
];

let suggestdata = [];
let realdata = [];
let chart = null;  //标记是否第一次加载
import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.showLoading();  //首次加载动画
  var colors = ['#d14a61', '#5793f3', '#675bba'];


  var option = {
    color: colors,

    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['建议摄入量', '我的摄入量']
    },
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 40
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return '我的摄入量  ' + params.value
                + (params.seriesData.length ? '：' + params.seriesData[0].data : '') + (params.value == '能量' ? 'kcal/d' : 'mg/d');
            }
          }
        },
        data: ["钙", "维C", "维E", "维B1", "维B2", "维A", "铁", "能量", "蛋白质", "碳水", "脂肪", "烟酸", "钠"]
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return '建议摄入 ' + params.value
                + (params.seriesData.length ? '：' + params.seriesData[0].data : '') + (params.value == '能量' ? 'kcal/d' : 'mg/d');
            }
          }
        },
        data: ["钙", "维C", "维E", "维B1", "维B2", "维A", "铁", "能量", "蛋白质", "碳水", "脂肪", "烟酸", "钠"]
      }

    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '建议摄入量',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        data: suggestdata
      },
      {
        name: '我的摄入量',
        type: 'line',
        smooth: true,
        data: realdata
      }
    ]
  };

  chart.setOption(option);
  chart.hideLoading();
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: '统计'
    },
    height: app.globalData.height * 2 + 20,
    currentSelectedType: 'week',
    monthDate: '', //选择的月份
    ec: {
      onInit: initChart
    }


  },
  //按当周统计
  selectedWeek: function (e) {
    console.log(e.currentTarget.dataset.id)

    this.setData({
      currentSelectedType: e.currentTarget.dataset.id
    })
    this.getData()
  },
  //按月统计
  selectedMonth: function (e) {
    
    console.log(e.currentTarget.dataset.id)
    this.setData({

      currentSelectedType: e.currentTarget.dataset.id
    })
    this.getData()
  },
  //选择月份
  bindDateChange: function (e) {
    this.setData({
      monthDate: e.detail.value
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    wx.cloud.init({
      env: 'meals'
    })

    var time = util.formatTime(0, new Date());
    this.setData({
      'time': time,
      'monthDate': time
    })
    this.echartsComponnet = this.selectComponent('#mychart');
    // this.getData(); //读数据渲染图表
    //this.getSuggest()
  },
  onReady() {
this.getSuggest()
    this.getData(); //读数据渲染图表 
  },
  //得到建议摄入
  getSuggest(){
    let age = 0, sex = 0, index = 0
  db.collection('user').where({
      uid: '1',
    }).get({
      success(res) {
        age = res.data[0].age
        sex = res.data[0].sex
        switch (true) {
          case (age > 0 && age < 0.5):
            index = 0; break;
          case (age > 0 && age < 0.5):
            index = 0; break;
          case (age >= 0.5 && age < 1):
            index = 1; break;
          case (age >= 1 && age < 4):
            index = 2; break;
          case (age >= 4 && age < 7):
            index = 3; break;
          case (age >= 7 && age < 11):
            index = 4; break;
          case (age >= 11 && age < 14):
            index = 5; break;
          case (age >= 14 && age < 18):
            index = 6; break;
          case (age >= 18 && age < 50):
            index = 7; break;
          case (age >= 50 && age < 65):
            index = 8; break;
          case (age >= 65 && age < 80):
            index = 9; break;
          case (age >= 80):
            index = 10; break;
          default: break;
        }
        suggestdata = suggestdatas[index][sex]
        console.log("func"+suggestdata)
      }
    })
    
  },
  getData: function () {
    //调用云函数getCanvasData
    var that = this
    let data
    console.log("getdate",this.data.currentSelectedType)
    if (this.data.currentSelectedType=='month'){
      data={date:this.data.monthDate.substring(-1,7)}
    }else{
      data={}
    }
    console.log(data)
    wx.cloud.callFunction({
      name: 'getCanvasData',
      data: data,
      success(res) {
        console.log(res)
        console.log(res.result)
        console.log(res.result.datalist)
        // that.setData({
        realdata = res.result.datalist
        
       
      console.log("sugge",suggestdata)
        chart.setOption({
          series: [
            {
              name: '建议摄入量',
              data: suggestdata
            },
            {
              name: '我的摄入量',
              data: realdata
            }]

        })
      },
      fail: console.error
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
