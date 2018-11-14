// 日历
<template>
  <div class="calendar">
    <table class="calendar__table">
      <tr class="table__header">
        <th v-for="(weekName,index) of weekNameList"
          :key="index">{{weekName}}</th>
      </tr>
      <tr class="table__body">
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    firstDay: { type: String, default: 'SUN' }
  },
  data() {
    return {}
  },
  computed: {
    weekNameList() {
      return this.firstDay === 'SUN'
        ? ['日', '一', '二', '三', '四', '五', '六']
        : ['一', '二', '三', '四', '五', '六', '日']
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
