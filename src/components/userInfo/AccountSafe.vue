<template>
  <div class="acountSafe">
    <PublicHeader :headerTitle="title"></PublicHeader>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PublicHeader from './PublicHeader.vue'

const title = ref('账号安全')
</script>

<style scoped></style>
