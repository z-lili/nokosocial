<template>
  <div class="momentRight">
    <div class="notice">
      <div class="noticeImg">
        <el-image class="elImg" style="width: 100%" src="/src/assets/img/notice.jpg" fit="contain" />
      </div>
    </div>
    <!-- 话题 -->
    <div class="topic">
      <ul>
        <li>
          <p style="font-size: 16px color:black">话题</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; 霍格沃茨也开学了</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; iPhone14系列价格或上涨15%</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; 记录夏日生活碎片</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; 关注四川泸定地震最新救援进展</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; 鄱阳湖极枯水水位，湖中古桥显现</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; 人可以没有社交吗</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; 你有没有遇到过彩色牛肉？</p>
        </li>
        <li>
          <i class="iconfont icon-label icon"></i>
          <p>&nbsp; 特拉斯将出任英国新任首相</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.momentRight {
  width: 100%;
}
.notice {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
}
.noticeImg {
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
}
.noticeImg .elImg {
  display: block;
}
.topic {
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 5px;
}
.topic li {
  display: flex;
  color: #18191c;
  font-size: 14px;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 5px;
}
.topic li:hover {
  cursor: default;
  color: #008ac5;
}
.icon {
  color: #008ac5;
}
</style>
