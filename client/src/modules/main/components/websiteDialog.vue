<template>
  <transition enter-active-class="fadeIn"
    leave-active-class="fadeOut"
    :duration="500">
    <div v-show="visible"
      class="website-dialog-wrapper">
      <div class="website-dialog">
        <div class="website-dialog__title">站点选择</div>
        <div class="website-dialog__close"
          @click="handleCloseClick">
          <Icon type="ios-close"
            size="40" />
        </div>
        <v-grid class="website-dialog__grid"
          item-width="150"
          width="600px"
          :gutter="6"
          :length="websiteList.length">
          <v-grid-item v-for="website of websiteList"
            class="grid__item"
            :key="website.id"
            @click.native="handleWebsiteChange(website)">
            <span class="grid__text"
              :class="{'grid__text--selected': website.isSelected}">
              {{website.label}}
            </span>
          </v-grid-item>
        </v-grid>
      </div>
    </div>
  </transition>
</template>

<script>
import { VGrid, VGridItem } from '@/components/vGrid'
export default {
  components: {
    VGrid,
    VGridItem
  },

  props: {
    visible: { type: Boolean },
    webisite: { type: String },
    list: { type: Array, default: () => [] }
  },

  data() {
    return {
      websiteList: [],
      mWebsite: { label: '站点' }
    }
  },

  methods: {
    selectWebSite(website) {
      this.websiteList.forEach(item => (item.isSelected = false))
      this.mWebsite = website
      website.isSelected = true
    },

    reGetOrigin() {
      this.$get({
        api: '/getOrigin',
        param: { type: 'comic' }
      }).then(data => {
        data.forEach((item, index) => {
          item.isSelected = false
        })
        this.websiteList = data
        if (this.websiteList.length) {
          this.selectWebSite(this.websiteList[0])
        }
      })
    },

    handleWebsiteChange(website) {
      this.selectWebSite(website)
    },

    handleCloseClick() {
      this.$emit('close')
    }
  },

  mounted() {
    this.reGetOrigin()
  },

  watch: {
    mWebsite(val) {
      this.$emit('website', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.website-dialog-wrapper {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.website-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 0 5px #a2a2a2;
  &__title {
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #d2d2d2;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    right: 6px;
    top: 6px;
  }

  &__grid {
    margin: 10px 0;
    .grid {
      &__item {
        text-align: center;
      }
      &__text {
        cursor: pointer;
        font-size: 16px;
        &--selected {
          color: $primary-color;
        }
        &:hover {
          color: $complementary-color;
        }
      }
    }
  }
}
</style>
