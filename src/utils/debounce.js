// 防抖
function debounce(fn,time,triggleNow){
  let t = null
  return function(){
    let _this = this
    let arg = arguments 
    if(t){
      clearTimeout(t)
    }
    // 是否第一次不延时
    if(triggleNow){
      let isFirstClick = !t
      // 第一次点击
      if(isFirstClick){
        fn.apply( _this,arg)
      }
      t = setTimeout(()=>{
        t = null
      },time)
    }else{
      t = setTimeout(() => {
        fn.apply( _this,arg)
      }, time);
    }
  }
}

export default debounce