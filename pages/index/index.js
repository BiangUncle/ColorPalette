// pages/index/index.js
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: [
      { "name": "Palette 106", "id": 4, "colorList": ["ffbe86","ffe156","ffe9ce","ffb5c2","3777ff"], "tags": ["Palette 106"], "check_number": 5 },
      { "name": "Palette 111", "id": 5, "colorList": ["90f1ef","ffd6e0","ffef9f","ffef9f","c1fba4"], "tags": ["明亮,Palette 111","青春"], "check_number": 19 },
      { "name": "Palette120", "id": 6, "colorList": ["ff9fb2","fbdce2","0acdff","60ab9a","dedee0"], "tags": ["Palette120"], "check_number": 4 },
      { "name": "Palette 67", "id": 7, "colorList": ["7e6c6c","f87575","ffa9a3","b9e6ff","5c95ff"], "tags": ["Palette 67"], "check_number": 1 },
      { "name": "Palette109", "id": 8, "colorList": ["7776bc","cdc7e5","fffbdb","ffec51","ff674d"], "tags": ["Palette109"], "check_number": 0 },
      { "name": "Palette 82", "id": 9, "colorList": ["61a0af","96c9dc","f06c9b","f9b9b7","f5d491"], "tags": ["Palette 82"], "check_number": 0 },
      { "name": "Palette 116", "id": 10, "colorList": ["32cbff","00a5e4","89a1ef","ef9cda","fecef1"], "tags": ["Palette 116"], "check_number": 0 },
      { "name": "Palette 105", "id": 11, "colorList": ["826aed","c879ff","ffb7ff","3bf4fb","caff8a"], "tags": ["Palette 105"], "check_number": 0 },
      { "name": "Dopely 80", "id": 12, "colorList": ["60efdb","bef2e5","c5e7f1","79ceed","6f89a2"], "tags": ["Dopely 80"], "check_number": 0 },
      { "name": "Dopely 17", "id": 13, "colorList": ["86e3ce","d0e6a5","ffdd94","fa8978","ccabdb"], "tags": ["Dopely 17"], "check_number": 0 },
      { "name": "Dopely 87", "id": 14, "colorList": ["d6a3dc","f7db70","eabebf","75cce8","a5dee5"], "tags": ["Dopely 87"], "check_number": 1 }
    ],
    scrollTop: 0,
    popUp:true,
    isColor:true,
    isFix:false
  },

  startNumber:0,

  // 显示顶部列表
  showList(e){

    var comp = this.selectComponent("#handleShowList");
    comp.popList({ popUp: false });

  },

  // 显示详细信息
  showDetail(e){
    // console.log(e);
    let comp = this.selectComponent("#handleChangeColor");
    comp.changeDetail({ detailColor: e.currentTarget.dataset.color, popUp: false, isColor: this.data.isColor});
    this.increChN(e.currentTarget.dataset.color.id);
  },

  // 显示详细信息
  showSearchDetail(e) {
    // console.log(e);
    let comp = this.selectComponent("#handleChangeColor");
    comp.changeDetail({ detailColor: e.detail, popUp: false, isColor: this.data.isColor});
    this.increChN(e.detail.id);
    
  },

  async increChN(id){

    const url = "/increColorCkN?id=" + id;
    await request({ url: url });

  },
  // 返回顶部
  toTop(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  // 捕捉屏幕移动
  onPageScroll: function (e) {

    // 防抖功能
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {

      //  绑定当前滑动值
      this.setData({
        scrollTop: e.scrollTop
      })

      // 传输滑动值到组件
      const compSearch = this.selectComponent("#searchBar");
      compSearch.setScrollTop({ scrollTop: e.scrollTop });

      // 是否显示底部按钮
      if (e.scrollTop > 290) {
        const comp = this.selectComponent("#bButtom");
        comp.showButtom();
      } else {
        const comp = this.selectComponent("#bButtom");
        comp.hideButtom();
      }

    }, 200)

  },

  // 加载页面时访问数据库读取数据
  onLoad: function(){
    this.getColorList();
    
  },
  
  // 获取色卡
  async getColorList(){

    const url = "/getColorList?page=" + this.startNumber;
    const res = await request({ url: url});

    if(res.length == 0){
      wx.showToast({
        title: 'No More, Don`t click click',
        icon:'none'
      })
      return;
    }

    var colors = new Array();

    for( var i = 0 ; i < res.length ; i++ ){

      let temp = {        // 引用地址，所以放在循环外，temp始终是一个值
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
      colors.push(temp);

    }

    this.setData({
      colors: [...this.data.colors,...colors]
    })
    wx.stopPullDownRefresh();
  },

  // 下拉刷新
  onPullDownRefresh(){
    this.setData({
      colors:[]
    })
    this.startNumber = 0;
    this.getColorList();
  },

  //显示更多
  showMore(){
    // wx.showToast({
    //   title: '因协议问题，该功能未开放',
    //   icon: 'none',
    //   duration: 1500,
    // })
    // return;
    this.startNumber += 50;
    this.getColorList();
  }
  
})