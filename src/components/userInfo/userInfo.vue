<template>
  <div class="userInfo">
    <Header></Header>
    <div class="userMessageBox">
      <!-- 上方图片 -->
      <div class="topimg">
        <el-image style="width: 980px; height: 106px" :src="userBanner" fit="contain" />
      </div>
      <div class="message-contain">
        <div class="contain-top"></div>
        <div class="contain-bottom">
          <div class="bottom-left">
            <span>个人中心</span>
            <ul>
              <li @click="checkLi(index)" :class="{ liBackcolor: index == liIndex }" v-for="(item, index) in leftdata" :key="index"><i class="iconfont iconSize" :class="item.icon"></i>&nbsp;{{ item.name }}</li>
            </ul>
          </div>
          <div class="bottom-right">
            <router-view></router-view>
          </div>
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
const userBanner = ref('/src/assets/img/userBanner.jpg')
const leftdata = ref([
  {
    icon: 'icon-gerenxinxi',
    name: '我的信息',
  },
  {
    icon: 'icon-touxiang',
    name: '我的头像',
  },
  {
    icon: 'icon-airudiantubiaohuizhi-zhuanqu_zixundongtai',
    name: '我的动态',
  },
  {
    icon: 'icon-anquan',
    name: '账号安全',
  },
  {
    icon: 'icon-zhuce',
    name: '邀请注册',
  },
])
const liIndex = ref(0)
const howTorouter = ref({
  0: 'myMessage',
  1: 'myAvater',
  2: 'myMoment',
  3: 'acountSafe',
  4: 'invateRegist',
})
// 点击左侧li
const checkLi = (index) => {
  liIndex.value = index
  const thePath = howTorouter.value[index]
  router.push(`/userInfo/${thePath}`)
}
</script>

<style scoped>
.userInfo {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent), url('../../assets/img/background.png');
  background-size: cover;
  background-position: center;
}
.userMessageBox {
  width: 100%;
  height: calc(100% - 71px);
  /* display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap; */
}
.topimg {
  height: 106px;
  background-color: #00a0d8;
  width: 100%;
  display: flex;
  justify-content: center;
}
.message-contain {
  width: 980px;
  margin: 0 auto;
  height: calc(100% - 106px);
  background-color: #fff;
  /* border: 1px solid #ccc; */
}
.contain-top {
  width: 100%;
  height: 15px;
}
.contain-bottom {
  display: flex;
  width: 100%;
  height: calc(100% - 15px);
  background-color: #fff;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgb(0 0 0 / 14%);
}
.bottom-left {
  height: 100%;
  width: 150px;
  background-color: #fafafa;
  border-right: 1px solid #e1e2e5;
}
.bottom-left span {
  display: block;
  height: 51px;
  border-bottom: 1px solid #e1e2e5;
  line-height: 51px;
  text-align: center;
  color: #99a2aa;
  cursor: default;
  font-size: 16px;
}
.bottom-left li {
  height: 48px;
  text-align: center;
  line-height: 48px;
  color: #222;
  cursor: pointer;
  /* font-size: 14px; */
}
.bottom-left li:hover {
  background-color: #e1e4ea;
}

.contain-bottom .bottom-left .liBackcolor {
  background-color: #00a1d7;
  color: #fff;
}

.bottom-left li .iconSize {
  font-size: 18px;
}

.bottom-right {
  height: 100%;
  width: 830px;
  /* background-color: red; */
}
</style>
