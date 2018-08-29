<template>
  <div class="lrccontainer"
       ref="lrccontainer">
    <ul ref="lrcul"
        class="ul">
      <li v-for='(lrc,index) in this.lrcData'
          :key=index
          :ref='isCurrentLi(index)'
          :class='isCurrentLi(index)'>
        {{lrc[1]}}
      </li>
    </ul>
  </div>
</template>
<script>
import { EventBus } from '@/EventBus'
import { parseLrc } from '@/components/utilities/parseLrc'
let html = document.documentElement
let layout = html.clientWidth || document.body.clientWidth
html.style.fontSize = layout / 3.75 + 'px'
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
      let h = this.$refs.currentLi[0].offsetTop - 245
      document.querySelector('.lrccontainer').scrollTop = h
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
    }
  },
  /*     created () {
        EventBus.$on('pushLrc', lrcData => {
          this.lrcData = parseLrc(lrcData)
        })
  }, */
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
}
.currentLi {
  color: blueviolet;
}
.lrccontainer {
  height: 7rem;
  overflow: scroll;
  scroll-behavior: smooth;
}
</style >
