<template>
  <div>
    <div class="header">
      <div class="back"
           @click='back'>
      </div>
      <div class="lrcTitle">歌词</div>
    </div>
    <div class="lrccontainer"
         ref="lrccontainer">
      <ul ref="lrcul"
          class="ul">
        <li v-for='(lrc,index) in this.lrcData'
            :key=index
            :ref='isCurrentLi(index)'
            :class='isCurrentLi(index)'
            class="li">
          {{lrc[1]}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/EventBus'
import { parseLrc } from '@/components/utilities/parseLrc'
export default {
  name: 'Lrc',
  data () {
    return {
      lrcData: [],
      currentTime: 0,
      currentLi: 0
    }
  },
  watch: {
    'currentLi' () {
      window.onload = () => {
        let h = document.getElementsByClassName('currentLi')[0].offsetTop - 150
        this.$refs.lrccontainer.scrollTop = h
      }
    }
  },
  computed: {
    isCurrentLi () {
      return (index) => {
        if (this.lrcData[index][0] <= this.currentTime && index >= this.currentLi) {
          return (this.currentLiA(index), 'currentLi')
        } else {
          return 'normalLi'
        }
      }
    }
  },
  methods: {
    currentLiA (index) {
      this.currentLi = index
      EventBus.$emit('currentLrc', this.lrcData[index][1])
    },
    back () {
      this.$router.push('/')
    }
  },
  created () {
    EventBus.$on('pushLrc', lrcData => {
      this.lrcData = parseLrc(lrcData)
    })
    EventBus.$on('getCurrentTime', currentTime => {
      this.currentTime = currentTime
      if (currentTime < 0.5) {
        this.currentLi = 0
      }
    })
    EventBus.$on('refreshLrc', () => {
      document.querySelector('.lrccontainer').scrollTop = 0
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
  font-size: 15px;
}
.currentLi {
  color: blueviolet;
  font-size: 18px;
}
.lrccontainer {
  position: absolute;
  top: 10vh;
  height: 65vh;
  width: 100vw;
  overflow: scroll;
  scroll-behavior: smooth;
  text-align: center;
}
.header {
  width: 100vw;
  height: 45px;
  position: fixed;
  border-bottom: #f0f0f0 1px solid;
  display: flex;
  flex: 1;
}
.lrcTitle {
  position: absolute;
  width: 100vw;
  text-align: center;
  font-size: 22px;
  line-height: 50px;
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
  z-index: 10;
}
</style >
