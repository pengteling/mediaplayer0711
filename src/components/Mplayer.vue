<template>
  <div>
    <div>
      <i class="icon ml20"
         @click="playPause">播放/暂停</i>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
export default {
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
  create () {
    EventBus.$on('pushItem', (currentItem) => {
      this.currentItem = currentItem
    })
  },
  methods: {
    playPause () {
      this.paused = !this.paused
      EventBus.$emit('playPause', this.paused)
    }
  }
}
</script>

<style>
</style>
