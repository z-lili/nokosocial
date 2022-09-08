import { defineStore } from 'pinia'

export const loginStore = defineStore('login',{
  state:()=>{
    return {
      // 用户信息
      uid:'',
      utoken:'',
      userInfo:{}
    }
  },
  getters:{
    // 每个函数接受一个可选参数：state状态对象
  },
  actions:{
    // 可以直接用this获取state里面的数据，必须是普通函数
    // 更改用户信息
    changeUserMessage(uid,token){
      this.uid = uid
      this.utoken = token
      console.log(this.utoken)
    },
    chageUserInfo(userObj){
      this.userInfo = userObj
    }

  
  },
  persist:{
    // 开启持久化
    key:'token',
    // storage:window.localStorage,
    paths:['utoken','uid','userInfo']
  }


  
})