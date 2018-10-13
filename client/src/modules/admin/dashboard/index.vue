<template>
  <div class="dashboard">
    <page-title summary="(各类后台数据统计)">仪表盘</page-title>
    <chart type="line"
      :data="list"
      :height="100"
      :options="options"></chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: ['#1fc8db', '#fce473', '#42afe3', '#ed6c63', '#97cd76'],
      list: {
        labels: ['a', 'b', 'c'],
        datasets: [
          {
            label: 'a',
            data: [1, 2, 3],
            borderColor: '#1fc8db',
            fill: false,
            lineTension: 0
          },
          {
            label: 'b',
            data: [2, 5, 4],
            borderColor: '#fce473',
            fill: false,
            lineTension: 0
          },
          {
            label: 'c',
            data: [3, 1, 4],
            borderColor: '#ed6c63',
            fill: false,
            lineTension: 0
          }
        ]
      },
      options: {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

