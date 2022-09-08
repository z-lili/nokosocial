<template>
  <div class="userAddres">
    <div class="bread">用户分布图</div>
    <div class="containBOx" ref="chinaMap"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from '../../assets/china.json'

const chinaMap = ref()
onMounted(() => {
  drawChina()
})
function drawChina() {
  // 初始化
  var myChart = echarts.init(chinaMap.value)
  echarts.registerMap('china', chinaJSON) //注册可用的地图
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)',
    },
    geo: {
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} (p / km2)',
      },
      show: true,
      //设置中心点
      center: [105.194115019531, 35.582111640625],
      map: 'china',
      // roam: true, //是否允许缩放，拖拽
      zoom: 1.7, //初始化大小
      //缩放大小限制
      scaleLimit: {
        min: 0.1, //最小
        max: 12, //最大
      },
      //各个省份模块样式设置
      itemStyle: {
        areaColor: '#eeeeee', //背景色
        color: '#333', //字体颜色
        borderColor: '#ccc',
        borderWidth: 2,
      },
      label: {
        normal: {
          show: true, // 是否显示对应地名
          textStyle: {
            color: 'rgba(0,0,0,0.4)',
          },
        },
      },
      //高亮状态
      emphasis: {
        itemStyle: {
          areaColor: '#00a1d7',
        },
        label: {
          show: true,
          color: '#fff',
        },
      },
      // 显示层级
      z: 10,
    },
  }
  myChart.setOption(option)
}
</script>

<style scoped>
.userAddres {
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
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
