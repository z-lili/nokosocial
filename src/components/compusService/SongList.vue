<template>
  <div class="songList">
    <div class="detail" v-if="songListDetailOne">
      <div class="leftImg">
        <el-image lazy :src="songListDetailOne.coverImgUrl" alt="" />
      </div>
      <div class="rightContain">
        <h3>{{ songListDetailOne.name }}</h3>
        <div class="author">
          <el-avatar style="vertical-align: middle" :size="30" :src="songListDetailOne.creator.avatarUrl" />
          {{ songListDetailOne.creator.nickname }}
        </div>
        <div class="btn" style="margin-top: 5px">
          <el-button type="primary" round>播放全部</el-button>
        </div>
        <div class="containBottom">
          <div>标签：{{ songListDetailOne.tags }}</div>
          <div>歌曲：{{ songListDetailOne.trackCount }}</div>
          <div>简介：{{ songListDetailOne.description }}</div>
        </div>
      </div>
    </div>
    <div class="listTable" v-if="songListDetail">
      <el-table @row-dblclick="playMusic" stripe :data="songListDetail" style="width: 100%">
        <el-table-column type="index" :index="indexMethod" min-width="20" />
        <el-table-column prop="name" label="标题" min-width="100" />
        <el-table-column prop="ar[0].name" label="歌手" min-width="80" />
        <el-table-column prop="al.name" label="专辑" min-width="120" />
        <el-table-column prop="dt" label="时间" min-width="30" />
      </el-table>
    </div>
    <div v-if="songListDetailOne" class="pagination">
      <el-pagination :page-size="20" @current-change="newPage" background layout="prev, pager, next" :total="songListDetailOne.trackCount" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { musicStore } from '../../store/music/music'
import { storeToRefs } from 'pinia'
import { zlrequest2 } from '../../service'
import formatTime from '../../utils/formatTime'
import cookie from '../../constants/cookie.js'

const indexMethod = (index) => {
  return (index += 1)
}
// 获取歌单id
const store = musicStore()
const { listId } = storeToRefs(store)
console.log(listId.value)

// 歌单详情
const songListDetailOne = ref()
const getListDetailOne = async () => {
  const res = await zlrequest2.request({
    method: 'get',
    url: '/playlist/detail',
    params: {
      id: listId.value,
    },
  })
  if (res.status == 200) {
    songListDetailOne.value = res.data.playlist
  }
  console.log(res.data.playlist)
}
getListDetailOne()

// 请求歌单歌曲
const songListDetail = ref([])
const getListData = async (offset) => {
  const res = await zlrequest2.request({
    method: 'get',
    url: '/playlist/track/all',
    params: {
      id: listId.value,
      offset: offset,
      limit: 20,
      timestamp: Date.now(),
      cookie: cookie,
    },
  })
  if (res.status == 200) {
    // 先格式化时间
    for (let i = 0; i < res.data.songs.length; i++) {
      res.data.songs[i].dt = formatTime.formatTwo(res.data.songs[i].dt)
    }
    songListDetail.value = res.data.songs
    console.log(songListDetail.value)
  }
}
getListData(0)

// 分页
const currentPage = ref(0)
const newPage = (val) => {
  currentPage.value = val - 1
  getListData((val - 1) * 20)
}

// 双击播放音乐
const playMusic = async (row) => {
  // 获取歌曲信息，保存到store
  store.changeSongMessage(row)
  const songId = row.id
  console.log(row)
  // 获取播放地址,保存到store播放列表
  const res = await zlrequest2.request({
    method: 'get',
    url: '/song/url',
    params: {
      id: songId,
      cookie,
    },
  })
  if (res.status == 200) {
    // 保存播放地址到store
    console.log(res.data)
    store.changePlayList(res.data.data[0].url)
    // 保存一个flag，用于自动播放
    store.changeFlag(true)
  }
}
</script>

<style scoped>
.songList {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-y: overlay;
  padding-bottom: 5px;
}
.songList::-webkit-scrollbar {
  width: 7px;
}
.songList::-webkit-scrollbar-thumb {
  background: #b5c2ca;
  border-radius: 5px;
}
.detail {
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 210px;
  width: 100%;
  /* background-color: pink; */
}
.leftImg {
  width: 180px;
  height: 180px;
  border-radius: 5px;
  overflow: hidden;
  border: 0.5px solid #ccc;
}
.rightContain {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  /* background-color: blueviolet; */
  padding-left: 13px;
}
.containBottom div {
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}
.containBottom div:last-child {
  margin-bottom: 0;
  width: 230px;
  /* background-color: pink; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.listTable {
  width: 100%;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  /* padding-right: 20px; */
}
</style>
