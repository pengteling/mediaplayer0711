<template>
  <div>
    <div class="header">
      <div class="back"
           @click='back'>
      </div>
      <div class="listTitle">歌单</div>
    </div>
    <div class="listContainer">
      <li v-for="(musicList, index) in this.musicList"
          :key="`${musicList}-${index}`"
          @click='changeIndex(index)'
          class="musicList"
          :class='{isPlaying:index==eventId-1}'>{{musicList.title}}-{{musicList.artist}}
        <p @click.stop='deleteItem(index)'>删除</p>
      </li>
    </div>
  </div>
</template>

<script>
/* import { guid } from '@/components/utilities/guid' */
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
    changeIndex (index) {
      console.log(index)
      EventBus.$emit('changeIndex', index)
      this.eventId = index
    },
    deleteItem (e) {
      console.log(e)
      EventBus.$emit('deleteMusicItem', e)
    },
    back () {
      this.$router.push('/')
    }
  },
  mounted () {
    EventBus.$on('pushList', (musicInfo) => {
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
  color: rgb(151, 0, 151);
  background-color: rgb(250, 212, 240);
}
.header {
  width: 100vw;
  height: 45px;
  position: fixed;
  border-bottom: #f0f0f0 1px solid;
}
.back {
  position: relative;
  top: -25px;
  left: -25px;
  width: 100px;
  height: 100px;
  background-image: url(../image/icon.png);
  background-position-x: 520px;
  background-position-y: -360px;
  transform: scale(0.5);
}
.listContainer {
  position: absolute;
  top: 10vh;
  height: 65vh;
  width: 100vw;
  overflow: scroll;
  scroll-behavior: smooth;
  text-align: center;
  z-index: 10;
}
.listTitle {
  position: absolute;
  width: 100vw;
  text-align: center;
  font-size: 22px;
  line-height: 50px;
}
.musicList {
  width: 98vw;
  height: 10vh;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 1vw;
  font-size: 18px;
  border-bottom: #f0f0f0 1px solid;
  line-height: 10vh;
}
</style>
