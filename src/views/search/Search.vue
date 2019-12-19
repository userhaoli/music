<!-- 搜索页 -->
<template>
  <div class="search">
    <div class="search-header">
      <div class="back"  @click="back">
        <router-link to="">
          <van-icon name="arrow-left"/>
        </router-link>
      </div>
      <div class="input-bar">
        <input type="text" placeholder="搜索音乐、视频、歌单、歌手、用户" v-model="query" @keydown="getSearch">
      </div>
      <div class="icon">
          <span class="icon iconfont" >&#xe612;</span>
      </div>
    </div>
    <div class="hotSearch">
      <div>
        <h3>热门搜索</h3>
      </div>
      <ul>
        <li class="song-bar" v-for="(value,index) in hotlist" :key="index+Math.random()*10" @click="linkToSear(value.searchWord)">
          <router-link to="">
            <div class="song-rabk">{{ index }}</div>
            <div class="song-detail">
              <p>{{ value.searchWord }} <span class="icon" v-show="value.iconUrl"><img :src="value.iconUrl" alt=""></span></p>
              <p>{{ value.content }}</p>
            </div>
            <div class="popularity">
              {{ value.score }}
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { getHotSearch } from '@/api/fetch.js'
  export default {
    data() {
      return {
        basePath: "searchresult/",
        query: "", //搜索关键词
        hotlist: [] //热门列表
      }
    },
    mounted() {
      getHotSearch().then(data => {
        if(data.code===200){
          this.hotlist = data.data;
        }
      })
    },
    methods: {
      getSearch(e) {
        if (e.code === "Enter" && this.query) {
          location.href = "#/searchresult/" + this.query;
        }
      },
      wordTips(){
         
      },
      back(){
        this.$router.go(-1);
      },
      linkToSear(query){
        this.$router.push("/searchresult/"+query)
      }
    }
  }
</script>
<style scoped>
  .search {
    padding: 0 1rem;
  }

  .search-header {

    height: 4rem;
    line-height: 4rem;
    padding: 0 1rem;
    width: 100%;
    display: flex;
    background: #fff;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
  }

  .back {
    flex-grow: 1;
    font-size: 2rem;
  }

  .icon {
    flex-grow: 1;
    font-size: 2rem;
  }
  .icon img{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.6rem;
  }
  .input-bar {
    flex-grow: 9;
  }

  .input-bar>input {
    width: 90%;
    border: 0;
    font-size: 1.4rem;
    border-radius: 1rem;
    text-indent: 0.4rem;
  }

  /* 热门搜索*/
  .hotSearch {
    font-size: 1.4rem;
    margin-top: 6rem;
  }

  .hotSearch>div>h3 {
    font-size: 2rem;
  }

  .song-bar>a {
    height: 5rem;
    line-height: 5rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.6rem;
  }

  .song-rabk {
    flex-grow: 1;
  }

  .song-detail {
    flex-grow: 8;
    display: flex;
    flex-direction: column;

  }

  .song-detail p {
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }
  .song-detail p:first-of-type{
    font-weight: bold;
    font-size: 1.4rem;
  }

  .popularity {
    flex-grow: 2;
    text-align: right;
    font-size: 1.2rem;
    color:#666;
  }

  .mint-badge.is-size-normal {
    border-radius: 1.2rem;
    font-size: 1.5rem;
    padding: 0.2rem 0.8rem;
  }

</style>
