<template>
  <div class="songlist">
    <div class="songlist-head">
      <van-icon name="arrow-left" @click="back" />
      <p>歌单</p>
    </div>
    <div class="songlist-desc">
      <img :src="listDetail.coverImgUrl" alt="">
      <div>
        <h3>{{ listDetail.name }}</h3>
        <div class="author"><img v-lazy="listDetail.creator&&listDetail.creator.avatarUrl"
            alt=""><span>{{listDetail.creator&&listDetail.creator.nickname }}</span></div>
      </div>
    </div>
    <ul class="songlist-items">
      <li class="songlist-item" v-for='value,index in songList' :key="value.id" @click="enterPlay(index)">
        <span class="rank">{{index + 1}}</span>
        <div class="song-detail">
          <p>{{ value.name }}</p>
          <p><span>{{ value.ar[0].name }}-{{ value.name }}</span></p>
        </div>
        <van-icon name="play-circle-o" />
      </li>
    </ul>
  </div>
</template>
<script>
  import {
    playListDetail
  } from '@/api/fetch'
  export default {
    props: ["id"],
    data() {
      return {
        listDetail: {},
        songList: []
      }
    },
    mounted() {
      playListDetail(this.id, 60).then(data => {
        if (data.code !== 200) return
        this.listDetail = data.playlist;
        this.songList = data.playlist.tracks
      })
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      enterPlay(index) {
        sessionStorage.setItem("list", JSON.stringify(this.songList))
        sessionStorage.setItem("index", index)
        this.$router.push("/playmusic");
      }
    }
  }

</script>
<style scoped>
  h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  .songlist {
    background: rgba(80, 66, 66, 0.4);
  }

  .songlist-head {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    font-size: 2.0rem;
    color: #fff;
  }

  .songlist-head i {
    margin-right: 1rem;
  }

  .songlist-desc {
    display: flex;
    padding: 1rem 1rem;
    color: #fff;
  }

  .songlist-desc img {
    width: 11rem;
    height: 11rem;
    margin-right: 1rem;
    border-radius: 0.4rem;
  }

  .author {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  .author img {
    width: 3rem;
    height: 3rem;
    border-radius: 2rem;
  }

  .songlist-items {
    padding: 0 1rem;
    background: #fff;
    border-radius: 1.4rem 1.4rem 0 0;
  }

  .songlist-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;
  }

  .rank {
    width: 8%;
    color: #444;
    /* flex-grow: 1; */
  }

  .song-detail {
    flex-grow: 8;

  }

  .song-detail span {
    font-size: 1.2rem;
    color: #666;
  }

  .songlist-item i {
    text-align: right;
    /* flex-grow: 1; */
    width: 10%;
    font-size: 2rem;
  }

</style>
