<template>
  <div class="myMessage">
    <PublicHeader :headerTitle="headerTitle"></PublicHeader>
    <div class="mainContain">
      <el-form ref="userInfoRef" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="我的签名" prop="sign">
          <el-input v-model="form.sign" type="textarea" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader v-model="form.address" :options="options" @change="handleChange" />
        </el-form-item>
        <el-form-item label="学院" prop="compus">
          <el-input v-model="form.compus" />
        </el-form-item>
        <el-form-item label="专业" prop="special">
          <el-input v-model="form.special" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { loginStore } from '../../store/login/login'
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
import PublicHeader from './PublicHeader.vue'
import zlrequest from '../../service'
import debounce from '../../utils/debounce.js'
import { ElMessage } from 'element-plus'

const headerTitle = ref('我的信息')
const store = loginStore()

// 个人的信息
const form = reactive({
  name: '',
  sign: '',
  sex: '',
  compus: '',
  special: '',
  address: ['110000', '110100'], //存放的是区域码
})

// 区域码转化为汉字后的地址  如果没有点击及联选择器就不会触发handleChange
const dizhi = ref()
if (form.address.length != 0) {
  const provinces = CodeToText[form.address[0]]
  const citys = CodeToText[form.address[1]]
  dizhi.value = provinces + '/' + citys
}

// 及联选择器
const options = provinceAndCityData
const handleChange = (value) => {
  // 将区域码转化为汉字
  const province = CodeToText[value[0]]
  const city = CodeToText[value[1]]
  dizhi.value = province + '/' + city
  console.log(dizhi.value)
}

// 请求用户信息
const userId = store.uid
const userObj = ref({})
const getUserMessage = async (id) => {
  try {
    const res = await zlrequest.request({
      method: 'get',
      url: `/users/${id}`,
    })
    // 保存用户信息
    userObj.value = res.data
    form.name = res.data.name
    form.sign = res.data.Signature
    form.sex = res.data.sex
    form.compus = res.data.College
    form.special = res.data.specialized
    console.log(res.data.address)
    // 地址需要转化为区域码
    if (res.data.address) {
      let addresStr = res.data.address.split('/')
      addresStr[1] = TextToCode[addresStr[0]][addresStr[1]].code
      addresStr[0] = TextToCode[addresStr[0]].code
      form.address = addresStr
    }

    console.log(res.data)
  } catch (err) {
    ElMessage.error(err)
  }
}
getUserMessage(userId)

// 点击保存用户信息
const userInfoRef = ref()
const submit = () => {
  userInfoRef.value.validate(async (valid) => {
    // 通过表单校验
    if (valid) {
      try {
        const res = await zlrequest.request({
          method: 'patch',
          url: `/users/${userId}`,
          data: {
            name: form.name,
            signature: form.sign,
            sex: form.sex,
            address: dizhi.value,
            college: form.compus,
            speciallize: form.special,
          },
        })
        console.log('jjjjjjj')
        if (res.status == 200) {
          ElMessage.success('修改用户信息成功~')
        }
        console.log(res)
      } catch (err) {}
    } else {
      ElMessage.error('请输入正确的内容')
    }
  })
}
// 做防抖处理
const onSubmit = debounce(submit, 2000, true)

// 表单校验规则
const rules = reactive({
  name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在1到10', trigger: 'blur' },
  ],
  sign: [
    { required: true, message: '请输入个性签名', trigger: 'blur' },
    { min: 1, max: 30, message: '长度在1到30', trigger: 'blur' },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
  compus: [
    { required: true, message: '请输入学院', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在1到10', trigger: 'blur' },
  ],
  special: [
    { required: true, message: '请输入专业', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在1到20', trigger: 'blur' },
  ],
})
</script>

<style scoped>
.myMessage {
  width: 100%;
  height: 100%;
}
.mainContain {
  width: 100%;
  height: calc(100% - 51px);
  /* background-color: pink; */
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
