<template>
  <div class="moment">
    <Header></Header>
    <div class="momentBox">
      <div class="momentBox-contain">
        <!-- 左侧个人信息 -->
        <div class="moment-left">
          <div class="moment-left-user">
            <div class="left-user-background"></div>
            <div class="left-user-message">
              <el-avatar class="leftAvater" :size="50" :src="userInfo.avater_url ? userInfo.avater_url : leftUserImg" />
              <div class="leftUsername">{{ userInfo.name }}</div>
              <div class="left-user-message-bottom">
                <div class="left-bottom-info">
                  <div class="left-bottom-info-detail">
                    <span class="bottom-info-num" style="font-weight: 600">12</span>
                    <span class="bottom-info-mess" style="color: #ccc">好友</span>
                  </div>
                  <div class="left-bottom-info-detail">
                    <span class="bottom-info-num" style="font-weight: 600">18</span>
                    <span class="bottom-info-mess" style="color: #ccc">动态</span>
                  </div>
                  <div class="left-bottom-info-detail">
                    <span class="bottom-info-num" style="font-weight: 600">782</span>
                    <span class="bottom-info-mess" style="color: #ccc">点赞</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中间核心区域 -->
        <div class="moment-center">
          <!-- 发动态Box -->
          <div class="sendMomentBox">
            <div class="sendMomentBox-topic"><i class="iconfont icon-huati"></i>选择话题</div>
            <!-- 发布动态text盒子 -->
            <div ref="sendTextRef" class="sendMomentBoxText" contenteditable="true"></div>
            <div class="sendMomentBox-icon">
              <div class="icon-left">
                <!-- 选择表情 -->
                <V3Emoji :recent="true" @click-emoji="appendText">
                  <i class="iconfont icon-biaoqing sendMomentIcon"></i>
                </V3Emoji>
                <!-- 图片上传 -->
                <el-popover placement="bottom" title="选择图片" trigger="click" width="500px">
                  <template #reference>
                    <i class="iconfont icon-tupian sendMomentIcon"></i>
                  </template>
                  <el-upload action="#" :on-change="onChange" :on-remove="onimgRemove" list-type="picture-card" ref="uploadRef" class="upload-demo" :auto-upload="false">
                    <template #trigger>
                      <!-- 点击选择图片 -->
                      <i class="iconfont icon-jia selectIcon"></i>
                    </template>
                    <template #tip>
                      <div class="el-upload__tip">最多只能选择四张图片哦</div>
                    </template>
                  </el-upload>
                </el-popover>
                <i class="iconfont icon-at sendMomentIcon"></i>
              </div>
              <div class="icon-right">
                <button @click="PublishTrends">发布</button>
              </div>
            </div>
          </div>
          <!-- 动态 -->
          <div v-infinite-scroll="loads" infinite-scroll-distance="1" class="center-moment">
            <!-- 使用自定义的动态组价 -->
            <template v-for="item in momentListData" :key="item.id">
              <ZmomentVue :momentData="item" :showReport="showReport"></ZmomentVue>
            </template>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="moment-right">
          <MomentRightVue></MomentRightVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { loginStore } from '../../store/login/login'
import { storeToRefs } from 'pinia'
import Header from '../../views/Header.vue'
import ZmomentVue from '../../baseUi/baseMoment/Zmoment.vue'
import MomentRightVue from './MomentRight.vue'
import zlrequest from '../../service'
import { formatDate } from '@vueuse/core'
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'

const leftUserImg = ref('/src/assets/img/jiege.webp')
const momentAvater = ref('/src/assets/img/momentAvater.webp')

// 发动态的盒子ref
const sendTextRef = ref()
// uploadRef
const uploadRef = ref()

const showReport = ref(true)

// 个人信息
const store = loginStore()
const { userInfo } = storeToRefs(store)

// 点击发布动态
const PublishTrends = async () => {
  // 先发表动态，成功后再上传动态配图
  try {
    if (sendTextRef.value.innerHTML.length > 200) {
      // console.log(sendTextRef.value.innerHTML.length)
      ElMessage.error('字数不能大于200哦~')
      return
    } else if (sendTextRef.value.innerHTML.length == null || sendTextRef.value.innerHTML.length == '') {
      ElMessage.error('内容不能为空哦~')
      return
    }
    const res = await zlrequest.request({
      method: 'post',
      url: '/moment',
      data: {
        content: sendTextRef.value.innerHTML,
      },
    })
    // 上传动态成功，如果有图片的话，上传图片
    if (res.status == 200 && imgParagram.getAll('picture').length != 0) {
      let momentId = res.data.insertId
      await uploadMomentImg(momentId)
      ElMessage.success('上传动态成功~')
      sendTextRef.value.innerHTML = ''
      imgParagram.delete(`picture`)
      onimgRemove()
      // 动态和配图都上传完成，重新获取动态列表数据
      momentListData.value = []
      getMomentList(0)
    } else {
      ElMessage.success('上传动态成功~')
      sendTextRef.value.innerHTML = ''
      // 动态和配图都上传完成，重新获取动态列表数据
      momentListData.value = []
      getMomentList(0)
    }
  } catch (err) {
    console.log(err)
  }
}

