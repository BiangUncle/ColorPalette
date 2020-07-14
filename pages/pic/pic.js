// pages/pic/pic.js
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWeb:true,
    web:[
      { "id": 47, "name": "Material Design", "url": "https://ae01.alicdn.com/kf/H3f247da9247b4f0ea2a010e634baff82W.jpg", "img": "https://ae01.alicdn.com/kf/Ha6df5ec8244948b3a3233ddcaded9c36m.jpg", "tags": "Google", "connspeed": 50, "cost": 0, "lang": 1, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 48, "name": "apple design", "url": "https://developer.apple.com/design/", "img": "https://ae01.alicdn.com/kf/H3d6d948e3c61444ebfe638f77705c0442.jpg", "tags": "Apple", "connspeed": 50, "cost": 0, "lang": 1, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 49, "name": "Microsoft Design", "url": "https://www.microsoft.com/design", "img": "https://ae01.alicdn.com/kf/H02680074b49a4568a85f284a9b833c7fJ.jpg", "tags": "微软", "connspeed": 50, "cost": 0, "lang": 1, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 50, "name": "IBM Design", "url": "https://www.ibm.com/design/language/", "img": "https://ae01.alicdn.com/kf/H26b37b095939458e937101d57fff4549K.jpg", "tags": "IBM", "connspeed": 50, "cost": 0, "lang": 1, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 51, "name": "Ant Design", "url": "https://ant.design/index-cn", "img": "https://ae01.alicdn.com/kf/H41f4a2707fde4ba986420dd9825aa6c0G.jpg", "tags": "Ant", "connspeed": 100, "cost": 0, "lang": 0, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 52, "name": "Mobile Spoon", "url": "https://www.mobilespoon.net/", "img": "https://ae01.alicdn.com/kf/Hb8874ad3dfa14306bb71bc6a85301691k.jpg", "tags": "文章", "connspeed": 100, "cost": 0, "lang": 1, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 53, "name": "Adele", "url": "https://adele.uxpin.com/", "img": "https://ae01.alicdn.com/kf/Hd737d07c354f4ce3a58cb1c0510119b0E.jpg", "tags": "", "connspeed": 100, "cost": 0, "lang": 1, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 54, "name": "CheckList", "url": "https://www.checklist.design", "img": "https://ae01.alicdn.com/kf/H586c5616eb2f4e809da33afa1c5cc2983.jpg", "tags": "流程", "connspeed": 100, "cost": 0, "lang": 1, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 },
      { "id": 55, "name": "Alipay Design", "url": "https://design.alipay.com/", "img": "https://ae01.alicdn.com/kf/Hd0f6aee901104305bdab12df4d339aa7c.jpg", "tags": "阿里", "connspeed": 100, "cost": 0, "lang": 0, "resou": 100, "detail": "此刻我还没有写任何详细信息", "type": 10 }
    ],
    isDetail:true,
    listAnimation:{},
    itesm:1,
    scrollTop:0,
    isColor:true,
    change: false,
    type:'图标设计',
    startNumber: 0
  },
  onLoad: function () {
    this.getWebList();
  },

  async getWebList(){

    // http://localhost:8080/getWebsite?type=0
    const url = "/getWebsite?type=" + this.data.startNumber;
    // console.log(url);

    const res = await request({ url: url });
    
    if (res.length == 0) {
      wx.showToast({
        title: 'No More, Don`t click click',
        icon: 'none'
      })
      return;
    }
    // var isshow = {"isshow":false};
    for (var i = 0; i < res.length; i++) {
      res[i].isshow = false
    }

    this.setData({
      web:res
    })
    wx.stopPullDownRefresh();

  },

  toTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  onPageScroll: function (e) {

    // 防抖功能
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {

      //  绑定当前滑动值
      this.setData({
        scrollTop: e.scrollTop
      })

      // 传输滑动值到组件
      //const compSearch = this.selectComponent("#searchBar");
      //compSearch.setScrollTop({ scrollTop: e.scrollTop });

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

  showdetail(e){
    
    const idx = e.currentTarget.dataset.index;
    const aim = 'web[' + idx + '].isshow';
    // console.log(e);
    if(!this.data.web[idx].isshow){
      this.setData({
        [aim]: true
      })
    }else{
      this.setData({
        [aim]: false
      })
    }
    
  },
  // 显示列表
  showList(e) {

    var comp = this.selectComponent("#handleShowList");
    comp.popList({ popUp: false });

  },
  copyurl(){
    wx.showToast({
      title: '已复制',
      duration: 1000
    })
  },
  // 显示类型
  showtype(){

    this.setData({
      change:!this.data.change
    })

  },

  //改变样式
  choosetype(e){
    console.log(e);
    this.setData({
      type:e.currentTarget.dataset.name,
      startNumber: e.currentTarget.dataset.type
    })
    this.getWebList();
  },

  //显示信息详细页
  showDetail(e){
    // console.log(e);
    const id = e.currentTarget.dataset.item.id - 1 ;
    // 操作数据的高级操作
    const aim = "web[" + id  + "].show";

    // 判断是否合并
    if(e.currentTarget.dataset.item.show){
      this.setData({
        [aim]: false
      })
    }else{
      this.setData({
        [aim]: true,
      })
    }
    

  },

  copy(e){
    // console.log(e);
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success:()=>{
        wx.showToast({
          title: 'Copied the URL',
          icon: 'none'
        })
      }
    })
    
  },

  onPullDownRefresh() {
    this.setData({
      web: []
    })
    this.startNumber = 0;
    this.getWebList();
  },

})