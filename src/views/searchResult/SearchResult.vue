<template>
  <div class="search-res">
    <van-nav-bar :title="$route.params.word" left-text="返回" right-text="" left-arrow @click-left="onClickLeft"/>
    <ul>
      <li class="search-res-item" v-for="(val,i) in list" :key="i+Math.random()*100" @touchstart="enterPlayPage(i)">
          <div>{{ val.name }}</div>
          <p><span class="name">{{ val.artists[0].name }}</span><span v-show="val.info">·{{ val.info }}</span></p>
      </li>
    </ul>
  </div>
</template>
<script>
  import {
    getSearchList
  } from '@/api/fetch.js';
  export default {
    // this.$route.params  获取组件传递的值
    data() {
      return {
        query: "", //搜索关键词
        list: [] //搜索结果列表
      }
    },
    created() {
      this.query = this.$route.params.word;
    },
    beforeMount() {
      getSearchList(this.query).then(data => {
        this.list = data.result.songs;
      })
    },
    methods: {
      onClickLeft() {
          this.$router.go(-1);
      },
      enterPlayPage(index) {
        sessionStorage.setItem("list",JSON.stringify(this.list))
        sessionStorage.setItem("index",index)
        this.$router.push("/playmusic" );
      },
    }
  }

</script>
<style scoped>
  .search-res>ul {
    background: #222;
  }
  p{
    margin:0.4rem 0;
  }
  li{
    color: #fff;
  }
  li{
    padding: 0.5rem 0 0.4rem 1rem;
    border-bottom:1px solid #fff;
  }
  li:hover{
    background:#f00;
  }
  .name{
    font-size: 1.2rem;
  }

</style>
