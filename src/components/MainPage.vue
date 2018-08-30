<template>
    <div>
        <transition name="fade">
            <keep-alive>
                <router-view :duration='duration'
                             :currentTime='currentTime'
                             :volume='volume'></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
import { EventBus } from '@/EventBus'
export default {
    data () {
        return {
            duration: 0,
            currentTime: 0,
            volume: 80,
            paused: true,
            currentLrc: ''
        }
    },
    mounted () {
        EventBus.$on('currentLrc', lrc => {
            this.currentLrc = lrc
        })
        EventBus.$on('pushItem', () => {
            EventBus.$on('getDuration', duration => {
                this.duration = duration
            })
            EventBus.$on('getCurrentTime', currentTime => {
                this.currentTime = currentTime
            })
        })
        EventBus.$on('changeVolume', volume => {
            this.volume = volume
        })
        EventBus.$on('playPause', paused => {
            this.paused = paused
        })
        EventBus.$on('play', () => {
            this.paused = false
        })
    }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
