<template>
  <div class="Zcomment">
    <!-- 发表评论 -->
    <div class="sendComment">
      <div class="emojoy">
        <i class="iconfont icon-biaoqing" style="font-size: 18px"></i>
        <p>表情</p>
      </div>
      <div class="avater">
        <el-avatar :size="55" :src="userAvater" />
      </div>
      <div class="content">
        <textarea v-model="commentContent" ref="textAreaRef" @focus="onFocusComment" @blur="onBlurComment" placeholder="发一条友善的评论"></textarea>
      </div>
      <div class="btn">
        <button @click="sendComment">发表评论</button>
      </div>
    </div>
    <!-- 评论 -->
    <template v-if="commentDatas">
      <div v-for="item in commentDatas" :key="item.id" class="commentContent">
        <div class="commentAvater">
          <el-avatar :size="55" :src="item.author.avaterUrl ? item.author.avaterUrl : defaultAvater" />
        </div>
        <div class="commentText">
          <div class="name">
            <p>{{ item.author.name }}</p>
          </div>
          <div class="commentContain">
            <p>{{ item.content }}</p>
          </div>
          <div class="time">
            <p>{{ item.creatAt }}</p>
          </div>
        </div>
        <!-- 删除评论的三个点 -->
        <el-popconfirm @confirm="removeComent(item.id)" title="是否删除该评论?">
          <template #reference>
            <i class="iconfont icon-diandian deletComment"></i>
          </template>
        </el-popconfirm>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, defineEmits } from 'vue'
import zlrequest from '../../service'
import formatTime from '../../utils/formatTime'
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'

const props = defineProps({
  // 个人信息
  userMessage: {
    required: true,
  },
  // 评论信息
  commentData: {
    required: true,
  },
  // 动态的id
  momentId: {
    required: true,
  },
})

// 存储个人信息和评论信息，动态id
const users = ref(props.userMessage)

const commentDatas = computed(() => {
  return props.commentData
})

const momentid = ref(props.momentId)

// 评论默认头像
const defaultAvater = ref('/src/assets/img/defaultAvater.jpg')

// 个人头像
let userAvater = ref('')
if (users.value && users.value.avater_url) {
  userAvater.value = users.value.avater_url
} else {
  userAvater.value = '/src/assets/img/defaultAvater.jpg'
}

// 获得焦点
const textAreaRef = ref()
const onFocusComment = () => {
  textAreaRef.value.style.border = '1px solid #00a1d6'
}
// 失去焦点
const onBlurComment = () => {
  textAreaRef.value.style.border = '1px solid #e5e9ef'
}

// 点击发表评论
const emit = defineEmits(['refreshComent'])
const commentContent = ref()
const sendComment = async () => {
  const res = await zlrequest.request({
    method: 'post',
    url: `/comment`,
    data: {
      content: commentContent.value,
      momentId: momentid.value,
    },
  })
  if (res.status == 200) {
    ElMessage.success('发表评论成功~')
    commentContent.value = ''
    // 重新获取评论信息
    emit('refreshComent', false)
    // 评论数量加一
  }
}

// 删除评论
const removeComent = async (id) => {
  try {
    const res = await zlrequest.request({
      method: 'delete',
      url: `/comment/${id}`,
    })
    if (res.status == 200) {
      ElMessage.success('删除评论成功~')
      emit('refreshComent', true)
    }
  } catch (err) {
    if (err.message == 'Request failed with status code 402') {
      ElMessage.warning('您没有权限做此操作~')
    } else {
      ElMessage.error('删除评论失败~')
    }
  }
}
</script>

<style scoped>
.Zcomment {
  width: 100%;
  /* height: 400px; */
  background-color: #fff;
  border-top: 1px solid #ccc;
  margin-bottom: 10px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 4px;
}
.sendComment {
  display: flex;
  height: 115px;
  align-items: top;
  position: relative;
  border-bottom: 1px solid #e5e9ef;
}
.sendComment .emojoy {
  position: absolute;
  left: 65px;
  bottom: 10px;
  width: 60px;
  height: 24px;
  box-shadow: 0px 1px 10px 0 rgb(106 115 133 / 25%);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 7px;
  padding-right: 8px;
  border-radius: 3px;
  color: #99a2aa;
  font-weight: 600;
}
.sendComment .btn button {
  width: 70px;
  height: 64px;
  padding: 4px 15px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  min-width: 60px;
  cursor: pointer;
  background-color: #00a1d6;
  border: 1px solid #00a1d6;
  transition: 0.1s;
  user-select: none;
  outline: none;
}
.sendComment .btn button:hover {
  background-color: #00b5e5;
}
.sendComment .content {
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  height: 64px;
}
.sendComment .content textarea {
  width: 100%;
  height: 100%;
  background-color: #f4f5f7;
  outline: none;
  border-radius: 4px;
  color: #555;
  border: 1px solid #e5e9ef;
  padding: 2px;
  text-indent: 0.5rem;
}
.sendComment .content textarea:hover {
  border: 1px solid #00b5e5 !important;
}
/* 评论 */
.commentContent {
  display: flex;
  /* background-color: pink; */
  padding-top: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e9ef;
  position: relative;
}
.commentText {
  padding-top: 5px;
  padding-left: 15px;
}
.commentText .name {
  margin-bottom: 6px;
  color: #6d757a;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  word-wrap: break-word;
  font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
}
.commentText .commentContain {
  margin-bottom: 6px;
  color: #222;
  font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
.commentText .time {
  color: #99a2aa;
  line-height: 14px;
  font-size: 12px;
}

.deletComment {
  position: absolute;
  top: 20px;
  right: -5px;
}
</style>
