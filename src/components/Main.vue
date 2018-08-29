<template>
    <div>
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>
        <MusicPlayer :url="currentMusic.file"
                     :paused="paused" />
        <div>
            <a href="#/list">list</a>
            <a href="#/">main</a>
            <a href="#/lrc">lrc</a>
        </div>

    </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer'
import { MUSIC_LIST } from '@/assets/musicList'
import { EventBus } from '@/EventBus'
let html = document.documentElement
let layout = html.clientWidth || document.body.clientWidth
html.style.fontSize = layout / 3.75 + 'px'
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
                    console.log(this.paused)
                })
            }
            if (to.name === 'Lrc') {
                this.$nextTick(() => {
                    EventBus.$emit('pushLrc', this.currentMusic.lrc)
                })
            }
        }
    },
    mounted () {
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
            this.currentIndex = musicIndex - 1
            this.paused = false
        })
        EventBus.$on('ended', () => {
            if (this.playMode === 'cycle') {
                EventBus.$emit('pushLrc', this.currentMusic.lrc)
                EventBus.$emit('refreshLrc')
                EventBus.$emit('ChangeProgress', 0)
            } else {
                EventBus.$emit('next')
                EventBus.$emit('pushLrc', this.currentMusic.lrc)
                EventBus.$emit('refreshLrc')
                console.log(this.musicList.length, this.currentIndex)
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
/* .fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
  position: relative;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter {
  left: 50px;
}
.fade-leave-to {
  left: -50px;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
  left: 0;
}
</style>
