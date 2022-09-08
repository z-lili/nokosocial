<template>
  <!-- 系统通知页面 -->
  <div class="systemNotice">
    <div class="bread">系统通知</div>
    <div class="system-box">
      <div class="niticeBox" v-for="item in adminData" :key="item.id">
        <div class="noticeTitle">
          <h5>{{ item.title }}</h5>
          <p class="noticeTime">{{ item.createAt }}</p>
        </div>
        <p class="noticeContain">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import zlrequest from '../../service'
import catchs from '../../utils/catch.js'
import formatTime from '../../utils/formatTime'

// 请求管理员通知
const adminData = ref()
const adminMessage = async () => {
  const res = await zlrequest.request({
    method: 'get',
    url: '/administrater/message',
  })
  // 格式化时间
  for (let i = 0; i < res.data.length; i++) {
    const newTime = formatTime.formatOne(res.data[i].createAt)
    res.data[i].createAt = newTime
  }
  adminData.value = res.data
  // console.log(adminData.value)
}
adminMessage()
</script>

<style scoped>
.systemNotice {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.system-box {
  flex: 1;
  width: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  /* 设置让滚动条不挤占页面宽度 */
  overflow-y: overlay;
}
.system-box::-webkit-scrollbar {
  width: 9px;
}
.system-box::-webkit-scrollbar-thumb {
  background: #b5c2ca;
  border-radius: 5px;
}
.bread {
  margin: 0 auto;

  width: 98%;
  height: 50px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 10px;
  line-height: 50px;
  text-indent: 1rem;
  color: #666666;
}
.niticeBox {
  margin: 0 auto;
  width: 98%;
  height: 100px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
}
.noticeTitle {
  display: flex;
  margin-bottom: 5px;
}
.noticeContain {
  text-indent: 1rem;
  color: #666666;
}
.noticeTime {
  color: #999999;
  text-indent: 1rem;
  font-size: 14px;
}
</style>
