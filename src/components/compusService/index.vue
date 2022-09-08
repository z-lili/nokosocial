<template>
  <div class="index">
    <HeaderVue></HeaderVue>
    <div class="contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Aplayer from 'vue3-aplayer'
import { musicStore } from '../../store/music/music'
import { storeToRefs } from 'pinia'
import HeaderVue from '../../views/Header.vue'

// 获取播放地址
const store = musicStore()
const { playList } = storeToRefs(store)

// 获取歌曲信息
const { songMessage } = storeToRefs(store)
const playMusic = () => {
  console.log('44444444444')
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent), url('../../assets/img/background.png');
  background-size: cover;
  background-position: center;
  background-attachment: local;
}
.contain {
  width: 80%;
  height: calc(100% - 71px);
  margin: 0 auto;
  background-color: #fff;
}
</style>
