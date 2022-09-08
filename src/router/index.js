import catchs from '../utils/catch'
import { ElMessage } from 'element-plus'

import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import Message from '../components/message/Message.vue'
import SystemNotice from '../components/message/SystemNotice.vue'
import Fabulous from '../components/message/Fabulous.vue'
import ReplyMe from '../components/message/ReplyMe.vue'
import VerifyMessage from '../components/message/VerifyMessage.vue'


const routes = [
  { path:'/',redirect:'/index'},
  { path:'/index',component: Index},
  { path:'/login',component: Login},
  { 
    path:'/message',
    redirect:'/message/system',
    component: Message,
    children:[
      {path:'system',component:SystemNotice},
      {path:'fabulous',component:Fabulous},
      {path:'replyMe',component:ReplyMe},
      {path:'verifyMessage',component:VerifyMessage},
    ]
  },
  {
    path:'/moment',
    component:()=>import('../components/moment/Moment.vue')
  },
  {
    path:'/administrators',
    component:()=>import('../components/administrater/index.vue'),
    redirect:'/administrators/sendMessage',
    children:[
      {path:'sendMessage',component:()=>import('../components/administrater/SendMessage.vue')},
      {path:'userControll',component:()=>import('../components/administrater/UserControll.vue')},
      {path:'momentControll',component:()=>import('../components/administrater/MomentControll.vue')},
      {path:'userAddres',component:()=>import('../components/administrater/UserAddress.vue')},
    ]
  },
  {
    path:'/userInfo',
    redirect:'/userInfo/myMessage',
    component:()=>import('../components/userInfo/userInfo.vue'),
    children:[
      {path:'myMessage',component:()=>import('../components/userInfo/MyMessage.vue')},
      {path:'myAvater',component:()=>import('../components/userInfo/MyAvater.vue')},
      {path:'myMoment',component:()=>import('../components/userInfo/MyMoment.vue')},
      {path:'acountSafe',component:()=>import('../components/userInfo/AccountSafe.vue')},
      {path:'invateRegist',component:()=>import('../components/userInfo/InvitatRegest.vue')},
    ]
  },
  {
    path:'/relax',
    name:'musicIndex',
    redirect:'/relax/music',
    component:()=>import('../components/compusService/index.vue'),
    children:[
      {path:'music',component:()=>import('../components/compusService/Recommend.vue')},
      {path:'songList',component:()=>import('../components/compusService/SongList.vue')}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from) => {
  // 返回 false 以取消导航
  // 未登录，跳转到登录页
  if(to.path == '/message/system'){
    if(!catchs.getCatch('token')){
      ElMessage.error('您还未登录，请先登录~')
      return '/login'
    }
  }
  
})



export default router