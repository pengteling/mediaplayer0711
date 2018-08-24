<template>
  <div>
    <div>
      <i @click="prev">上一首</i>
      <i @click="playPause">{{this.paused ? "播放" : "暂停"}}</i>
      <i @click="next">下一首</i>
      <div>-{{restTime}}</div>
      <volumeBar/>
      <progressBar/>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import volumeBar from '@/components/VolumeBar'
import progressBar from '@/components/ProgressBar'
import { formatTime } from '@/components/utilities/formatTime'
export default {
  components: {
    volumeBar, progressBar
  },
  data () {
    return {
      currentItem: {},
      repeatType: 'cycle',
      paused: true,
      currentTime: 0,
      duration: 0,
      volume: 80
    }
  },
  mounted () {
    EventBus.$on('pushItem', currentItem => {
      this.currentItem = currentItem
    })
    EventBus.$on('getDuration', duration => {
      this.duration = duration
    })
    EventBus.$on('getCurrentTime', currentTime => {
      this.currentTime = currentTime
    })
    EventBus.$on('play', () => {
      this.paused = false
    })
  },
  computed: {
    restTime () {
      return formatTime(this.duration - this.currentTime)
    }
  },
  methods: {
    playPause () {
      this.paused = !this.paused
      EventBus.$emit('playPause', this.paused)
    },
    prev () {
      EventBus.$emit('prev')
    },
    next () {
      EventBus.$emit('next')
    }
  }
}
</script>

<style>
</style>
