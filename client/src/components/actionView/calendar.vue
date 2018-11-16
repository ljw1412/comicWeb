// 日历
<template>
  <div class="calendar">
    <div class="calendar__datetime">
      <div class="datetime__time">{{nTime}}</div>
      <div class="datetime__date">{{dateWithWeekday}}</div>
    </div>
    <div class="calendar__switch">
      <div class="switch__current-month">{{formatCNSeletedMonth}}</div>
      <div class="switch__button">
        <Icon class="button__up"
          type="ios-arrow-up"
          @click="onPreMonthClick" />
        <Icon class="button__down"
          type="ios-arrow-down"
          @click="onNextMonthClick" />
      </div>
    </div>
    <table class="calendar__table">
      <tr class="table__header">
        <th v-for="(weekName,index) of weekNameList"
          :key="index"
          class="table__cell">{{weekName}}</th>
      </tr>
      <tr v-for="week of 6"
        :key="week"
        class="table__body">
        <td v-for="weekday of 7"
          :key="weekday+(week-1)*7"
          class="table__cell"
          :data-x="week"
          :data-y="weekday">{{calendarList[weekday+(week-1)*7]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  props: {
    // 一周的开始: SUN-星期日 , 其他-星期一
    firstDay: { type: String, default: 'SUN' },
    // 现在的时间
    nTime: [String],
    // 现在的日期
    nDate: [String]
  },
  data() {
    return {
      // 选择的月份
      seletedMonth: moment().toDate(),
      // 选择月份下的日历数组
      calendarList: [],
      // 按年月缓存日历的映射
      calendarMap: {},
      highlightCircle: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    sundayIsFirstDay() {
      return this.firstDay === 'SUN'
    },
    weekNameList() {
      return this.sundayIsFirstDay
        ? ['日', '一', '二', '三', '四', '五', '六']
        : ['一', '二', '三', '四', '五', '六', '日']
    },
    dateWithWeekday() {
      return moment(this.nDate).format('YYYY-MM-DD,dddd')
    },
    formatSeletedMonth() {
      return moment(this.seletedMonth).format('YYYY-MM')
    },
    formatCNSeletedMonth() {
      return moment(this.seletedMonth).format('YYYY年MM月')
    }
  },
  methods: {
    calculate(month) {
      this.calendarList = []
      if (this.calendarMap[month]) {
        this.calendarList = this.calendarMap[month]
        return
      }
      const dayCount = this.daysInMonth(month)
      const startWeekOfMonth =
        (this.startWeekdayOfMonth(month) + (this.sundayIsFirstDay ? 1 : 0)) % 7

      for (let i = 1; i <= dayCount; i++) {
        this.calendarList[startWeekOfMonth + i] = i
      }
      this.calendarMap[month] = [...this.calendarList]
    },
    daysInMonth(month) {
      return moment(month, 'YYYY-MM').daysInMonth()
    },
    // 这个月1号的星期
    startWeekdayOfMonth(month) {
      return moment(month, 'YYYY-MM')
        .startOf('month')
        .weekday()
    },
    // 上一个月
    onPreMonthClick() {
      this.seletedMonth = moment(this.seletedMonth)
        .subtract(1, 'months')
        .toDate()
    },
    // 下一个月
    onNextMonthClick() {
      this.seletedMonth = moment(this.seletedMonth)
        .add(1, 'months')
        .toDate()
    }
  },
  mounted() {
    this.calculate(this.formatSeletedMonth)
  },
  watch: {
    formatSeletedMonth(val) {
      if (val) {
        this.calculate(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  user-select: none;
  background-color: black;
  padding: 10px;
  &__datetime {
    color: #fff;
    .datetime {
      &__date {
        font-size: 14px;
        margin-bottom: 20px;
        padding-left: 3px;
      }
      &__time {
        font-size: 30px;
      }
    }
  }
  &__switch {
    color: #fff;
    display: flex;
    justify-content: space-between;
    .switch {
      &__current-month {
        font-size: 18px;
        padding: 3px 0;
      }
      &__button {
        font-size: 22px;
        .button {
          &__up,
          &__down {
            &:hover {
              background: rgba($color: #fff, $alpha: 0.6);
            }
          }
        }
      }
    }
  }
  &__table {
    overflow: hidden;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    // background-color: #000;
    .table__cell {
      height: 36px;
      box-sizing: border-box;
      background-color: #000;
      border: 2px solid rgba(0, 0, 0, 0);
      &:hover {
        background: rgba($color: #fff, $alpha: 0.6);
      }
    }
  }
}
</style>
