<template>
    <div>
        <transition name="fade"
                    mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <MusicPlayer :url="currentMusic.file"
                     :paused="paused" />
        <div>
            <!-- <a href="#/list">list</a>
            <a href="#/">main</a>
            <a href="#/lrc">lrc</a> -->
        </div>
    </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer'
import { MUSIC_LIST } from '@/assets/musicList'
import { EventBus } from '@/EventBus'
/* let html = document.documentElement
let layout = html.clientWidth || document.body.clientWidth
html.style.fontSize = layout / 3.75 + 'px' */
export default {
    name: 'Main',
    components: {
        MusicPlayer
    },
    data () {
        return {
            musicList: MUSIC_LIST,
            currentIndex: 0,
            paused: true,
            playMode: 'order',
            transitionName: ''
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
            EventBus.$emit('pushLrc', this.currentMusic.lrc)
            EventBus.$emit('pushList', {
                musicList: this.musicList,
                currentIndex: this.currentIndex
            })
        },
        '$route' (to, from) {
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
                })
            }
            if (to.name === 'Lrc') {
                this.$nextTick(() => {
                    EventBus.$emit('pushLrc', this.currentMusic.lrc)
                })
            }
            if (to.name === 'Cover') {
                this.$nextTick(() => {
                    EventBus.$emit('pushItem', this.currentMusic)
                    EventBus.$emit('pushPaused', this.paused)
                })
            }
        }
    },
    mounted () {
        EventBus.$emit('pushList', {
            musicList: this.musicList,
            currentIndex: this.currentIndex
        })
        EventBus.$emit('pushLrc', this.currentMusic.lrc)
        EventBus.$on('playModeChange', mode => {
            this.playMode = mode
        })
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
            if (this.playMode !== 'random') {
                if (index >= leng - 1) {
                    this.currentIndex = 0
                } else {
                    this.currentIndex = this.currentIndex + 1
                }
            } else {
                let randomSong = Math.floor(Math.random() * leng)
                if (randomSong === this.currentIndex) {
                    this.currentIndex = Math.floor(Math.random() * leng)
                } else {
                    this.currentIndex = randomSong
                }
            }
        })
        EventBus.$on('changeIndex', musicIndex => {
            this.paused = false
            this.currentIndex = musicIndex
            EventBus.$emit('pushLrc', this.currentMusic.lrc)
            EventBus.$emit('pushPaused', this.paused)
        })
        EventBus.$on('ended', () => {
            if (this.playMode === 'cycle') {
                EventBus.$emit('refreshLrc')
                EventBus.$emit('ChangeProgress', 0)
            } else {
                EventBus.$emit('next')
                EventBus.$emit('refreshLrc')
            }
        })
        EventBus.$on('deleteMusicItem', e => {
            let oldCurIndex = this.currentIndex
            if (this.musicList.length > 1) {
                let deleteIndex = this.musicList.indexOf(this.musicList[e])
                this.musicList = this.musicList.filter(item => item !== this.musicList[e])
                if (oldCurIndex > deleteIndex) {
                    this.currentIndex = oldCurIndex - 1
                } else if (oldCurIndex < deleteIndex) {
                    // 不变
                } else {
                    this.currentIndex = oldCurIndex % this.musicList.length
                }
                /*  if (this.musicList.length > 1) {
                     this.musicList = this.musicList.filter(item => item !== this.musicList[e])
                     EventBus.$emit('pushList', {
                         musicList: this.musicList,
                         currentIndex: this.currentIndex
                     })
                 } */
            }
        })
        EventBus.$emit('pushList', {
            musicList: this.musicList,
            currentIndex: this.currentIndex
        })
    }
}
</script>

<style>
* {
  font-size: 0.25rem;
}
div {
  overflow: hidden;
  width: 3.75rem;
}
</style>
