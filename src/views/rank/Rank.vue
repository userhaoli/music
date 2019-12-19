<template>
  <div class="rank">
    <div class="rank-head">
      <div class="rank-head-inner">
        <van-icon name="arrow-left" @click="back" />
        <h4>热歌排行榜</h4>
        <span class="icon iconfont"></span>
      </div>
    </div>

    <div class="rank-df">
      <ul class="rank-df-list">
        <li>
          <ul class="rank-inner-list">
            <li v-for="(value,index) in list" :key="index+Math.random()*10" @click="linkToPlay(index)">
              <img v-lazy="value.al.picUrl" alt="">
              <div class="rank-df-text">
                <p>{{value.name}}</p>
                <p>{{value.ar[0].name}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
  import {
    getFormSong
  } from '@/api/fetch'
  export default {
    data() {
      return {
        list: []
      }
    },
    mounted() {
      getFormSong().then(
        data => {
          // this.list = data.data.song_list;
          if (data.code === 200) {
            this.list = data.playlist.tracks;
          }
        }
      )
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      linkToPlay(index){
        sessionStorage.setItem("list",JSON.stringify(this.list))
        sessionStorage.setItem("index",index)
        this.$router.push("/playmusic" ); 
      }
    }
  }

</script>

<style scoped>
  .rank {
    background: #333;
    color: #eee;
  }

  .rank-head {
    height: 5rem;

  }

  .rank-head>.rank-head-inner {
    background: #333;
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    font-size: 1.8rem;
  }

  .rank-head h4 {
    text-align: center;
  }

  .rank-head>.rank-head-inner>span {
    display: inline-block;
    flex-grow: 1;
  }

  .rank-head>div>h4 {
    flex-grow: 4;
    margin: 0;
    line-height: 5rem;
  }


  .rank-inner-list {
    border-radius: 1rem;
    margin-top: 1rem;
  }

  .rank-inner-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #fff;
  }

  .rank-inner-list li img {
    width: 6rem;
    height: 6rem;
    margin-right: 1rem;
  }

  .rank-df-text {
    flex-grow: 1;
  }

  .rank-df-text p {
    margin: 0.6rem 0;
  }

  h4 {
    margin: 0.5rem 0;
    font-size: 1.6rem;
  }

  .rank-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    white-space: nowrap;
    margin-left: 0px;
  }

  .rank-list-img {
    width: 11rem;
    height: 11rem;
    padding: 0.6rem 0;
    position: relative;
  }

  .rank-list-img>span {
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    position: absolute;
    left: 3.2rem;
    top: 2.5rem;
  }

</style>
