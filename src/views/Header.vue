<template>
  <!-- 导航栏 -->
  <div class="header-box">
    <div class="header">
      <div class="title">Nokosocial</div>
      <ul class="right">
        <li @click="toIndex"><a href="javascript:void;">首页</a></li>
        <li @click="toMoment"><a href="javascript:void;">动态</a></li>
        <li @click="toMessage"><a href="javascript:void;">消息</a></li>
        <li @click="compusService"><a href="javascript:void;">轻松一刻</a></li>
        <li v-if="isAdmin == '1'" @click="toAdmin"><a href="javascript:void;">管理员权限</a></li>
        <li v-if="!utoken" @click="toLogin"><a href="javascript:void;">登录/注册</a></li>
        <li v-else>
          <a href="javascript:void;">{{ userInfo.name }}</a>
          <el-avatar @click="toUserDetail" class="avater" :size="40" :src="avaterUrl" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { loginStore } from '../store/login/login.js'
import catchs from '../utils/catch'

const router = useRouter()
const store = loginStore()

const avaterUrl = ref()
// 获取用户信息
const { userInfo } = storeToRefs(store)
const isAdmin = ref()
if (userInfo.value) {
  isAdmin.value = userInfo.value.isAdministrator
}
if (userInfo.value.avater_url) {
  avaterUrl.value = userInfo.value.avater_url
} else {
  avaterUrl.value = `/src/assets/img/defaultAvater.jpg`
}
console.log(userInfo.value)

// 获取token
const utoken = ref('')
if (catchs.getCatch('token')) {
  utoken.value = catchs.getCatch('token').utoken
}

// 去首页
const toIndex = () => {
  router.push('/index')
}
// 去登录页面
const toLogin = () => {
  router.push('/login')
}
// 去消息页面
const toMessage = () => {
  router.push('/message')
}
// 去动态页面
const toMoment = () => {
  router.push('/moment')
}
// 去用户详情
const toUserDetail = () => {
  router.push('/userInfo')
}
// 去管理员页面
const toAdmin = () => {
  router.push('/administrators')
}
// 去娱乐
const compusService = () => {
  router.push('/relax')
}
</script>

<style scoped>
.header-box {
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 70px;
  line-height: 70px;
}
.title {
  cursor: pointer;
  color: #fff;
  font-size: 28px;
}
.right {
  display: flex;
}
.right li {
  display: inline-block;
  cursor: pointer;
  margin-left: 50px;
  display: flex;
  align-items: center;
}

.right li a {
  color: #fff;
  text-decoration: none;
  position: relative;
}

.right li a::after {
  content: '';
  width: 0;
  height: 4px;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%);
  background: #02b8ee;
  transition: all 0.3s;
}

.right li a:hover::after {
  width: 100%;
}
.avater {
  margin-left: 10px;
}
</style>
