<!-- 歌手页 -->
<template>
  <div class="singer">
    <div class="singer-header">
     <span>歌手</span>
    </div>
    <div class="singer-main">
      <div>
        <div class="singer-classify">
          <ul>
            <li>
              <router-link to="#">全部</router-link>
            </li>
            <li>
              <router-link to="#">港台</router-link>
            </li>
            <li>
              <router-link to="#">欧美</router-link>
            </li>
            <li>
              <router-link to="#">日本</router-link>
            </li>
            <li>
              <router-link to="#">韩国</router-link>
            </li>
            <li>
              <router-link to="#">其它</router-link>
            </li>
          </ul>
        </div>
        <div class="center-bar">
          <span>热</span>
          <ul class="singer-list">
            <li class="singer-item" v-for="(val,index) in artist" :key="val.id">
              <router-link :to="url+val.id" >
                <img v-lazy="val.picUrl" alt="">
                <span>{{val.name}}</span>
                <button type="button">+关注</button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getArtlist } from "@/api/fetch"
  export default {
    data() {
      return {
        artist: null,
        url:'/artist/'
      }
    },
    mounted() {
      getArtlist().then(
        (data) => {
          this.artist = data.list.artists;
        }
      )
    },
  
    methods:{
     
    }
  }

</script>


<style scoped>
  .singer-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
  }

  .singer-header>span {
    font-size: 1.6rem;
  }

  .singer-main {
    margin-top: 4rem;
  }

  .singer-classify>ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5rem;
    padding: 0.5rem;
  }

  .mint-badge.is-size-normal {
    font-size: 1.5rem;
  }

  .center-bar {
    padding: 1rem 1rem;
    font-size: 1.4rem;
  }

  .center-bar>span {
    font-size: 1.6rem;
    color: rgb(128, 126, 126);
  }

  .singer-list {
    margin-top: 1rem;
  }

  .singer-list>li>a {
    display:inline-block;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.6rem;
  }

  .singer-list>li img {
    width: 5rem;
    height: 5rem;
    border-radius: 3rem;
  }

  .singer-list>li span {
    display: inline-block;
    margin-left: 1rem;
    width: 60%;
    flex-grow: 6;
  }

  .singer-list>li button {
    width: 10%;
    flex-grow: 2;
    border: 1px solid #aaa;
    background: #fff;
    font-size: 1.2rem;
    padding: 0.2rem 0.4rem;
    line-height: 1.4rem;
    border-radius: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }

</style>
