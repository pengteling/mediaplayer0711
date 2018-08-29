<template>
  <div>
    <li v-for="(musicList, index) in this.musicList"
        :key="index"
        @click='changeIndex(musicList)'
        :class='{isPlaying:index==eventId-1}'>{{musicList.title}}-{{musicList.artist}}
      <p @click='deleteItem'>删除</p>
    </li>
  </div>
</template>

<script>

import { EventBus } from '@/EventBus'
let html = document.documentElement
let layout = html.clientWidth || document.body.clientWidth
html.style.fontSize = layout / 3.75 + 'px'
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
      this.$router.push({
        path: '/'
      })
    },
    deleteItem () {
      alert('delete')
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
* {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
.isPlaying {
  color: rgb(252, 106, 106);
}
</style>
