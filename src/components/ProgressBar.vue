<template>
  <div class="ChangeProgress"
       @click='this.ChangeProgress'
       ref="progressbar">
    <div class="ColorProgress">
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import { getPercent } from '@/components/utilities/getPercent'
let html = document.documentElement
let layout = html.clientWidth || document.body.clientWidth
html.style.fontSize = layout / 3.75 + 'px'
export default {
  data () {
    return {

    }
  },
  props: {
    progress: {
      type: Number,
      default: 0
    },
    barColor: {
      type: String,
      default: '#2f9842'
    },
    duration: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ChangeProgress (e) {
      let progress = (e.clientX - this.$refs.progressbar.getBoundingClientRect().left) / this.$refs.progressbar.clientWidth
      EventBus.$emit('ChangeProgress', progress * this.duration)
    }
  },
  watch: {
    'currentTime' () {
      document.getElementsByClassName('ColorProgress')[0].style.width = getPercent(this.currentTime, this.duration)
    }
  },
  mounted () {
    EventBus.$on('pushCurrent', () => {
      document.getElementsByClassName('ColorProgress')[0].style.width = getPercent(this.currentTime, this.duration)
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.ChangeProgress {
  width: 3.75rem;
  height: 10px;
  background-color: #f0f0f0;
}
.ColorProgress {
  width: 0;
  height: 10px;
  background-color: rgb(33, 211, 255);
}
</style>
