<template>
  <div class="crawler">
    <page-title summary="(手动管理爬虫状态)">爬虫开关</page-title>
    <div class="crawler__grid">
      <div v-for="(item,index) of websiteList"
        :key="index"
        class="crawler__item">
        <span>{{item.name}}</span>
        <i-button @click="reStartCrawler(item)">{{getRunState(item.state)}}</i-button>
      </div>
      <div ref="logBox"
        class="crawler__log"></div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      socket: io('http://localhost:3000', {
        transports: ['websocket']
      }),
      logBox: undefined,
      websiteList: [
        {
          name: 'mangaBox',
          value: 'mangaBox',
          state: 0
        }
      ]
    }
  },

  methods: {
    getRunState(state) {
      switch (state) {
        case 0:
          return '开始爬取'
        case 1:
          return '正在爬取'
        case 2:
          return '再次爬取'
      }
    },

    reStartCrawler(item) {
      // this.$get({
      //   api: '/comic/crawler',
      //   param: {
      //     website: item.value
      //   },
      //   config: {
      //     timeout: 60000
      //   }
      // })
      this.socket.emit('message', {
        api: '/comic/crawler',
        param: { website: item.value }
      })
    },

    printLog(log) {
      let style = log.error ? 'color:red;' : ''
      const p = $(`<p style="${style}">[${log.date}] ${log.message}</p>`)
      Object.keys(this.logBox.data()).forEach(key => {
        p.attr('data-' + key, this.logBox.data(key))
      })
      this.logBox.prepend(p)

      // this.logBox.scrollTop(this.logBox[0].scrollHeight)
    },

    initSocket() {
      this.socket.on('connect', () => {
        console.log('message send')
        this.socket.emit('message', { api: 'init' })
      })
      this.socket.on('message', data => {
        this.printLog(data)
      })
      this.socket.on('reconnect_attempt', () => {
        this.socket.io.opts.transports = ['polling', 'websocket']
      })
    }
  },

  mounted() {
    this.logBox = $(this.$refs.logBox)
    this.initSocket()
  }
}
</script>

<style lang="scss" scoped>
.crawler {
  &__log {
    height: 400px;
    overflow-y: auto;
    margin-top: 10px;
    border: 1px solid #ccc;
    padding: 10px;
  }
}
</style>
