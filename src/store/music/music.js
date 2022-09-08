import { defineStore } from 'pinia'

export const musicStore = defineStore('music',{
  state:()=>{
    return {
      // 歌单id
      listId:0,
      // 歌曲信息
      songMessage:{
        name:'安和桥',
        al:{
          name:'安和桥北',
          picUrl:'https://p1.music.126.net/GcRunGm02vZBicYmIN6GXw==/109951163200249252.jpg'
        }
      },
      // 播放地址
      playList:'http://m801.music.126.net/20220905163446/bf0680629…e1/5cca/68b6/a5db805acb2d9e2a107100e16a0695df.mp3',
      // 控制自动播放
      flag:false
    }
  },
  getters:{
    // 每个函数接受一个可选参数：state状态对象
  },
  actions:{
    // 可以直接用this获取state里面的数据，必须是普通函数
    // 更改歌单id
    changeMusicListId(id){
      this.listId = id
    },
    changeSongMessage(val){
      this.songMessage = val
    },
    changePlayList(val){
      this.playList = val
    },
    changeFlag(val){
      this.flag = val
    },
  
  },
  persist:{
    // 开启持久化
    key:'musicListId',
    // storage:window.localStorage,
    paths:['listId',]
  }


  
})