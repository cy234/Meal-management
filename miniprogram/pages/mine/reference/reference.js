const app=getApp()
Page({

  
  data: {
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: '营养参考'
    },
    height: app.globalData.height * 2 + 20,
    listData:[
      {"kind":"谷物类","weight":"250g~400g"},
      { "kind": "蔬菜类", "weight": "300g~500g" },
      { "kind": "水果类", "weight": "200g~400g" },
      { "kind": "鱼虾类", "weight": "50g~100g" },
      { "kind": "禽畜类", "weight": "50g~750g" },
      { "kind": "蛋类", "weight": "25g~50g" },
      { "kind": "奶制品类", "weight": "300g" },
      { "kind": "豆制品类", "weight": "30g~50g" },
      { "kind": "烹调油", "weight": "<=25g或<=30g" },
      { "kind": "食盐", "weight": "<=6g" },

    ]
  },

  
})