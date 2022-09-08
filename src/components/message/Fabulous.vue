<template>
  <div class="fabulous">
    <div class="bread">收到的赞</div>
    <div class="fablousBox" v-infinite-scroll="loads" infinite-scroll-immediate="false" infinite-scroll-distance="1">
      <div class="fablous-contain" v-for="item in fablousStuation" :key="item.id">
        <div class="fablus-users">
          <el-avatar :size="45" :src="item.avater_url" />
          <div>
            <p>{{ item.name }}</p>
            <p class="f-two">{{ item.createAt }}</p>
          </div>
        </div>
        <div class="fablous-text"><i class="iconfont icon-dianzan dianzan"></i> 点赞了你的动态</div>
        <div class="fablous-moment">
          <div class="fablous-moment-top">
            <span style="font-weight: 600">{{ item.uname }}: </span>
            <span> {{ item.content }}</span>
          </div>
          <div class="moment-img" v-if="item.images">
            <div class="imgItem" v-for="items in item.images" :key="items">
              <el-image style="width: 104px; height: 104px" :src="items" fit="cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { conforms } from 'lodash'
import { ref } from 'vue'
import zlrequest from '../../service'
import formatTime from '../../utils/formatTime'

// const circleUrl = ref('/src/assets/img/xianbei.jpg')
// const imgsrc = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')

// 获取所有动态点赞情况
const fablousStuation = ref([])
const getFablous = async (offset) => {
  const res = await zlrequest.request({
    method: 'get',
    url: `/moment/like/situation?offset=${offset}&size=40`,
  })
  if (res.status == 200) {
    fablousStuation.value = [
      ...fablousStuation.value,
      ...res.data.filter((item) => {
        return item.name != null
      }),
    ]
    // console.log(fablousStuation.value)
  }
}
getFablous(0)
//
const offsetNums = ref(0)
const loads = () => {
  offsetNums.value += 40
  getFablous(offsetNums.value)
}
</script>

<style scoped>
.fabulous {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.fablousBox::-webkit-scrollbar {
  width: 9px;
}
.fablousBox::-webkit-scrollbar-thumb {
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
.fablousBox {
  width: 100%;
  flex: 1;
  margin: 0 auto;
  margin-top: 10px;
  overflow-y: scroll;
  overflow-y: overlay;
}
.fablous-contain {
  width: 98%;
  /* height: 300px; */
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
.moment-img {
  display: flex;
  margin-top: 25px;
}
.imgItem {
  width: 104px;
  height: 104px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 5px;
  margin-bottom: 10px;
}
.dianzan {
  color: #2faee5;
  font-size: 18px;
}
</style>