// 选中要上传的图片
let imgParagram = new FormData()
const onChange = (file) => {
  // 将图片添加到FormData对象中
  imgParagram.append(`picture`, file.raw)
  // console.log(imgParagram.getAll('picture'))
}

// 上传动态配图逻辑
const uploadMomentImg = async (momentId) => {
  const res = await zlrequest.request({
    method: 'post',
    url: `upload/picture?momentid=${momentId}`,
    data: imgParagram,
  })
  if (res.status != 200) {
    ElMessage.error('上传图片失败~')
    return Promise.reject()
  } else {
    return Promise.resolve()
  }
}
// 删除picture后的操作
const onimgRemove = (uploadFile) => {
  imgParagram.delete(`picture`)
}

// 点击emoji触发的事件
const appendText = (val) => {
  sendTextRef.value.innerHTML = sendTextRef.value.innerHTML + val
}

// 获取动态列表数据
const momentListData = ref([])
const getMomentList = async (offset) => {
  try {
    const res = await zlrequest.request({
      method: 'get',
      url: `/moment?offset=${offset}&size=5`,
    })
    momentListData.value = [...momentListData.value, ...res.data]
    if (res.data.length == 0) {
      ElMessage.warning('没数据了捏')
    }
  } catch (err) {
    console.log(err)
  }
}
getMomentList(0)

// 滚动到底部加载数据
let offsetNum = ref(0)
const loads = () => {
  offsetNum.value += 5
  getMomentList(offsetNum.value)
}
</script>

<style scoped>
.moment {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent), url('../../assets/img/background.png');
  background-size: cover;
  background-position: center;
  background-attachment: local;
}
.momentBox {
  width: 100%;
  height: calc(100% - 71px);
  display: flex;
  justify-content: center;
}
.momentBox-contain {
  width: 80%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.5); */
  display: flex;
  justify-content: space-between;
}
.moment-left {
  width: 244px;
  height: 176px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
}
.moment-center {
  flex: 1;
  height: 100%;
  /* background-color: skyblue; */
  padding: 10px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
}
.moment-right {
  margin-top: 10px;
  width: 268px;
}
.left-user-background {
  width: 100%;
  height: 64px;
  background-image: url('../../assets/img/moment-left-user.webp');
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
.left-user-message {
  width: 244px;
  height: 112px;
  /* background-color: pink; */
  position: relative;
  display: flex;
  flex-direction: column;
}
.leftAvater {
  position: absolute;
  left: 25px;
  top: -14px;
}
.leftUsername {
  width: 100%;
  padding-left: 80px;
  padding-top: 7px;
}
.left-user-message-bottom {
  width: 100%;
  flex: 1;
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-bottom-info {
  margin-top: 19px;
  width: 192px;
  height: 50px;
  /* background-color: pink; */
  display: flex;
}
.left-bottom-info-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.left-bottom-info-detail:hover {
  color: #00aeec;
  cursor: pointer;
}
.bottom-info-num {
  font-size: 14px;
}
.bottom-info-mess {
  font-size: 14px;
}
.sendMomentBox {
  width: 100%;
  /* height: 130px; */
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}
.sendMomentBox-topic {
  padding: 3px;
  border-radius: 20px;
  background-color: #f6f7f8;
  color: #9499a0;
  width: 90px;
  margin-bottom: 7px;
}
.sendMomentBoxText {
  width: 100%;
  min-height: 22px;
  max-height: 400px;
  font-size: 14px;
  outline: 0;
  line-height: 24px;
  padding: 2px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  /* border: 1px solid #ccc; */
  letter-spacing: 1px;
  position: relative;
}

/* .sendMomentBoxText::before {
  content: '发表此刻的心情';
  color: #9499a0;
  position: absolute;
} */

.sendMomentBox-icon {
  width: 100%;
  height: 32px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon-left {
  display: flex;
}
.sendMomentIcon {
  display: block;
  margin-right: 15px;
  font-size: 24px;
  color: #9499a0;
}
.sendMomentIcon:hover {
  color: #00a1d6;
}
.icon-right button {
  height: 32px;
  width: 70px;
  border: none;
  background-color: #00a1d6;
  color: #fff;
  border-radius: 4px;
}
.icon-right button:hover {
  background-color: #33b4de;
}
.el-menu {
  border-radius: 4px;
  height: 50px;
}
.change-list-item {
  width: 56px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-moment {
  width: 100%;
  overflow-y: scroll;
  overflow: overlay;
  border-radius: 4px;
}
.center-moment::-webkit-scrollbar {
  width: 7px;
}
.center-moment::-webkit-scrollbar-thumb {
  background: #b5c2ca;
  border-radius: 5px;
}
</style>
