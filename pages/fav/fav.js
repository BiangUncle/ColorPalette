// pages/fav/fav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: [
      {
        name: 'Sunset',
        id: 0,
        colorList: [
          '355C7D', '725A7A', 'C56C86', 'FF7582'
        ]
      },
      {
        name: 'Fairy',
        id: 1,
        colorList: [
          'a163f7', '6f88fc', '45e3ff', 'ff7582'
        ]
      }
    ],
    gradlist: [
      {
        name: 'Warm Flame',
        id:0,
        gradList: [
          'ff9a9e', 'fad0c4'
        ]
      },
      {
        name: 'Night Fade',
        id:1,
        gradList: [
          'a18cd1', 'fbc2eb'
        ]
      }
    ],
    isColor:true,
    listAnimation:{},
    sysWid:0,
    buttonAnimation:{},
    touchDotX:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          sysWid: res.windowWidth
        })
      },
    });

    let colorFav = wx.getStorageSync("colorFav") || [];
    let gradientFav = wx.getStorageSync("gradientFav") || [];
    this.setData({
      colors: colorFav,
      gradlist: gradientFav
    })
  },

  // 改变列表动画
  switchList(e){

    let listAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out'
    });

    let buttonAnimation = wx.createAnimation({
      druation:300,
      timingFunction:'ease-out'
    })

    if(this.data.isColor){

      listAnimation.translateX(-this.data.sysWid).step();
      buttonAnimation.translateX( 50 / 750 * this.data.sysWid).step();

    }else{

      listAnimation.translateX(0).step();
      buttonAnimation.translateX(0).step();

    }
    
    this.setData({
      isColor:!this.data.isColor,
      listAnimation:listAnimation.export(),
      buttonAnimation: buttonAnimation.export()
    })

  },

  // 弹出顶部菜单
  showList(e) {

    var comp = this.selectComponent("#handleShowList");
    comp.popList({ popUp: false });

  },

  // 根据类型选择详细页名片
  showDetail(e){

    // console.log(e);
    let comp = this.selectComponent("#handleChangeColor");
    if(this.data.isColor){

      comp.changeDetail({ detailColor: e.currentTarget.dataset.color, popUp: false, isColor: this.data.isColor });

    }else{

      comp.changeDetail({ detailGrad: e.currentTarget.dataset.color, popUp: false, isColor: this.data.isColor });

    }

  },

  // 下拉刷新
  onPullDownRefresh(){

    wx.showLoading({
      title: 'Refresh',
    })
    let colorFav = wx.getStorageSync("colorFav") || [];
    let gradientFav = wx.getStorageSync("gradientFav") || [];
    this.setData({
      colors: colorFav,
      gradlist: gradientFav
    })

    // 停止刷新
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  // 返回顶部
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  // 捕捉屏幕移动
  onPageScroll: function (e) {

    if (e.scrollTop > 290) {

      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {

        const comp = this.selectComponent("#bButtom");
        comp.showButtom();

      }, 200)

    } else {

      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {

        const comp = this.selectComponent("#bButtom");
        comp.hideButtom();

      }, 200)
    }

  },

  touchstart(e){
    this.setData({
      touchDotX: e.touches[0].pageX
    })
  },

  touchend(e){

    // && is and || is or
    if ( ( this.data.touchDotX - e.changedTouches[0].pageX ) > 100 && this.data.isColor ){
      this.switchList();
    }

    if ((this.data.touchDotX - e.changedTouches[0].pageX) < -100 && !this.data.isColor) {
      this.switchList();
    }
  }

})