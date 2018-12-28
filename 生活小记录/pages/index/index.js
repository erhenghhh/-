//index.js
//获取应用实例
var app = getApp()
import {
  formatTime
} from "../../utils/util.js"

  /**
   * 生命周期函数--监听页面加载
   */
Page({
  data: {
    reals: false,
    skinStyle: '',
    "todoList": [],
    "todoinput": null,
    "uncompletedNum": 0,
    "inputContent": '',
  },
  
  clear: function () {

    this.setData({
      todoList: []
    });
  },
  
  btnClick: function () {
    if (this.data.todoinput !== null) {
      const newTodo = {
        "id": new Date().getTime(),
        "todo": this.data.todoinput,
        "completed": false
      }
      this.data.todoList.push(newTodo)
      this.setData({
        "todoinput": null,
        "todoList": this.data.todoList,
        "uncompletedNum": this.data.uncompletedNum + 1,
        "inputContent": ''
      })
      this.storageHistory()
    }
  },
  storageHistory: function () {
    var today = formatTime(new Date())
    //console.log(today)
    var history = wx.getStorage({
      key: 'todoHistory',
      success: function (res) { },
    })
    if (typeof history !== "object") {
      history = []
    }
    console.log(history)
    if (history[0] === today) {
      history[1] = this.data.todoList
    } else {
      history[1] = this.data.todoList
      history[0] = today
    }
    wx.setStorage({
      key: 'todoHistory',
      data: history,
    })
  },
  input: function (event) {
    this.setData({ todoinput: event.detail.value })
  },
  toggleTodo: function (e) {
    console.log(e)
    const todoId = e.currentTarget.dataset.todoId
    for (var i = 0; i < this.data.todoList.length; i++) {
      if (this.data.todoList[i].id === todoId) {
        if (this.data.todoList[i].completed === false) {
          this.data.todoList[i].completed = true
          this.data.uncompletedNum -= 1
        } else {
          this.data.todoList[i].completed = false
          this.data.uncompletedNum += 1
        }
      }
    }
    this.setData({
      todoList: this.data.todoList,
      uncompletedNum: this.data.uncompletedNum
    })
    this.storageHistory()
  },
  deleteTodo: function (e) {
    const todoId = e.currentTarget.dataset.todoId
    for (var i = 0; i < this.data.todoList.length; i++) {
      if (this.data.todoList[i].id === todoId) {
        if (this.data.todoList[i].completed === false) {
          this.data.uncompletedNum -= 1
        }
        this.data.todoList.splice(i, 1)

      }
    }
    this.setData({
      todoList: this.data.todoList,
      uncompletedNum: this.data.uncompletedNum
    })
    this.storageHistory()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
   
    that.setData({
      skinStyle: app.globalData.skin,
      reals: app.globalData.reals,

    })

    
    var history = wx.getStorageSync('todoHistory')
    var today = formatTime(new Date())
    if (typeof history !== "object") {
      history = []
    } else {
      if (history[0] !== today) {
        this.setData({
          "todoList": [],
          "uncompletedNum": 0
        })
      } else {
        this.setData({
          "todoList": history[1],
          "uncompletedNum": history[1].length
        })
      }
    }
    if (app.globalData.reals) {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#708090',
      })

      wx.setTabBarStyle({
        // borderStyle: '#708090',
        backgroundColor: '#708090',
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#f8f8f8',
      })

      wx.setTabBarStyle({
        // borderStyle: '#f8f8f8',
        backgroundColor: '#f8f8f8',
     
      })
    }
  },
  onReady: function() {
    if (app.globalData.reals) {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#708090',
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#f8f8f8',
      })
    }
  },
  onShow: function() {

 
    var that = this
    wx.setNavigationBarTitle({
      title: 'Todo',
    })
    that.setData({
      skinStyle: app.globalData.skin,
      reals: app.globalData.reals,

    })
    if (app.globalData.reals) {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#708090',
      })
    } else {
     
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#f8f8f8',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this

    that.setData({
      skinStyle: app.globalData.skin,
      reals: app.globalData.reals,

    })
    if (app.globalData.reals) {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#708090',
      })

      wx.setTabBarStyle({
        borderStyle: '#708090',
        backgroundColor: '#708090',
    
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#f8f8f8',
      })

      wx.setTabBarStyle({
        // borderStyle: '#f8f8f8',
        backgroundColor: '#f8f8f8',
      
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (app.globalData.reals) {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#708090',
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000', //看文档 必须要六位 不能是三位
        backgroundColor: '#f8f8f8',
      })
    }
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
    return {
      title: '公众号：一根羊毛',
      desc: '公众号：一根羊毛',
      path: '/pages/index/index'
    }

  }
  
})