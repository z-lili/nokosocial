<template>
  <!-- 首页 -->
  <div class="index">
    <Header></Header>
    <div class="contentcover-box">
      <div class="text-box">
        <p>noko</p>
        <h1>SOCIAL</h1>
        <h3>A website focusing on social networking on campus</h3>
        <div class="row">
          <a href="#">探索更多</a>
          <a href="#">联系我们 &#x27F6;</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../views/Header.vue'
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent), url('../assets/img/home-background .png');
  background-size: cover;
  background-position: center;
  /* padding: 0 8%; */
  position: relative;
}
.contentcover-box {
  width: 100%;
  display: flex;
  justify-content: center;
}
.text-box {
  width: 80%;
  color: #fff;
  position: absolute;
  bottom: 8%;
}
.text-box p {
  font-size: 40px;
  font-weight: normal;
}
.text-box h1 {
  font-size: 190px;
  line-height: 160px;
  margin-left: -10px;
  color: transparent;
  -webkit-text-stroke: 1px #fff;
  background: url('../assets/img/wenziback.png');
  -webkit-background-clip: text;
  background-clip: text;
  background-position: 0 0;
  animation: back 30s linear infinite;
}
@keyframes back {
  100% {
    background-position: 2000px 0;
  }
}
.text-box h3 {
  font-size: 35px;
  font-weight: 600;
}
.text-box .row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
}
.text-box .row a {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  margin-right: 20px;
  border: 2px solid #fff;
}
</style>
