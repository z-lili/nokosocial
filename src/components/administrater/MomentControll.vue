<template>
  <div class="momentControll">
    <div class="bread">动态管理</div>
    <div class="containBOx">
      <div class="search">
        <el-input class="searchInput" v-model="userId" placeholder="请输入用户id" />
        <el-button @click="searchMoment" size="large" class="searchBtn" type="primary">搜索</el-button>
      </div>
      <div class="tables">
        <el-table :data="momentData" stripe style="width: 100%">
          <el-table-column type="index" :index="indexMethod" />
          <el-table-column prop="author.name" label="用户名" min-width="40" />
          <el-table-column prop="id" label="id" min-width="30" />
          <el-table-column label="配图" min-width="80">
            <template #default="scope">
              <el-image v-for="item in scope.row.images" :key="item" style="width: 50px; height: 50px" :src="item" fit="contain" />
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="content" label="内容" min-width="80" />
          <el-table-column label="管理" min-width="80">
            <template #default="scope">
              <el-button type="warning" size="default" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="default" type="danger" @click="deleteMoment(scope.row.id)">删除</el-button>
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
import { ref } from 'vue'
import zlrequest from '../../service'

// 获取动态数据
const momentData = ref()
const getMomentData = async (offset) => {
  const res = await zlrequest.request({
    method: 'get',
    url: `/moment?offset=${offset}&size=20`,
  })
  if (res.status == 200) {
    momentData.value = res.data
    // console.log(momentData.value)
  }
}
getMomentData(0)

const indexMethod = (index) => {
  return index + 1
}

// 删除动态
const deleteMoment = async (mid) => {
  ElMessageBox.confirm('确定删除该动态?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await zlrequest.request({
        method: 'delete',
        url: `/administrater/removeMoment/${mid}`,
      })
      if (res.status == 200) {
        // 重新获取数据
        getMomentData(currentPage.value * 20)
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

// 当前页面改变
const currentPage = ref(0)
const handleCurrentChange = (val) => {
  currentPage.value = val - 1
  getMomentData((val - 1) * 20)
}

// 根据用户id查询动态
const userId = ref() //用户id
const searchMoment = async () => {
  if (userId.value !== '' && userId.value !== null) {
    const res = await zlrequest.request({
      method: 'get',
      url: `/moment/mymoment/${userId.value}`,
    })
    if (res.status == 200) {
      // let arr = ref([])
      // arr.value.push(res.data)
      momentData.value = res.data
      console.log(res.data)
    }
  } else {
    ElMessage.error('请输入内容~')
  }
}
</script>

<style scoped>
.momentControll {
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
