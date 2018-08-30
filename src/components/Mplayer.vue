<template>
  <div class="container">
    <div>
      <div class="controllerContainer">
        <div :class="this.playMode"
             @click='playModeChange(playMode)'></div>
        <div class="prev"
             @click="prev"></div>
        <div :class='this.paused ? "play" : "paused"'
             @click="playPause"></div>
        <div class="next"
             @click="next"></div>
        <div class="playList"
             @click='playList'></div>
      </div>
      <progressBar :duration='duration'
                   :currentTime='currentTime' />
      <!-- <volumeBar :volume='volume' /> -->
      <transition :name="transitionName">
        <keep-alive>
          <router-view :duration='duration'
                       :currentTime='currentTime'
                       :volume='volume'></router-view>
        </keep-alive>
      </transition>
      <div class="lrcPage">
        <lrcComponents />
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/EventBus'
import lrcComponents from '@/components/Lrc'
import volumeBar from '@/components/VolumeBar'
import progressBar from '@/components/ProgressBar'
export default {
  name: 'Mplayer',
  components: {
    volumeBar, progressBar, lrcComponents
  },
  data () {
    return {
      currentMusic: {},
      repeatType: 'cycle',
      paused: true,
      playMode: 'order',
      currentLrc: '',
      transitionName: ''
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
    EventBus.$on('currentLrc', lrc => {
      this.currentLrc = lrc
    })
    EventBus.$on('pushItem', currentMusic => {
      this.currentMusic = currentMusic
    })
    EventBus.$on('pushPaused', pushpaused => {
      this.paused = pushpaused
    })
  },
  computed: {
    currentPercent () {
      return this.currentTime / this.duration * 100
    }
  },
  watch: {
    'paused' () {
      EventBus.$emit('playPause', this.paused)
    },
    '$route' (to, from) {
      const toDepth = to.path.length
      const fromDepth = from.path.length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods: {
    playList () {
      this.$router.push('list')
    },
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
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 100vw;
}
.prev {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 8.88rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.play {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 6.38rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.paused {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 3.88rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.next {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 7.68rem;
  background-position-y: -1.1rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.order {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 2.63rem;
  background-position-y: -2.35rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.random {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 5.12rem;
  background-position-y: -2.35rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.cycle {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: 3.88rem;
  background-position-y: -2.35rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.playList {
  background-size: 12rem 18rem;
  background-image: url(../image/icon.png);
  background-position-x: -1.84rem;
  background-position-y: -9.85rem;
  /* background-color: black; */
  height: 1rem;
  width: 1rem;
}
.controllerContainer {
  display: flex;
  position: fixed;
  width: 100vw;
  flex: 1;
  bottom: 8vh;
  justify-content: space-around;
  flex-grow: 1;
}
.controllerContainer div {
  transform: scale(0.8);
}

.titleContainer {
  position: fixed;
  width: 100vw;
  top: 50vh;
  text-align: center;
  font-size: 18px;
}
.lrcPage {
  display: none;
}
.lrcContainer {
  position: fixed;
  width: 100vw;
  top: 60vh;
  text-align: center;
  font-size: 14px;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1s;
  position: relative;
}
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}
.slide-left-enter {
  left: 100vw;
}
.slide-left-leave-to {
  left: -100vw;
}
.slide-left-enter-to,
.slide-left-leave {
  opacity: 1;
  left: 0;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 1s;
  position: relative;
}
.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
}
.slide-right-enter {
  right: 100vw;
}
.slide-right-leave-to {
  right: -100vw;
}
.slide-right-enter-to,
.slide-right-leave {
  opacity: 1;
  right: 0;
}
</style>
