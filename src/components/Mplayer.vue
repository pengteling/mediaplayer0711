<template>
  <div>
    <div>
      <i @click="prev">上一首</i>
      <i @click="playPause">{{this.paused ? "播放" : "暂停"}}</i>
      <i @click="next">下一首</i>
      <div>-{{restTime}}</div>
      <progressBar :duration='duration'
                   :currentTime='currentTime' />
      <volumeBar :volume='volume' />
      <div>{{ currentMusic.title }}</div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import volumeBar from '@/components/VolumeBar'
import progressBar from '@/components/ProgressBar'
import { formatTime } from '@/components/utilities/formatTime'
/* import { getPercent } from '@/components/utilities/getPercent' */
export default {
  name: 'Mplayer',
  components: {
    volumeBar, progressBar
  },
  data () {
    return {
      currentMusic: {},
      repeatType: 'cycle',
      paused: true
    }
  },
  props: {
    volume: {
      type: Number,
      default: 80
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
  mounted () {
    EventBus.$on('pushItem', currentMusic => {
      this.currentMusic = currentMusic
    })
    EventBus.$on('pushPaused', pushpaused => {
      this.paused = pushpaused
    })
  },
  computed: {
    restTime () {
      return formatTime(this.duration - this.currentTime)
    },
    currentPercent () {
      return this.currentTime / this.duration * 100
    }
  },
  watch: {
    'paused' () {
      EventBus.$emit('playPause', this.paused)
    }
    /*     'currentTime' () {
          this.paused = false
        } */
  },
  methods: {
    playPause () {
      this.paused = !this.paused
    },
    prev () {
      EventBus.$emit('prev')
    },
    next () {
      EventBus.$emit('next')
    }
  }
  /* mounted () {
    EventBus.$on('getCurrentTime', () => {
      
    })
  } */
}
</script>

<style>
</style>
