<template>
  <div class="myAvater">
    <PublicHeader :headerTitle="title"></PublicHeader>
    <div class="avaterContain">
      <div class="containBox">
        <div class="box-avater">
          <el-avatar :size="96" :src="avaterUrl" />
        </div>
        <div class="box-changeAvater">
          <el-upload :on-exceed="handleExceed" :http-request="uploadAction" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <div v-if="isChangeAvater" class="box-text">上传头像</div>
            <div v-else class="box-text">修改头像</div>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import PublicHeader from './PublicHeader.vue'
import { loginStore } from '../../store/login/login'
import zlrequest from '../../service'

const store = loginStore()
const router = useRouter()
const title = ref('我的头像')
const avaterUrl = ref()

// 用户id
const userId = ref(store.uid)
// 用户信息
const userInfo = ref()

// 是否显示修改头像
const isChangeAvater = ref()
// 上传头像还是修改头像（接收不同的函数）
let uploadAction = ref()

// 获取用户信息
const userMessage = async (userId) => {
  const res = await zlrequest.request({
    method: 'get',
    url: `users/${userId}`,
  })
  userInfo.value = res.data
  if (userInfo.value.avater_url) {
    // 如果用户有头像
    isChangeAvater.value = false
    avaterUrl.value = userInfo.value.avater_url
    // 可修改头像
    uploadAction.value = uploadActionB
  } else {
    // 用户无头像
    isChangeAvater.value = true
    avaterUrl.value = '/src/assets/img/defaultAvater.jpg'
    // 可上传头像
    uploadAction.value = uploadActionA
  }
}
userMessage(userId.value)

// 头像上传逻辑
// 当超出限制时，执行的钩子函数
const handleExceed = (files, fileList) => {
  if (fileList.length >= 1) {
    ElMessage.error('只能上传一个图片')
    return
  }
}
// 上传前的校验
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片必须是JPG格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片的大小不能超过2M!')
    return false
  }
  return true
}
// 上传操作
const uploadActionA = async (option) => {
  try {
    let param = new FormData()
    param.append('file', option.file)
    const res = await zlrequest.request({
      method: 'post',
      url: '/upload/avater',
      data: param,
    })
    if (res.status == 200) {
      ElMessage.success('上传头像成功~')
      router.go(0)
      // console.log(res.data)
    } else {
      ElMessage.error('上传头像失败~')
    }
  } catch (err) {
    console.log(err)
  }
}

// 修改头像
const uploadActionB = async (option) => {
  try {
    let param = new FormData()
    param.append('file', option.file)
    const res = await zlrequest.request({
      method: 'patch',
      url: '/users/change/avater',
      data: param,
    })
    if (res.status == 200) {
      ElMessage.success('修改头像成功~')
      router.go(0)
      // console.log(res.data)
    } else {
      ElMessage.error('上传头像失败~')
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
.myAvater {
  width: 100%;
}
.avaterContain {
  width: 100%;
}
.containBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 100px;
}
.box-avater {
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden;
}
.box-changeAvater {
  cursor: pointer;
  position: absolute;
  top: 122px;
  right: -27px;
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background-color: #00a1d6;
  color: #fff;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-changeAvater:hover {
  opacity: 0.8;
}
.box-text {
  width: 28px;
  height: 36px;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
}
</style>
