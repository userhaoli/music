import Vue from 'vue';
import Router from 'vue-router';
import home from '@/views/main/musicHall.vue';
Vue.use(Router);

const hall = resove => require(["@/views/main/children/Hall.vue"], resove)
const recommend = resove => require(['@/views/main/children/Recommend.vue'], resove)
const dynamic =  resove => require(['@/views/main/children/Dynamic.vue'], resove)
const search =  resove => require(["@/views/search/Search.vue"], resove)
const singer = resove => require(["@/views/singer/Singer.vue"], resove)
const playmusic =  resove => require(['@/views/playmusic/Playmusic.vue'], resove)
const comment =  resove => require(["@/views/comment/Comment.vue"], resove)
const rank = resove => require(["@/views/rank/Rank.vue"], resove)
const forget = resove => require(["@/views/forget/Forget.vue"], resove)
const artist = resove => require(["@/views/artist/Artist.vue"], resove)
const searchresult =  resove => require(["@/views/searchResult/SearchResult.vue"], resove)
const playlistclass =  resove => require(["@/views/playListClass/PlayListClass.vue"], resove)
const songlist = resove => require(["@/views/songList/SongList.vue"], resove)

export default new Router({
  routes: [
    {
      path: '/home',
      component: home,
      children: [{
          path: "/",
          component: hall
        },
        {
          path: "/recommend",
          component: recommend,
        },
        {
          path: "/dynamic",
          component: dynamic
        },
      ]
    },
    {
      path: "/search",
      component: search
    },
    {
      path: "/singer",
      component: singer,
    },
    {
      path: "/playmusic",
      component: playmusic
    },
    {
      path: "/comment",
      component: comment
    },
    {
      path: "/rank",
      component: rank
    },
    {
      path: "/forget",
      componet: forget
    },
    {
      path: "/artist/:artistid",
      component: artist,
      props: true
    },
    {
      path: "/searchresult/:word",
      component: searchresult
    },
    {
      path:"/playlistclass",
      component: playlistclass
    },
    {
      path:"/songlist/:id",
      component: songlist,
      props:true
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]

})
