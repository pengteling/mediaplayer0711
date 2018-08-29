<template>
  <div>
    <ul>
      <li v-for='(lrc,index) in this.lrcData'
          :key=index
          ref="lrcli"
          :class='isCurrentLi(index)'>
        {{lrc[1]}}
      </li>
    </ul>
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
  mounted () {
    EventBus.$on('pushLrc', lrcData => {
      this.lrcData = parseLrc(lrcData)
    })
    EventBus.$on('getCurrentTime', currentTime => {
      this.currentTime = currentTime
    })
  }
}
</script>
<style>
li {
  list-style-type: none;
}
.currentLi {
  color: blueviolet;
}
</style >
