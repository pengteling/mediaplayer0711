<template>
    <div>
        主体
        <router-view></router-view>
        <MusicPlayer url="
https://musicycsx.oss-cn-beijing.aliyuncs.com/%E8%8E%AB%E6%96%87%E8%94%9A%20-%20%E7%9B%9B%E5%A4%8F%E7%9A%84%E6%9E%9C%E5%AE%9E.mp3?Expires=1534782672&OSSAccessKeyId=TMP.AQG7-34trA29d4yQiq0Im8bogO2xg6YwrohNpoROuqrNOOPDEHlgUUgc0p8bAAAwLAIURTJ53zed9TEZX62RYaSZ6B6ZHMkCFCe2AKQDhPN3_ARS1VIRIkfsz7Nu&Signature=uHfejQ5%2FTlZKU%2BTizrjwCZ0eQkA%3D"
                     :paused="false" />
    </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer'
export default {
    name: 'Main',
    components: {
        MusicPlayer
    },
    data () {
        return {

        }
    }
}
</script>

<style>
</style>
