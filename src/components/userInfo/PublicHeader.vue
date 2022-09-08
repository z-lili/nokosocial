<template>
  <div class="publicHeader">
    <span class="shu"></span>
    <span class="title">{{ props.headerTitle }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  headerTitle: {
    type: String,
    requierd: true,
  },
})
</script>

<style scoped>
.publicHeader {
  display: flex;
  align-items: center;
  width: 100%;
  height: 51px;
  border-bottom: 1px solid #e1e2e5;
}
.shu {
  display: inline-block;
  height: 15px;
  width: 3px;
  background-color: #00a1d6;
  margin-left: 20px;
  margin-right: 7px;
  border-radius: 3px;
}
.title {
  color: #00a1d6;
}
</style>
