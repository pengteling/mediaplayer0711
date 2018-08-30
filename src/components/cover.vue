<template>
  <div>
    <div class="header">
      <div class="coverHeader">小苹果播放器</div>
    </div>
    <a href="#/lrc">
      <div class="imgContainer"
           :class="!this.paused? 'roll': 'static'">
        <div class="coverContainer">
          <img :src="this.currentMusic.cover"
               alt="">
        </div>
      </div>
    </a>
    <div class="titleContainer">{{ currentMusic.title }}</div>
    <a href="#/lrc">
      <div class="lrcContainer">{{currentLrc}}</div>
    </a>
  </div>
</template>
<script>
import { EventBus } from '@/EventBus'
export default {
  name: 'Cover',
  data () {
    return {
      currentMusic: {},
      paused: true,
      currentLrc: ''
    }
  },
  created () {
    EventBus.$on('pushPaused', pushpaused => {
      this.paused = pushpaused
    })
    EventBus.$on('playPause', pushpaused => {
      this.paused = pushpaused
    })
    EventBus.$on('pushItem', currentMusic => {
      this.currentMusic = currentMusic
    })
    EventBus.$on('currentLrc', lrc => {
      this.currentLrc = lrc
    })
  }
}
</script>

<style>
.imgContainer {
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  animation: rotate 15s linear forwards infinite;
  position: absolute;
  left: 25vw;
  top: 18vh;
}
.coverContainer {
  width: 45vw;
  height: 45vw;
  border-radius: 50%;
  margin: center;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.roll {
  animation-play-state: running;
}
.static {
  animation-play-state: paused;
}
.header {
  width: 100vw;
  height: 45px;
  position: fixed;
  border-bottom: #f0f0f0 1px solid;
}
.coverHeader {
  position: absolute;
  width: 100vw;
  text-align: center;
  font-size: 22px;
  line-height: 50px;
}
</style>
