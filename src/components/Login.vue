<template>
  <!-- 登录与注册 -->
  <div class="login">
    <div class="loginAndregister">
      <!-- 覆盖在上面的盒子 -->
      <div class="cover-box" ref="coverBox">
        <h1>WELCOME</h1>
        <p>to nokosocial!</p>
        <p>Come and find the beauty in life with us</p>
        <h1 class="coverbox-h1">LOGIN NOW</h1>
        <div></div>
      </div>
      <!-- 注册的盒子 -->
      <div class="register">
        <div class="title">
          <h1>注册</h1>
        </div>
        <div class="input-box">
          <input v-model="userInfo.name" type="text" placeholder="请输入用户名(13位以下)" />
          <input v-model="userInfo.password" type="password" placeholder="请输入密码(字母开头，6-16位)" />
          <input v-model="userInfo.aginPassword" type="password" placeholder="再次输入密码" />
        </div>
        <div class="btn-box">
          <button @click="regist">注册</button>
          <p @click="moveToLeft">已有账号？去登录</p>
        </div>
      </div>
      <!-- 登录的盒子 -->
      <div class="login-form">
        <div class="title">
          <h1>登录</h1>
        </div>
        <div class="input-box">
          <input v-model="userMessages.userName" type="text" placeholder="请输入用户名" />
          <input v-model="userMessages.userPassword" type="password" placeholder="请输入密码" />
        </div>
        <div class="btn-box">
          <button @click="login">登录</button>
          <p @click="moveToRight">没有账号？去注册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginStore } from '../store/login/login.js'
import zlrequest from '../service/index.js'
import verfyLogin from '../utils/verifyLogin.js'

const router = useRouter()
const store = loginStore()
// 控制盒子移动 变色
const coverBox = ref()
const moveToRight = () => {
  coverBox.value.style.transform = 'translateX(100%)'
  coverBox.value.style.backgroundColor = '#f5d7d9'
}
const moveToLeft = () => {
  coverBox.value.style.transform = 'translateX(0%)'
  coverBox.value.style.backgroundColor = '#c9deee'
}

// 注册逻辑
const userInfo = ref({
  name: '',
  password: '',
  aginPassword: '',
})
const regist = async () => {
  // 调用校验函数
  const isVerify = verfyLogin.verfyReg(userInfo.value.name, userInfo.value.password, userInfo.value.aginPassword)
  if (isVerify === 'yes') {
    // 通过校验
    try {
      const res = await zlrequest.request({
        method: 'post',
        url: '/users',
        data: {
          name: userInfo.value.name,
          password: userInfo.value.password,
        },
      })
      if (res.status === 200) {
        ElMessage.success('注册成功,去登录吧~')
        moveToLeft()
        userInfo.value.name = ''
        userInfo.value.password = ''
        userInfo.value.aginPassword = ''
      } else {
        ElMessage.error('注册失败~')
      }
    } catch (err) {
      if (err.message == 'Request failed with status code 409') {
        ElMessage.error(err.response.data)
      } else {
        ElMessage.error(err.message)
      }
    }
  } else {
    ElMessage.error('注册失败~')
  }
}

// 登录逻辑
const userMessages = ref({
  userName: '',
  userPassword: '',
})
const login = async () => {
  const isVerifys = verfyLogin.verLogin(userMessages.value.userName, userMessages.value.userPassword)
  if (isVerifys !== 'yes') {
    return ElMessage.error('登录失败~')
  } else {
    // 通过校验
    try {
      const res = await zlrequest.request({
        method: 'post',
        url: '/login',
        data: {
          name: userMessages.value.userName,
          password: userMessages.value.userPassword,
        },
      })
      if (res.status === 200) {
        ElMessage.success('登录成功~')
        // 登录成功,保存用户信息(vuex,localStorage,直接用pinia插件)，页面跳转
        store.changeUserMessage(res.data.id, res.data.token)
        // 获取用户信息保存
        const uInfo = await zlrequest.request({
          method: 'get',
          url: `users/${res.data.id}`,
        })
        store.userInfo = uInfo.data
        router.replace('/index')
      }
    } catch (err) {
      if (err.message == 'Request failed with status code 400') {
        ElMessage.error(err.response.data)
      } else {
        ElMessage.error(err.message)
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.login {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100%;
  width: 100%;
  background-image: url('../assets/img/banner4.jpg');
  background-size: cover;
  background-position: center;
}

.loginAndregister {
  width: 768px;
  height: 480px;
  /* background-color: #fff; */
  backdrop-filter: blur(10px);
  border-radius: 9px;
  border: 1px solid rgba(2555, 255, 255, 0.6);
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
  overflow: hidden;
}

input {
  outline: none;
}

.register,
.login-form {
  /*    注意 两个盒子平分剩余空间 */
  flex: 1;
  height: 100%;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.title {
  height: 200px;
  line-height: 250px;
}

.title h1 {
  text-align: center;
  letter-spacing: 5px;
  /* color: #fff; */
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-box input {
  width: 63%;
  height: 35px;
  text-indent: 3px;
  border: 1px solid #b0cfe9;
  border-radius: 3px;
  margin-bottom: 20px;
}
.input-box input:focus {
  color: #b0cfe9;
}

.input-box input:focus::placeholder {
  /* 注意 */
  opacity: 0;
}

.btn-box {
  display: flex;
  justify-content: center;
}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid #fff;
}

.btn-box button {
  width: 90px;
  height: 35px;
  line-height: 30px;
  background-color: #69b3f0;
  color: #fff;
  border: none;
  border-radius: 3px;
  margin: 0 9px;
}
.btn-box button:hover {
  cursor: pointer;
  opacity: 0.8;
}
.btn-box p {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
}

.cover-box {
  position: absolute;
  /* 注意 */
  width: calc(768px / 2);
  height: 100%;
  left: 0;
  top: 0;
  border: 3px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  background-color: #c9deee;
  color: #fff;
  transition: 0.5s ease-in-out;
}
.cover-box h1 {
  margin-top: 100px;
  text-align: center;
  letter-spacing: 4px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

.cover-box .coverbox-h1 {
  margin-top: 30px;
}

.cover-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}
</style>
