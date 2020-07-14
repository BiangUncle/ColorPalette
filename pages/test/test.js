// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
  },

  // 显示详细信息
  showDetail(e) {

    console.log(e);
    let comp = this.selectComponent("#handleChangeColor");
    comp.changeDetail({popUp: false, isColor: this.data.isColor });

  },

  onPageScroll:function(e){

    // console.log(e);
    if(e.scrollTop > 500 ){

      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(()=>{
        const comp = this.selectComponent("#bButtom");
        comp.showButtom();
      },500)

    }else{

      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {
        const comp = this.selectComponent("#bButtom");
        comp.hideButtom();
      }, 500)
    }

  }

})