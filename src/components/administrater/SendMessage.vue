<template>
  <div class="sendMessage">
    <div class="bread">发布通知</div>
    <div class="containBox">
      <el-form ref="messageRef" :rules="rules" label-position="left" :model="form" label-width="120px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容:" prop="desc">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="danger" @click="clearForm">清空</el-button>
        <el-button type="primary" @click="sendMessage">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import zlrequest from '../../service'

const messageRef = ref()
// 表单数据
const form = reactive({
  title: '',
  desc: '',
})

// 清空
const clearForm = () => {
  form.title = ''
  form.desc = ''
}

// 发布通知
const sendMessage = () => {
  messageRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await zlrequest.request({
          method: 'post',
          url: '/administrater',
          data: {
            title: form.title,
            content: form.desc,
          },
        })
        if (res.status == 200) {
          ElMessage.success('发布消息成功~')
        } else {
          ElMessage.error('发布消息失败~')
        }
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    } else {
      ElMessage.error('请输入正确的内容~')
    }
  })
}

// 校验
const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在1到20', trigger: 'blur' },
  ],
  desc: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    { min: 1, max: 60, message: '长度在1到60', trigger: 'blur' },
  ],
})
</script>

<style scoped>
.sendMessage {
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
.containBox {
  position: relative;
  width: 98%;
  margin: 0 auto;
  margin-top: 10px;
  overflow: hidden;
  background-color: #fff;
  padding-top: 20px;
  border-radius: 4px;
  padding-right: 40px;
  padding-left: 40px;
  padding-bottom: 45px;
  font-size: 16px;
}
.el-form-item__label {
  font-size: 18px;
}
.btn {
  position: absolute;
  right: 37px;
  top: 140;
}
</style>
