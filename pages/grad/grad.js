// pages/grad/grad.js
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradlist:[
      { "name": "Warm Flame", "id": 1, "gradList": ["ff9a9e","fad0c4"], "tags": ["warm"], "check_number": 9 },
      { "name": "Night Fade", "id": 2, "gradList": ["a18cd1","fbc2eb"], "tags": ["night,fade"], "check_number": 1 },
      { "name": "Juicy Peach", "id": 5, "gradList": ["ffecd2","fcb69f"], "tags": ["Juicy Peach"], "check_number": 5 },
      { "name": "Lady Lips", "id": 6, "gradList": ["ff9a9e","fecfef"], "tags": ["Lady Lips"], "check_number": 4 },
      { "name": "Sunny Morning", "id": 7, "gradList": ["f6d365","fda085"], "tags": ["Sunny Morning"], "check_number": 1 },
      { "name": "Rainy Ashville", "id": 8, "gradList": ["fbc2eb","a6c1ee"], "tags": ["Rainy Ashville"], "check_number": 2 },
      { "name": "Deep Blue", "id": 9, "gradList": ["e0c3fc","8ec5fc"], "tags": ["Deep Blue"], "check_number": 0 },
      { "name": "Ripe Malinka", "id": 10, "gradList": ["f093fb","f5576c"], "tags": ["Ripe Malinka"], "check_number": 7 }
      ],
    detailAnimation:{},
    isColor:false,
    scrollTop:0
  },
  startNumber:0,

  // 显示详细页
  showDetail(e){
    
    // console.log(e);
    // 传数据到组件
    var comp = this.selectComponent("#handleChangeColor");
    comp.changeDetail({ detailGrad: e.currentTarget.dataset.color, popUp: false, isColor: this.data.isColor});
    this.increChN(e.currentTarget.dataset.color.id);

  },

  // 显示详细信息
  showSearchDetail(e) {
    // console.log(e);
    let comp = this.selectComponent("#handleChangeColor");
    comp.changeDetail({ detailGrad: e.detail, popUp: false, isColor: this.data.isColor });
    this.increChN(e.detail.id);

  },

  // 弹出顶部菜单
  showList(e){
    
    var comp = this.selectComponent("#handleShowList");
    comp.popList({popUp: false });

  },

  async increChN(id) {

    const url = "/increGradCkN?id=" + id;
    await request({ url: url });

  },

  // 返回顶部
  toTop() {
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
  onLoad: function () {

    this.getGradList();

  },

  // 获取色卡
  async getGradList() {

    const url = "/getGradList?page=" + this.startNumber;
    const res = await request({ url: url });
    if (res.length == 0) {
      wx.showToast({
        title: 'No More, Don`t click click',
        icon: 'none'
      })
      return;
    }

    var gradlist = new Array();

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
      gradlist.push(temp);

    }
    
    this.setData({
      gradlist: [...this.data.gradlist, ...gradlist]
    })
    wx.stopPullDownRefresh();
  },

  // 下拉刷新
  onPullDownRefresh() {

    this.setData({
      gradlist: []
    })
    this.startNumber = 0;
    this.getGradList();

  },

  //显示更多
  showMore() {
    // wx.showToast({
    //   title: '因协议问题，该功能未开放',
    //   icon: 'none',
    //   duration: 1500,
    // })
    // return;
    this.startNumber += 50;
    this.getGradList();

  }

})