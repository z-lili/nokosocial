<template>
  <div class="userControll">
    <div class="bread">用户管理</div>
    <div class="containBOx">
      <div class="search">
        <el-input class="searchInput" v-model="userName" placeholder="请输入用户名" />
        <el-button @click="searchUser" size="large" class="searchBtn" type="primary">搜索</el-button>
      </div>
      <div class="tables">
        <el-table :data="userInfo" stripe style="width: 100%">
          <el-table-column type="index" :index="indexMethod" />
          <el-table-column prop="name" label="用户名" min-width="60" />
          <el-table-column prop="id" label="id" min-width="50" />
          <el-table-column label="头像" min-width="50">
            <template #default="scope">
              <el-image style="width: 50px; height: 50px" :src="scope.row.avater_url" fit="cover" />
            </template>
          </el-table-column>
          <el-table-column prop="College" label="学院" min-width="60" />
          <el-table-column prop="specialized" label="专业" min-width="60" />
          <el-table-column label="管理" min-width="80">
            <template #default="scope">
              <el-button type="warning" size="default" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="default" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageNation">
          <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="1000" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import zlrequest from '../../service'

// 查询用户
const userName = ref('') //用户名
const searchUser = async () => {
  if (userName.value !== '' && userName.value !== null) {
    const res = await zlrequest.request({
      method: 'get',
      url: `/administrater/${userName.value}`,
    })
    if (res.status == 200) {
      let arr = ref([])
      arr.value.push(res.data)
      userInfo.value = arr.value
    }
  } else {
    ElMessage.error('请输入内容~')
  }
}

// 请求用户
const userInfo = ref()
const getAllUser = async (offset) => {
  const res = await zlrequest.request({
    method: 'get',
    url: '/administrater/allUsers?offset=0&size=10',
    url: `/administrater/allUsers?offset=${offset}&size=10`,
  })
  console.log(res.data)
  userInfo.value = res.data
}
getAllUser(0)

const indexMethod = (index) => {
  return index + 1
}

// 分页功能
// 当前页改变
const currentPage = ref(0)
const handleCurrentChange = (val) => {
  currentPage.value = val - 1
  getAllUser((val - 1) * 10)
}

// 删除用户
const deleteUser = (id) => {
  ElMessageBox.confirm('确定删除该用户?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await zlrequest.request({
        method: 'delete',
        url: `/administrater/removeUser/${id}`,
      })
      if (res.status == 200) {
        // 重新获取数据
        getAllUser(currentPage.value * 10)
        ElMessage({
          type: 'success',
          message: '删除成功~',
        })
      } else {
        ElMessage({
          type: 'error',
          message: '删除失败~',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
</script>

<style scoped>
.userControll {
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
.containBOx {
  width: 98%;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 4px;
  overflow: hidden;
}
.search {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 4px;
}
.searchInput {
  height: 40px;
}
.searchBtn {
  margin-left: 5px;
}
.tables {
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: scroll;
  /* 设置让滚动条不挤占页面宽度 */
  overflow-y: overlay;
}
.tables::-webkit-scrollbar {
  width: 7px;
}
.tables::-webkit-scrollbar-thumb {
  background: #b5c2ca;
  border-radius: 5px;
}
.pageNation {
  padding: 10px;
  display: flex;
  justify-content: right;
  background-color: #fff;
}
</style>
