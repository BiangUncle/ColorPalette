// components/bottomButtom/bb.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isOpen:true,
    popUp:true,
    showAnimation:{},
    sysWid:0,
    moveAnimation:{},
    showButtom:false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    openList(){

      let showAnimation = wx.createAnimation({
        duration: 300,
        timingFunction:'ease-out'
      })
      showAnimation.width(180 * this.data.sysWid / 750).step();

      this.setData({
        isOpen:false,
        popUp: false,
        showAnimation: showAnimation.export()
      })

    },


    closeList(){

      let showAnimation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      })
      showAnimation.width(90 * this.data.sysWid / 750).step();

      this.setData({
        isOpen: true,
        showAnimation: showAnimation.export()
      })

    },

    showButtom(){
      if(!this.data.showButtom){
        this.setData({
          showButtom: !this.data.showButtom
        })
        //触发动画

        const moveAnimation = wx.createAnimation({
          duration: 300,
          timingFunction:'ease-out'
        })

        moveAnimation.translateY( - 50 * 750 / this.data.sysWid).step();

        this.setData({
          moveAnimation: moveAnimation.export()
        })

      }
    },

    hideButtom(){

      if (this.data.showButtom) {
        this.setData({
          showButtom: !this.data.showButtom
        })
        //触发动画

        const moveAnimation = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease-out'
        })

        moveAnimation.translateY(0).step();
      
        this.setData({
          popUp: true,
          moveAnimation: moveAnimation.export()
        })

        this.closeList();

      }
    },

    // 显示列表
    showList(){
      this.triggerEvent("showList");
    },

    // 返回顶部
    toTop(){
      
      this.triggerEvent("toTop")
    }
  },

  // 获取屏幕尺寸
  attached: function () {

    wx.getSystemInfo({

      success: (res) => {

        this.setData({
          sysWid: res.windowWidth
        })

      },
    });

  }
})
