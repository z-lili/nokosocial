<template>
  <div class="home">
    <router-view></router-view>
    <!-- audio -->
    <div class="audio">
      <Aplayer
        ref="playerRef"
        class="player"
        :music="{
          title: songMessage.name + '~',
          artist: songMessage.al.name,
          src: playList,
          pic: songMessage.al.picUrl,
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { musicStore } from './store/music/music.js'
import { storeToRefs } from 'pinia'
import Aplayer from 'vue3-aplayer'

// 获取播放地址
const store = musicStore()
const { playList } = storeToRefs(store)

// 获取歌曲信息
const { songMessage } = storeToRefs(store)
// 自动播放
const playerRef = ref()
const { flag } = storeToRefs(store)
watch(
  () => flag.value,
  () => {
    if (flag.value) {
      setTimeout(() => {
        playerRef.value.play()
        store.changeFlag(false)
      }, 500)
    }
  }
)
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.audio {
  z-index: 99999;
  position: fixed;
  display: flex;
  align-items: center;
  width: 240px;
  height: 100px;
  border-radius: 35px;
  overflow: hidden;
  /* background-color: pink; */
  left: -210px;
  bottom: 20px;
  transition: all 0.5s linear;
}
.audio:hover {
  left: 0px;
}
.player {
  border-radius: 30px;
}
</style>
