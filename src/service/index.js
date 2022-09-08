import { def } from '@vue/shared'
import SocialRequest from './request/index.js'
import catchs from '../utils/catch.js'

// 加载动画
let loadAn
let num = 0
let setInterval = (() => {
  num++
}, 2000);
const loadAnmite = ()=>{
  const res = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  return res
}

const zlrequest = new SocialRequest({
  baseURL:'/api'
},function(config){
  // loadAn = loadAnmite()
  // 如果用户登录，请求拦截器添加token
  if(catchs.getCatch('token')){
    config.headers.Authorization = `Bearer ${catchs.getCatch('token').utoken}`
  }
  return config
},function(config){
  // if(num>2){
  //   loadAn.close()
  // }else {
  //   setTimeout(() => {
  //     loadAn.close()
  //   }, 1000);
  // }
  return config
})

// 网易云api
const zlrequest2 = new SocialRequest({
  baseURL:'http://localhost:3000'
})

export default zlrequest
export {
  zlrequest2
}