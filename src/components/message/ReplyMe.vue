<template>
  <div class="replyMe">
    <div class="bread">回复我的</div>
    <div class="replay-box" v-infinite-scroll="loads" infinite-scroll-immediate="false" infinite-scroll-distance="1">
      <div class="replay-moment" v-for="item in comment" :key="item">
        <!-- 对动态的回复,以及评论 -->
        <div class="replay-users">
          <el-avatar :size="45" :src="item.avater_url" />
          <div>
            <p>{{ item.name }}</p>
            <p class="f-two">{{ item.creatAt }}</p>
          </div>
        </div>
        <div class="replay-text">{{ item.content }}</div>
        <div class="replay-moment-contain">
          <div class="fablous-moment-top">
            <span style="font-weight: 600">{{ userInfo.name }}:&nbsp;</span>
            <span> {{ item.mcontent }}</span>
          </div>
          <div class="moment-img">
            <div class="imgItem" v-for="items in item.images" :key="items">
              <el-image style="width: 104px; height: 104px" :src="items" fit="cover" />
            </div>
          </div>
        </div>
        <!-- commentBox -->
        <!-- <div class="comment-box">
          <div class="coment-box-text">
            <span>彬彬:</span>
            <p>&nbsp;这么说，你很勇哦</p>
          </div>
        </div> -->
        <!-- 点击回复出现的input -->
        <!-- <div class="replay-inputBox">
          <textarea type="text" placeholder="请自觉遵守互联网相关政策法规，严禁发布色情，暴力，反动的言论。" />
          <button>回复评论</button>
        </div> -->
        <!-- 回复 -->
        <span class="replay-btn"> 回复 </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import zlrequest from '../../service'
import { loginStore } from '../../store/login/login'
import { storeToRefs } from 'pinia'

const circleUrl = ref('/src/assets/img/awei.webp')
const imgsrc = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
const store = loginStore()
const { userInfo } = storeToRefs(store)

// 获取所有动态评论情况
const comment = ref([])
const getCommentStuation = async (offset) => {
  const res = await zlrequest.request({
    method: 'get',
    url: `/moment/coment/situation?offset=${offset}&size=40`,
  })
  if (res.status == 200) {
    let commdata = ref(
      res.data.filter((item) => {
        return item.content != null
      })
    )
    comment.value = [...comment.value, ...commdata.value]
    console.log(comment.value)
  }
}
getCommentStuation(0)
// 滚动到底部加载数据
const offsetNums = ref(0)
const loads = () => {
  offsetNums.value += 40
  getCommentStuation(offsetNums.value)
  console.log('44444')
}
</script>

<style scoped>
.replyMe {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
.replay-box {
  flex: 1;
  width: 100%;
  overflow: scroll;
  overflow: overlay;
}
.replay-box::-webkit-scrollbar {
  width: 9px;
}
.replay-box::-webkit-scrollbar-thumb {
  background: #b5c2ca;
  border-radius: 5px;
}
.replay-moment {
  width: 98%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
  position: relative;
}
.replay-users {
  display: flex;
  align-items: center;
  padding: 10px;
}
.replay-users div {
  margin-left: 5px;
}
.replay-users .f-two {
  color: #ccc;
  font-size: 14px;
}
.replay-text {
  padding: 10px;
}
.replay-moment-contain {
  margin: 10px;
  background-color: #f5f6fa;
  padding: 10px;
}
.moment-img {
  margin-top: 25px;
}
.comment-box {
  width: 100%;
  padding: 10px;
  padding-top: 0px;
}
.coment-box-text {
  display: flex;
}
.coment-box-text span {
  font-weight: 600;
}
.replay-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #2faee5;
  cursor: pointer;
}
.replay-inputBox {
  width: 100%;
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  height: 90px;
  /* background-color: #2faee5; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.replay-inputBox textarea {
  width: 89%;
  height: 80px;
  outline: none;
  border: 1px solid #00a1d6;
  resize: none;
  padding: 5px;
}
.replay-inputBox button {
  width: 10%;
  height: 80px;
  background-color: #00a1d6;
  border: none;
  color: #fff;
  border-radius: 4px;
}
.imgItem {
  width: 104px;
  height: 104px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 5px;
  margin-bottom: 10px;
}
</style>
