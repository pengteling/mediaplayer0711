<template>
    <div>
        主体
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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
        EventBus.$on('prev', () => {
            let leng = this.musicList.length
            let index = this.currentIndex
            if (index <= 0) {
                this.currentIndex = leng - 1
            } else {
                this.currentIndex = this.currentIndex - 1
            }
        })
        EventBus.$on('next', () => {
            let leng = this.musicList.length
            let index = this.currentIndex
            if (index >= leng - 1) {
                this.currentIndex = 0
            } else {
                this.currentIndex = this.currentIndex + 1
            }
        })
    }
}
</script>

<style>
</style>
