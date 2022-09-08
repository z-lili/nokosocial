<template>
  <!-- 消息 -->
  <div class="message">
    <Header></Header>
    <div class="messageBox">
      <div class="message-containt">
        <div class="message-aside">
          <div class="asideTitle"><i class="iconfont icon-emizhifeiji"></i>&nbsp;消息中心</div>
          <ul class="aside-container">
            <li ref="messageRef" @click="messageClick(index)" v-for="(item, index) in asideLi" :key="index"><i class="iconfont icon-size" :class="item.icon"></i> &nbsp;{{ item.name }}</li>
          </ul>
        </div>
        <div class="message-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../../views/Header.vue'

const router = useRouter()
const asideLi = ref([
  {
    icon: 'icon-xitong',
    name: '系统通知',
  },
  {
    icon: 'icon-dianzan',
    name: '收到的赞',
  },
  {
    icon: 'icon-pinglun',
    name: '回复我的',
  },
  {
    icon: 'icon-yanzheng',
    name: '验证信息',
  },
])
const howTorouter = ref({
  0: 'system',
  1: 'fabulous',
  2: 'replyMe',
  3: 'verifyMessage',
})

const messageRef = ref()
// 点击侧边栏的navbar
const messageClick = (index) => {
  // 使用排他思想更换点击后的颜色
  messageRef.value.forEach((item) => {
    item.style.color = '#6b757b'
  })
  messageRef.value[index].style.color = '#2faee5'

  const thePath = howTorouter.value[index]
  // 页面跳转
  router.push(`/message/${thePath}`)
}
</script>

<style scoped>
.message {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent), url('../../assets/img/background.png');
  background-size: cover;
  background-position: center;
}
.messageBox {
  width: 100%;
  height: calc(100% - 71px);
  display: flex;
  justify-content: center;
}

.message-containt {
  width: 80%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
}
.message-containt .message-aside {
  height: 100%;
  width: 18%;
  background-color: rgba(255, 255, 255, 0.2);
}
.message-main {
  height: 100%;
  width: 82%;
}
.asideTitle {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333333;
}
.aside-container {
  width: 100%;
}
.aside-container li {
  width: 100%;
  height: 45px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
  color: #6b757b;
  cursor: default;
}
.aside-container li:hover {
  color: #2faee3 !important;
}
.messageColor {
  color: #2faee3;
}
.icon-size {
  font-size: 18px;
}
</style>
