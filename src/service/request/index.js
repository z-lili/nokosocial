import axios from 'axios'


class SocialRequest{
  instance
  constructor(config,requestInterceptors,responceInterceptors){
    this.instance = axios.create(config)
    if(requestInterceptors){
      this.instance.interceptors.request.use(requestInterceptors)
    }
    if(responceInterceptors){
      this.instance.interceptors.response.use(responceInterceptors)
    }
  }
  // 请求,实际调用的时候还需传入配置
  request(config2){
    return new Promise((resolve,reject)=>{
      this.instance.request(config2).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
}


export default SocialRequest