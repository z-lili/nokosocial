<template>
  <div class="zmoment">
    <!-- 举报的三个点 -->
    <el-popconfirm @confirm="report" v-if="showReport" title="是否举报该动态?">
      <template #reference>
        <i class="iconfont icon-diandian"></i>
      </template>
    </el-popconfirm>
    <!-- 删除动态的三个点 -->
    <el-popconfirm @confirm="removeMoment" v-else title="是否删除该动态?">
      <template #reference>
        <i class="iconfont icon-diandian"></i>
      </template>
    </el-popconfirm>
    <!-- 动态 -->
    <div class="left">
      <el-avatar :size="50" :src="moment.author.avaterUrl" />
    </div>
    <div class="right">
      <div class="rightTop">
        <!-- 名字头像 -->
        <div class="title">{{ moment.author.name }}</div>
        <div class="time">{{ moment.createTime }}</div>
      </div>
      <div class="rightBottom">
        <!-- 内容 -->
        <div class="content">{{ moment.content }}</div>
        <!-- 图片 -->
        <div v-if="srcList" class="pictures" ref="imgBoxRef">
          <div class="img" v-for="item in srcList" :key="item">
            <el-image :preview-src-list="srcList" style="width: 104px; height: 104px" :src="item" fit="cover" />
          </div>
        </div>
      </div>
      <div class="shareAndFablous">
        <div class="share">
          <div class="shareDiv"><i class="iconfont icon-31zhuanfa icon"></i></div>
          <p>转发</p>
        </div>
        <div class="share" @click="isShowComment">
          <div class="shareDiv"><i class="iconfont icon-pinglun icon"></i></div>
          <p>{{ moment.commentCount == 0 ? '评论' : moment.commentCount }}</p>
        </div>
        <div class="share" @click="fablous" :class="{ fablousColor: isFablousColor }">
          <div class="shareDiv"><i class="iconfont icon-dianzan icon"></i></div>
          <p>{{ moment.likeCount == 0 ? '点赞' : moment.likeCount }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 评论组件 -->
  <Zcomment v-if="showComment" :userMessage="userInfo" :commentData="commentDatas" :momentId="moment.id" @refreshComent="refreshComment"></Zcomment>
</template>

<script setup>
import { nextTick, onMounted, ref, defineEmits } from 'vue'
import Zcomment from '../baseComment/Zcomment.vue'
import formatTime from '../../utils/formatTime.js'
import zlrequest from '../../service/index.js'
import { loginStore } from '../../store/login/login'
import { storeToRefs } from 'pinia'

// 获取父组件传来的数据
let moment = ref() // 动态数据
const props = defineProps({
  // 动态数据
  momentData: {
    required: true,
  },
  // 是否展示举报动态的点
  showReport: {
    type: Boolean,
    required: true,
  },
})

// 格式化时间
props.momentData.createTime = formatTime.formatOne(props.momentData.createTime)

moment.value = props.momentData
// 图片
let srcList = ref([])
srcList.value = moment.value.images

// 是否展示评论
let showComment = ref(false)
const isShowComment = () => {
  showComment.value = !showComment.value
  if (showComment.value) {
    // 获取该动态评论信息
    getCommentData()
  }
}

// 根据图片的数量控制展示图片盒子的大小(排列)
const imgBoxRef = ref()
onMounted(() => {
  if (srcList.value) {
    if (srcList.value.length == 2 || srcList.value.length == 3) {
      imgBoxRef.value.style.width = 330 + 'px'
    } else if (srcList.value.length == 4) {
      imgBoxRef.value.style.width = 220 + 'px'
    }
  }
})

// 点击确认举报动态按钮触发
const emit = defineEmits(['refresh'])
const report = () => {
  console.log('sdsjkflsjflk')
}
// 点击确认删除动态按钮触发
const removeMoment = async () => {
  const res = await zlrequest.request({
    method: 'delete',
    url: `/moment/${moment.value.id}`,
  })
  if (res.status == 200) {
    ElMessage.success('删除动态成功')
    // 重新请求数据 自定义事件
    emit('refresh')
  } else {
    ElMessage.error('删除动态失败~')
  }
}

// 点赞
let isFablousColor = ref(false)
const store = loginStore()
const { userInfo } = storeToRefs(store) // 当前用户信息

// 查询对当前动态有无点赞
const isFablous = async () => {
  const res = await zlrequest.request({
    method: 'get',
    url: `/moment/likes/${moment.value.id}`,
  })
  if (res.data == true) {
    isFablousColor.value = true
  }
}
isFablous()

const fablous = async () => {
  if (!userInfo) {
    ElMessage.error('请先登录~')
    return
  }
  isFablousColor.value = !isFablousColor.value
  const res = await zlrequest.request({
    method: 'post',
    url: `/users/likemoment/${moment.value.id}`,
  })
  if (res.status == 200 && res.data == 'fablous') {
    ElMessage.success('点赞成功~')
    moment.value.likeCount++
  } else if (res.status == 200 && res.data == 'cancelFablous') {
    ElMessage.warning('取消点赞~')
    moment.value.likeCount--
  } else {
    ElMessage.error('点赞失败~')
  }
}

// 获取该动态评论信息
const commentDatas = ref([])
const getCommentData = async () => {
  const res = await zlrequest.request({
    method: 'get',
    url: `/comment/?momentid=${moment.value.id}`,
  })
  commentDatas.value = res.data
  console.log(res.data)
}

// 重新获取评论信息
const refreshComment = (isDelete) => {
  getCommentData()
  // 评论数量加一或者减一(根据传入的参数，判断是发表还是删除动态)
  if (isDelete) {
    moment.value.commentCount--
  } else {
    moment.value.commentCount++
  }
}
</script>

<style scoped>
.zmoment {
  display: flex;
  justify-content: left;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  padding-top: 20px;
  border-radius: 4px;
  position: relative;
  /* margin-top: 10px; */
}
.el-tooltip__trigger {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 20px;
  right: 10px;
}
.el-tooltip__trigger:hover {
  color: #23c9ed;
}
.rightTop {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  padding-left: 10px;
  padding-top: 5px;
}
.time {
  color: #99a2aa;
  font-size: 14px;
}
.rightBottom {
  padding-top: 13px;
  padding-left: 10px;
}
.pictures {
  display: flex;
  width: 218px;
  flex-wrap: wrap;
  padding-top: 20px;
}
.img {
  width: 104px;
  height: 104px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 5px;
  margin-bottom: 10px;
}
.shareAndFablous {
  display: flex;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 22px;
}
.shareAndFablous .share {
  display: flex;
  justify-content: space-between;
  margin-right: 80px;
  align-items: center;
  height: 30px;
  color: #99a2aa;
}

.shareAndFablous .share:hover {
  color: #23c9ed !important;
}
.icon {
  font-size: 18px;
}
.shareAndFablous .share p {
  font-size: 14px;
  cursor: pointer;
}
.shareDiv {
  margin-right: 10px;
}
.fablousColor {
  color: #23c9ed !important;
}
</style>
