<!-- 推荐页 -->
<template>
  <div class="recommend">
    <top title="推荐">
      <router-link to="/search" slot="search">
        搜索
      </router-link>
    </top>
    <div class="rec-set">
      <div class="swiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(value, index) in newSongList" :key="value.id">
            <img v-lazy="value.picUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="rec-content">
      <div class="rec-title">
        <h3>推荐歌单</h3>
      </div>
      <ul class="rec-mus-list">
        <li class="rec-bar" v-for="(val,index) in list" :key="index" @click=enterSongList(val.id)>
          <div class="rec-img">
            <img v-lazy="val.picUrl" alt="">
            <div class="mus-icons">
              <p><span class="icon iconfont">&#xe642;</span> <span class="count">{{ parseInt(val.playCount/10000) }}万</span></p>
              <span class="icon iconfont">&#xe640;</span>
            </div>
          </div>
          <div class="rec-des">
            <p>{{ val.name }}</p>
            <p>{{parseInt(val.trackCount)}}万人收藏</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {
    getRecommend,
    newSong
  } from '@/api/fetch'
  import top from '@/components/header'
  export default {
    data() {
      return {
        list: [],
        newSongList:[]
      }
    },
    mounted() {
      // var userid = JSON.parse(sessionStorage.getItem("user")).account.id
      getRecommend().then(data => {
        if(data.code !==200){
          this.list = [];
          return;
        }
        this.list = data.result;
      })
      newSong(6).then(data=>{
        this.newSongList = data.result
      })
    },
    methods:{
      linkToPlay(index){
        sessionStorage.setItem("list",JSON.stringify(this.newSongList))
        sessionStorage.setItem("index",index)
        this.$router.push("/playmusic"); 
      },
      enterSongList(id){
            this.$router.push("/songlist/"+id)
        }
    },
    components: {
      top
    }
  }

</script>

<style>
  .recommend{
    margin-bottom: 4.2rem;
  }
  .rec-set {
    padding: 0.5rem;

  }

  .rec-set img {
    width: 100%;
    height:20rem;
    border-radius: 1.5rem;
  }


  .rec-title>h3 {
    font-size: 1.8rem;
    margin: 1rem 0;
  }

  .rec-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }

  .rec-img {
    width: 10rem;
    height: 10rem;
    margin-right: 1rem;
    position: relative;
  }

  .rec-img>img {
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;

  }

  .mus-icons {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    bottom: 1rem;
    left: 0;
    color: #fff;
  }

  .mus-icons>span {
    text-align: right;
    margin-right: 0.4rem;
  }

  .rec-des {
    flex-grow: 2;
    font-size: 1.4rem;
    padding-right: 1rem;
    text-align: left;
  }

  .rec-des>p:first-of-type {
    max-height: 3.9rem;
  }

  .count {
    font-size: 1.2rem;
  }

</style>
