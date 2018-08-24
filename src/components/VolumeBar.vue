<template>
  <div class="ChangeVolume"
       @click='this.ChangeVolume'
       ref="progressbar">
    <div class="ColorVolume">
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
export default {
  props: {
    volume: {
      type: Number,
      default: 80
    },
    barColor: {
      type: String,
      default: '#2f9842'
    }
  },
  methods: {
    ChangeVolume (e) {
      let volume = (e.clientX - this.$refs.progressbar.getBoundingClientRect().left) / this.$refs.progressbar.clientWidth
      EventBus.$emit('changeVolume', volume * 100)
      document.getElementsByClassName('ColorVolume')[0].style.width = volume * 100 + '%'
    }
  }
}
</script>

<style>
.ChangeVolume {
  width: 200px;
  height: 10px;
  background-color: #f0f0f0;
}
.ColorVolume {
  width: 80%;
  height: 10px;
  background-color: rgb(255, 121, 121);
}
</style>
