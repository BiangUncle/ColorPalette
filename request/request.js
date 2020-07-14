let ajaxTimes = 0;

export const request=(params)=>{

    ajaxTimes++;

    wx-wx.showLoading({
        title:'Loading',
        mask:true
    })

  const baseUrl = "http://biang.fun";

    return new Promise((resolve, reject)=>{

        wx.request({
            // 解构参数
            ...params,
          url: baseUrl + params.url ,
            
            success: (result) => {
                resolve(result.data);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0){
                    wx.hideLoading();
                }
            }
        })
    })
}