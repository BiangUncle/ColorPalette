
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Component({
 
  properties: {

    //初始化是否为color组
    isColor:{
      type:Boolean,
      value:true
    },

  },

  data: {

    colorDetail:{
      name: 'Sunset',
      id: 0,
      colorList: [
        '355C7D', '725A7A', 'C56C86', 'FF7582','123446'
      ],
      isFav:false
    },
    popUp:true,
    gradDetail:{
      name: 'Warm Flame',
      id:0,
      gradList: [
        'ff9a9e', 'fad0c4'
      ],
      isFav: false
    },
    showDetailAnimation:{},
    sysWid:0,
    isFav:false,
    currentId:0,
    tags:['111','nb','55open','start','sun','中文','好帅啊','123456','789456'],
    addtag:false,
    inputValue:""

  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 从父组件接受属性值
    changeDetail(e){
      
      // console.log(e);
      this.setData({
        isColor: e.isColor,
        popUp: e.popUp
      })
      /**
       * 显示详细页
       * 1.从缓存服务器里面遍历，如果是缓存里面的
       * isfav 就设置成true，如果没有则为false
       * 
       * 未收藏状态，
       * 点击收藏之后加入缓存
       * 
       * 以收藏情况下，
       * 点击收藏之后从缓存去除
       * 
       */

      if (this.properties.isColor) {

        this.setData({
          colorDetail: e.detailColor,
          currentId:e.detailColor.id,
          tags:e.detailColor.tags
        })

        let colorFav = wx.getStorageSync("colorFav") || [];
        const index = colorFav.findIndex(v => this.data.currentId === v.id);
        if (index === -1) {
          this.setData({
            isFav: false
          })
        } else {
          this.setData({
            isFav: true
          })
        }

      }else{

        this.setData({
          gradDetail: e.detailGrad,
          currentId: e.detailGrad.id,
          tags: e.detailGrad.tags
        })

        let gradientFav = wx.getStorageSync("gradientFav") || [];
        const index = gradientFav.findIndex(v => this.data.currentId === v.id);
        if (index === -1) {
          this.setData({
            isFav: false
          })
        }else{
          this.setData({
            isFav: true
          })
        }
        
      }

      this.popUp();

    },
    
    // 显示属性值取反
    switchPop() {

      this.setData({
        popUp:!this.data.popUp,
        addtag:false
      })
      this.popUp();
    },

    // 改变detial页面的弹入 弹出
    popUp:function(){

      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-out'
      });
      
      if (!this.data.popUp) {
        animation.translateX(this.data.sysWid).step();
      }else{
        animation.translateX(0).step();
      }
      
      this.setData({
        showDetailAnimation: animation.export()
      })
    },

    // 加入收藏
    addToFav(e){
     
      //如果未收藏
      if(!this.data.isFav){

        this.setData({
          isFav: true
        })

        if (this.properties.isColor) {

          let colorFav = wx.getStorageSync("colorFav") || [];
          colorFav.push(this.data.colorDetail);
          wx.setStorageSync("colorFav", colorFav);
          
        } else {

          let gradientFav = wx.getStorageSync("gradientFav") || [];
          gradientFav.push(this.data.gradDetail);
          wx.setStorageSync("gradientFav", gradientFav);

        }
        wx.showToast({
          title: 'Favorited',
        })

      }else{

        this.setData({
          isFav: false
        })

        if (this.properties.isColor) {

          let colorFav = wx.getStorageSync("colorFav") || [];
          const index = colorFav.findIndex(v => this.data.currentId === v.id);
          colorFav.splice(index, 1);
          wx.setStorageSync("colorFav", colorFav);

        }else{
          
          let gradientFav = wx.getStorageSync("gradientFav") || [];
          const index = gradientFav.findIndex(v => this.data.currentId === v.id);
          gradientFav.splice(index, 1);
          wx.setStorageSync("gradientFav", gradientFav);

        }
        
        wx.showToast({
          title: 'Unfavorited',
        })

      }
      
      
    },

    // 粘贴到剪贴板
    colorCopyToClipBoard(e){

      wx.setClipboardData({
        data: '{{e.currentTarget.dataset.color}}',
        success:(res)=>{
          wx.showToast({
            title: 'Copied',
          })
        }
      })
    },

    gradCopyToClipBoard(e){

      let str = this.data.gradDetail.grad[0] + " - > " + this.data.gradDetail.grad[1];

      wx.setClipboardData({
        data: str,
        success: (res) => {
          wx.showToast({
            title: 'Copied',
          })
        }
      })

    },

    async addtag(e){
      wx.showToast({
        title: '因协议问题，该功能未开放',
        icon: 'none',
        duration: 1500,
      })
      return;
      if(!this.data.addtag){
        this.setData({
          addtag: !this.data.addtag
        })
      }else{
        // console.log(this.data.inputValue)
        // http://biang.fun/insertColorTag?id=1&tag=123
        // http://biang.fun/insertGradTag?id=1&tag=123
        if(this.properties.isColor){
          const id = this.data.colorDetail.id;
          const tag = this.data.inputValue;
          const url = "/insertColorTag?id=" + id + "&tag=" + tag ;
          // console.log(url);
          await request({ url : url });
        }else{
          const id = this.data.gradDetail.id;
          const tag = this.data.inputValue;
          const url = "/insertGradTag?id=" + id + "&tag=" + tag;
          // console.log(url);
          await request({ url: url });
        }
        this.setData({
          addtag: !this.data.addtag
        })
        wx.showToast({
          title: 'Add Success!',
          icon:'success'
        })
      }
      
    },

    changeContent(e) {

      // 清楚上一个请求的定时器
      clearTimeout(this.timeout);

      // 开启定时器
      this.timeout = setTimeout(() => {

        this.setData({
          inputValue: e.detail.value
        })
        
      }, 200);

      // console.log(e);
    },
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
