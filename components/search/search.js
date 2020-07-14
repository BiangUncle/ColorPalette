// components/search/search.js

import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isColor:{
      type: Boolean,
      value: true
    },
    isWeb:{
      type: Boolean,
      value: false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchAnimation:{},
    searchInputAnimation:{},
    popUp:true,
    sysWid:0,
    scrollTop:0,
    searchItem:{},
    inputValue:"",
    focus:false
  },
  timeout:-1,
  /**
   * 组件的方法列表
   */
  methods: {

    // 取消输入
    switchPop() {

      // 因为input和close在同一个图层，产生了两次触碰
      clearTimeout(this.timeout);

      // 开启定时器
      this.timeout = setTimeout(() => {

        this.setData({
          popUp: !this.data.popUp,
          searchItem: {},
          inputValue: "",
          focus: false
        })
        this.moveAnimation();

      }, 50);

    },

    // 正在输入
    handleInput(e){
      // wx.showToast({
      //   title: '因协议问题，该功能未开放',
      //   icon: 'none',
      //   duration: 1500,
      // })
      // return;
      if(!this.data.popUp){
        return;
      }
      this.setData({
        popUp: !this.data.popUp
      })
      this.moveAnimation();     
    },

    changeContent(e){

      
      
      // 清楚上一个请求的定时器
      clearTimeout(this.timeout);

      // 开启定时器
      this.timeout = setTimeout(() => {

        // console.log(e);
        const value = e.detail.value;
        this.qsearch(value); 
        // console.log("send!" + value);

      }, 1000);

      // console.log(e);
    },

    async qsearch(value) {

      if(!this.properties.isWeb){

        if (this.properties.isColor) {
          var url = "/searchColorByTag?tag=" + value;
        } else {
          var url = "/searchGradByTag?tag=" + value;
        }

      }else{

        var url = "/searchWebByTag?tag=" + value;
        
      }
      
      
      // console.log(url);
      const res = await request({ url: url });

      if (res.length == 0) {
        wx.showToast({
          title: 'No Info',
          icon: 'none'
        })
        this.setData({
          searchItem: {}
        })
        return;
      }

      var result = new Array();

      if (!this.properties.isWeb) {

        if (this.properties.isColor) {

          for (var i = 0; i < res.length; i++) {

            let temp = {        
              name: 'Sunset',
              id: 0,
              colorList: [
                '355C7D', '725A7A', 'C56C86', 'FF7582'
              ],
              tags: [],
              isFav: false
            }
            temp.name = res[i].name;
            temp.id = res[i].id;
            temp.colorList = res[i].colors.split(',');
            temp.tags = res[i].tags.split(',');
            result.push(temp);

          }

        } else {
          
          for (var i = 0; i < res.length; i++) {

            let temp = {        // 引用地址，所以放在循环外，temp始终是一个值
              name: 'Sunset',
              id: 0,
              gradList: [
                '355C7D', '725A7A'
              ],
              tags: [],
              isFav: false
            }
            temp.name = res[i].name;
            temp.id = res[i].id;
            temp.gradList = res[i].grads.split(',');
            temp.tags = res[i].tags.split(',');
            result.push(temp);

          }
        }

      } else {

        for (var i = 0; i < res.length; i++) {

          let temp = {        // 引用地址，所以放在循环外，temp始终是一个值
            name: 'Sunset',
            id: 0,
            url: "",
            logo: "",
            detail: "",
            tags: [],
            show: false
          }
          temp.name = res[i].name;
          temp.id = res[i].id;
          temp.url = res[i].url;
          temp.logo = res[i].logourl;
          temp.tags = res[i].tags.split(',');
          temp.detail = res[i].detail;
          result.push(temp);

        }

      }
      // console.log(res);

      this.setData({
        searchItem: result
      })

      // console.log(this.data.searchItem);
    },

    // 搜索框动画
    moveAnimation(){

      // console.log("!");
      const animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })

      const inputAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })

      if (!this.data.popUp) {

        animation.translateY(- (450 / 750 * this.data.sysWid - this.data.scrollTop) ).step();
        inputAnimation.width('90%').step();

      }else{

        animation.translateY(0).step();
        inputAnimation.width('70%').step();

      }

      this.setData({

        searchAnimation: animation.export()

      })

      // 延迟动画
      this.TimeId = setTimeout(() => {
        this.setData({

          searchInputAnimation: inputAnimation.export()

        })

      }, 200)

    },

    // 获得滑动值
    setScrollTop(e){
      this.setData({
        scrollTop: e.scrollTop
      })
    },

    // 显示详情
    showDetail(e){
      // console.log(e);
      this.triggerEvent("showDetail",e.currentTarget.dataset.color);
    },

    copyinfo: function (e) {
      // console.log(e);
      wx.setClipboardData({
        data: e.currentTarget.dataset.url,
        success: () => {
          wx.showToast({
            title: 'Copied the URL',
            icon: 'none'
          })
        }
      })
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

  },

})
