function upLoadFiles(filearr,url,key){
  //数组的map方法将 数组的每一项转化 生成新的数组
  //将数组转化成一个个promise ，将生成的promise数组 加到Promise.all
  let promise = Promise.all(filearr.map((filePath,index)=>{
    return new Promise((resolve, reject)=>{
      wx.uploadFile({
        url: url,
        filePath: filePath,
        name: key,
        success(res){
          if (res.statusCode == 200){
            //每个结果都会汇集到 Promise.all
            resolve(res)
          }
        },
        fail(err){
          console.log(err);
          reject(false)
        }
      })
    })
  }));
  promise.then(function(resolve){
    console.log(resolve)
    // do something
  },function(fail){
    console.log(fail)
  });
  promise.catch(function(err){
    console.log(err)
  })
}