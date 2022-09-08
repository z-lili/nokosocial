// 获取，保存，修改，清除本地缓存
class LocalCatch {
  // 保存
  saveCatch(key,value){
    window.localStorage.setItem(key,JSON.stringify(value))
  }
  // 获取
  getCatch(key){
    const value = window.localStorage.getItem(key)
    if(value){
      return JSON.parse(value)
    }
  }
  // 移除
  removeCatch(key){
    window.localStorage.removeItem(key)
  }
  // 清空
  clearCatch(){
    window.localStorage.clear()
  }
}

export default new LocalCatch