<template>
  <div>
    <li v-for="(musicList, index) in this.musicList"
        :key="index"
        @click='changeIndex(musicList)'
        :class='{isPlaying:index==eventId-1}'>{{musicList.title}}-{{musicList.artist}}</li>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
export default {
  name: 'List',
  data () {
    return {
      musicList: [],
      currentIndex: 0,
      eventId: 0
    }
  },
  methods: {
    changeIndex (event) {
      EventBus.$emit('changeIndex', event.id)
      this.eventId = event.id
    }
  },
  mounted () {
    EventBus.$on('pushList', (musicInfo) => {
      console.log(musicInfo.currentIndex)
      this.musicList = musicInfo.musicList
      this.currentIndex = musicInfo.currentIndex
      this.eventId = musicInfo.currentIndex + 1
    })
  }
}
</script>

<style>
li {
  list-style-type: none;
}
.isPlaying {
  color: rgb(252, 106, 106);
}
</style>
