<template>
    <div>
        主体
        <router-view></router-view>
        <MusicPlayer :url="currentMusic.file"
                     :paused="paused" />
    </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer'
import { MUSIC_LIST } from '@/assets/musicList'
import { EventBus } from '@/EventBus'
export default {
    name: 'Main',
    components: {
        MusicPlayer
    },
    data () {
        return {
            musicList: MUSIC_LIST,
            currentIndex: 0,
            paused: true
        }
    },
    computed: {
        currentMusic () {
            return this.musicList[this.currentIndex]
        }
    },
    mounted () {
        EventBus.$emit('pushItem', this.currentMusic)
        EventBus.$on('playPause', paused => {
            this.paused = paused
        })
        /*     EventBus.$on('pause', () => { this.paused = false }) */
    }
}
</script>

<style>
</style>
