// eslint-disable-next-line 
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import MainPage from '@/components/MainPage'
import Option from '@/components/Option'
import Lrc from '@/components/Lrc'
import Mplayer from '@/components/Mplayer'
import MusicList from '@/components/MusicList'
import Cover from '@/components/cover'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '',
    components: {
      default: Main
    },
    children: [{
        path: '',
        component: MainPage,
        name: '',
        children: [{
          path: '',
          component: Mplayer,
          name: '',
          props: true,
          children: [{
              path: '/lrc',
              component: Lrc,
              name: 'Lrc'
            },
            {
              path: '/list',
              component: MusicList,
              name: 'List'
            },
            {
              path: '/',
              component: Cover,
              name: 'Cover'
            }
          ]
        }]
      },
      {
        path: '/Option',
        component: Option,
        name: 'Option'
      }
    ]
  }]
})
