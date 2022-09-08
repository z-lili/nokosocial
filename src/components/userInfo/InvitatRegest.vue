<template>
  <div class="invatateRegst">
    <PublicHeader :headerTitle="title"></PublicHeader>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PublicHeader from './PublicHeader.vue'

const title = ref('邀请注册')
</script>

<style scoped></style>
