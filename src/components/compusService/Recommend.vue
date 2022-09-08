<template>
  <div class="musicContent">
    <div class="headers">
      <h3>个性推荐</h3>
    </div>
    <div class="banner">
      <el-carousel ref="carousel" :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in bannerData" :key="item">
          <div class="bannerImgBox">
            <img lazy class="bannerImg" :src="item.imageUrl" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="musicList">
      <h3>推荐歌单&nbsp;></h3>
      <div class="musciListContent">
        <div class="listItem" v-for="item in recommend" :key="item" @click="toSongList(item.id)">
          <div class="containtTop">
            <el-image lazy class="recommendImg" :src="item.coverImgUrl" alt="" />
          </div>
          <div class="containtBottom">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { zlrequest2 } from '../../service'
import { musicStore } from '../../store/music/music.js'

// 轮播图
const bannerData = ref()
const getBanner = async () => {
  const res = await zlrequest2.request({
    method: 'get',
    url: '/banner',
  })
  if (res.status == 200) {
    bannerData.value = res.data.banners
  }
}
const carousel = ref()
getBanner()
// 手动切换轮播图
onMounted(() => {
  setTimeout(() => {
    carousel.value.setActiveItem(0)
  }, 20)
})

// 推荐歌单
const recommend = ref()
const getRecommend = async () => {
  const res = await zlrequest2.request({
    method: 'get',
    url: '/top/playlist',
    params: {
      limit: 15,
    },
  })
  if (res.status == 200) {
    recommend.value = res.data.playlists
  }
  console.log(res.data)
}
getRecommend()

// 点击歌单 传入歌单id 保存到store
const router = useRouter()
const store = musicStore()
const toSongList = (id) => {
  store.changeMusicListId(id)
  router.push('/relax/songList')
}
</script>

<style scoped>
.musicContent {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  overflow-y: overlay;
  background-color: #fff;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.musicContent::-webkit-scrollbar {
  width: 7px;
}
.musicContent::-webkit-scrollbar-thumb {
  background: #b5c2ca;
  border-radius: 5px;
}
.headers {
  color: #333;
}
.banner {
  width: 100%;
  height: 250px;
  /* background-color: pink; */
  padding: 10px;
}
.bannerImgBox {
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}
.bannerImg {
  width: 100%;
}
.musicList {
  width: 100%;
  height: 400px;
}
.musicList h3 {
  color: #333;
}
.musciListContent {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 5px;
}
.musciListContent .listItem {
  width: 19%;
  margin-top: 10px;
}
.listItem .containtTop {
  width: 100%;
  /* height: 250px; */
  border: 0.5px solid #ccc;
  overflow: hidden;
  border-radius: 5px;
}
.listItem .containtTop .recommendImg {
  display: block;
  width: 100%;
}
.listItem .containtBottom {
  width: 100%;
  margin-top: 7px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
