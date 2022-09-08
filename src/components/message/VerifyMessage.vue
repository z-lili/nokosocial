<template>
  <div class="verifyMessage">
    <div class="bread">验证信息</div>
    <div class="verfy-box">
      <div class="fablous-contain">
        <div class="fablus-users">
          <el-avatar :size="45" :src="circleUrl" />
          <div>
            <p>李田所</p>
            <p class="f-two">2022年1月28日 14:01</p>
          </div>
        </div>
        <div class="fablous-text">请求添加你为好友</div>
        <div class="fablous-moment">
          <div class="fablous-moment-top">
            <span style="font-weight: 600">哼哼哼啊啊啊啊啊啊啊啊啊啊！</span>
          </div>
        </div>
        <div class="verfyBtn">
          <el-button type="danger" round>拒绝</el-button>
          <el-button type="primary" round>同意</el-button>
        </div>
      </div>
      <div class="fablous-contain">
        <div class="fablus-users">
          <el-avatar :size="45" :src="circleUrl" />
          <div>
            <p>李田所</p>
            <p class="f-two">2022年1月28日 14:01</p>
          </div>
        </div>
        <div class="fablous-text">请求添加你为好友</div>
        <div class="fablous-moment">
          <div class="fablous-moment-top">
            <span style="font-weight: 600">哼哼哼啊啊啊啊啊啊啊啊啊啊！</span>
          </div>
        </div>
        <div class="verfyBtn">
          <el-button type="danger" round>拒绝</el-button>
          <el-button type="primary" round>同意</el-button>
        </div>
      </div>
      <div class="fablous-contain">
        <div class="fablus-users">
          <el-avatar :size="45" :src="circleUrl" />
          <div>
            <p>李田所</p>
            <p class="f-two">2022年1月28日 14:01</p>
          </div>
        </div>
        <div class="fablous-text">请求添加你为好友</div>
        <div class="fablous-moment">
          <div class="fablous-moment-top">
            <span style="font-weight: 600">哼哼哼啊啊啊啊啊啊啊啊啊啊！</span>
          </div>
        </div>
        <div class="verfyBtn">
          <el-button type="danger" round>拒绝</el-button>
          <el-button type="primary" round>同意</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const circleUrl = ref('/src/assets/img/xianbei.jpg')
</script>

<style scoped>
.verifyMessage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
.verfy-box {
  width: 100%;
  flex: 1;
  margin: 0 auto;
  margin-top: 10px;
  overflow: scroll;
  overflow: overlay;
}
.verfy-box::-webkit-scrollbar {
  width: 9px;
}
.verfy-box::-webkit-scrollbar-thumb {
  background: #b5c2ca;
  border-radius: 5px;
}
.fablous-contain {
  width: 98%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}
.fablous-contain:last-child {
  margin-bottom: 0px;
}
.fablus-users {
  display: flex;
  align-items: center;
  padding: 10px;
}
.fablus-users div {
  margin-left: 5px;
}
.fablus-users .f-two {
  color: #ccc;
  font-size: 14px;
}
.fablous-text {
  padding: 10px;
}
.fablous-moment {
  margin: 10px;
  /* height: 300px; */
  background-color: #f5f6fa;
  padding: 10px;
}
.verfyBtn {
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 10px;
}
.verfyBtn button {
  border-radius: 5px;
}
</style>
