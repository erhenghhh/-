App({
  onLaunch: function () {
    
    console.log('App Launch')
    this.getSkin()
    this.getReals()
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
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
   
    skin: '', //默认是白天模式
    reals: false,
  },
  getSkin: function () {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function (res) {
        that.globalData.skin = res.data
      }
    })
  },

  getReals: function () {
    var that = this
    wx.getStorage({
      key: 'reals',
      success: function (res) {
        that.globalData.reals = res.data
      }
    })
  },
});