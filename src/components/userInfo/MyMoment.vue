<template>
  <div class="myMoment">
    <PublicHeader :headerTitle="title"></PublicHeader>
    <div class="momentDiv">
      <div class="moment">
        <!-- 使用自定义的动态组价 -->
        <template v-for="item in momentListData" :key="item.id">
          <ZmomentVue @refresh="refreshMoment" :momentData="item" :showReport="showReport"></ZmomentVue>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PublicHeader from './PublicHeader.vue'
import ZmomentVue from '../../baseUi/baseMoment/Zmoment.vue'
import zlrequest from '../../service'
import { loginStore } from '../../store/login/login'
import { storeToRefs } from 'pinia'
import { conforms } from 'lodash'

const title = ref('我的动态')
const store = loginStore()
const { userInfo } = storeToRefs(store)

// 展示删除动态的点
const showReport = ref(false)

const momentListData = ref([])
const getUserInfo = async () => {
  const res = await zlrequest.request({
    method: 'get',
    url: `/moment/mymoment/${userInfo.value.id}`,
  })
  momentListData.value = res.data
}
getUserInfo()
// 自定义事件，删除动态后重新请求数据
const refreshMoment = () => {
  getUserInfo()
}
</script>

<style scoped>
.myMoment {
  width: 100%;
  height: 100%;
}
.momentDiv {
  height: calc(100% - 51px);
  width: 90%;
  /* background-color: skyblue; */
  margin: 0 auto;
  overflow-y: scroll;
  overflow: overlay;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-bottom: 0px;
}
.moment::-webkit-scrollbar {
  width: 5px;
}
.moment::-webkit-scrollbar-thumb {
  /* background: transparent; */
  background: #b5c2ca;
  border-radius: 5px;
}
.moment {
  width: 100%;
  margin-top: 10px;
  overflow-y: scroll;
  overflow: overlay;
  border-radius: 4px;
}
</style>
