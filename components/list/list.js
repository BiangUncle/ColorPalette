// components/list/list.js
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
    popUp:true,
    showListAnimation:{},
    sysWid:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 显示属性值取反
    switchPop() {

      this.setData({
        popUp: !this.data.popUp
      })
      this.popListAnima();

    },

    // 从父组件调用操作
    popList(e){
      
      this.setData({
        popUp:e.popUp
      })

      this.popListAnima();

    },

    // 组件动动画选择器
    popListAnima(){

      const animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-out'
      })

      if(!this.data.popUp){
        animation.translateY(250 / 750 * this.data.sysWid).step();
      }else{
        animation.translateY(-250 / 750 * this.data.sysWid).step();
      }
      
      this.setData({
        showListAnimation: animation.export()
      })

    }
  },

  attached:function(){

    wx.getSystemInfo({

      success: (res) => {

        this.setData({
          sysWid : res.windowWidth
        })
    
      },
    });

  }

})
