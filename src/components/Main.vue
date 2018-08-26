<template>
    <div>
        主体

        <router-view></router-view>
        <MusicPlayer :url="currentMusic.file"
                     :paused="paused" />
        <a href="#/list">list</a>
        <a href="#/">main</a>
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
    watch: {
        'currentMusic' (currentMusic) {
            EventBus.$emit('pushItem', currentMusic)
        },
        '$route' (to, form) {
            if (to.name === 'List') {
                this.$nextTick(() => {
                    EventBus.$emit('pushList', {
                        musicList: this.musicList,
                        currentIndex: this.currentIndex
                    })
                })
            }
            if (to.name === 'Mplayer') {
                this.$nextTick(() => {
                    EventBus.$emit('pushItem', this.currentMusic)
                    EventBus.$emit('pushPaused', this.paused)
                    EventBus.$emit('pushCurrent')
                    console.log(this.paused)
                })
            }
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
        EventBus.$on('changeIndex', musicIndex => {
            this.currentIndex = musicIndex - 1
            this.paused = false
        })
        EventBus.$on('ended', () => {
            EventBus.$emit('next')
        })
        EventBus.$emit('pushList', {
            musicList: this.musicList,
            currentIndex: this.currentIndex
        })
    }
}
</script>

<style>
</style>
