// example/set/set.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cache: [{ iconurl: '../../images/Todo.png', title: "清理缓存", tap: 'clearCache' }], 
    device: [
      { iconurl: '../../images/Todo.png', title: '系统信息', tap: 'showSystemInfo' },
      { iconurl: '../../images/Todo.png', title: '网络状态', tap: 'showNetWork' },
      { iconurl: '../../images/Todo.png', title: '二维码', tap: 'scanQRCode' }
    ],
    reals: false,
    skinStyle: "",

  },
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },
  //网络状态
  showNetWork: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType
        that.showModal('网络状态', '您当前的网络：' + networkType);
      }
    })
  },




  //扫描二维码
  scanQRCode: function () {
    var that = this;
    wx.scanCode({
      success: function (res) {
        console.log(res)
        that.showModal('扫描二维码', res.result, false);
      },
      fail: function (res) {
        that.showModal('扫描二维码', "扫描失败，请重试", false);
      }
    })
  },

  showSystemInfo: function () {
    wx.navigateTo({
      url: 'device/device',
    });
  },

  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //第三步，最后把全局的变量进行赋值操作。存到本地只是为了下次打开依然按照上次的设置来显示
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

    wx.setNavigationBarTitle({
      title: '设置',
    })

  },

  //切换时的处理函数
  switchChange: function (e) {
    var that = this
    var real

    //如果开启
    if (e.detail.value == true) {
      real = true
      app.globalData.skin = "dark"
      app.globalData.reals = true

      
    } else {
      //否则
      real = false
      app.globalData.skin = ""
      app.globalData.reals = false
    }
    //保存信息
    that.setData({

      reals: real,
      skinStyle: app.globalData.skin
    })
    //保存到本地
    wx.setStorage({
      key: "skin",
      data: app.globalData.skin
    })
    wx.setStorage({
      key: "reals",
      data: app.globalData.reals
    })
    console.log(app.globalData.reals)
    console.log("---------------------------")
    console.log("---------------------------")
    console.log("---------------------------")
    console.log("---------------------------")
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.setData({
      skinStyle: app.globalData.skin,

      // skinStyle:'dark'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      skinStyle: app.globalData.skin,

      // skinStyle:'dark'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    that.setData({
      skinStyle: app.globalData.skin,

      // skinStyle:'dark'
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    that.setData({
      skinStyle: app.globalData.skin,

      // skinStyle:'dark'
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})