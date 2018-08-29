<template>
  <div class="container">
    <div>
      <div>
        <i @click="prev">
          <div class="prev"></div>
        </i>
        <i @click="playPause">
          <div :class='this.paused ? "play" : "paused"'></div>
        </i>
        <i @click="next">
          <div class="next"></div>
        </i>
        <i @click='playModeChange(playMode)'>
          <div :class="this.playMode"></div>
        </i>
      </div>
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
let html = document.documentElement
let layout = html.clientWidth || document.body.clientWidth
html.style.fontSize = layout / 3.75 + 'px'
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
      paused: true,
      playMode: 'order'
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
    },
    playModeChange (playMode) {
      console.log(playMode)
      switch (playMode) {
        case 'order':
          this.playMode = 'random'
          EventBus.$emit('playModeChange', 'random')
          break
        case 'random':
          this.playMode = 'cycle'
          EventBus.$emit('playModeChange', 'cycle')
          break
        case 'cycle':
          this.playMode = 'order'
          EventBus.$emit('playModeChange', 'order')
          break
      }
    }
  }
  /* mounted () {
    EventBus.$on('getCurrentTime', () => {
      
    })
  } */
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 3.75rem;
}
.prev {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 9rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.play {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 6.5rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.paused {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 4rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.next {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 7.8rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.order {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 2.75rem;
  background-position-y: -2.35rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.random {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 5.24rem;
  background-position-y: -2.35rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.cycle {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 4rem;
  background-position-y: -2.35rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
</style>
