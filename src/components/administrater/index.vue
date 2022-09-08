<template>
  <!-- 管理员界面 -->
  <div class="admin">
    <Header></Header>
    <div class="adminBox">
      <div class="admin-containt">
        <div class="admin-aside">
          <div class="asideTitle"><i class="iconfont icon-quanxian"></i>&nbsp;管理员权限</div>
          <ul class="aside-container">
            <li ref="adminRef" @click="messageClick(index)" v-for="(item, index) in asideLi" :key="index"><i class="iconfont icon-size" :class="item.icon"></i> &nbsp;{{ item.name }}</li>
          </ul>
        </div>
        <div class="admin-main">
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
    icon: 'icon-tongzhi',
    name: '发布通知',
  },
  {
    icon: 'icon-gerenxinxi',
    name: '用户管理',
  },
  {
    icon: 'icon-dongtaiguanli',
    name: '动态管理',
  },
  {
    icon: 'icon-yanzheng',
    name: '用户分布',
  },
])
const howTorouter = ref({
  0: 'sendMessage',
  1: 'userControll',
  2: 'momentControll',
  3: 'userAddres',
})

const adminRef = ref()
// 点击侧边栏的navbar
const messageClick = (index) => {
  // 使用排他思想更换点击后的颜色
  adminRef.value.forEach((item) => {
    item.style.color = '#6b757b'
  })
  adminRef.value[index].style.color = '#2faee5'

  const thePath = howTorouter.value[index]
  // 页面跳转
  router.push(`/administrators/${thePath}`)
}
</script>

<style scoped>
.admin {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent), url('../../assets/img/background.png');
  background-size: cover;
  background-position: center;
}
.adminBox {
  width: 100%;
  height: calc(100% - 71px);
  display: flex;
  justify-content: center;
}

.admin-containt {
  width: 80%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
}
.admin-containt .admin-aside {
  height: 100%;
  width: 18%;
  background-color: rgba(255, 255, 255, 0.2);
}
.admin-main {
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
