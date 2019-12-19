<template>
  <div class="play-list-class">
    <div class="play-list-head">
      <van-icon name="arrow-left" @click="back" />
      <h3>歌单大厅</h3>
    </div>
    <ul class="play-list-class-list">
      <li v-for="value,index in tags" :key="value.id" @click="getNewClassList(value.name,index)">
        <span :class="value.activity?'active':''">{{ value.name }}</span></li>
    </ul>
    <ul class="play-list-items">
      <li v-for="value in lists" :key="value.id" @click="enterSongList(value.id)">
        <img v-lazy="value.coverImgUrl" alt="">
        <p>{{ value.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import {
    hotPlayList,
    recommend,
    playList
  } from '@/api/fetch';
  export default {
    data() {
      return {
        tags: [],
        lists: []
      }
    },
    mounted() {
      hotPlayList().then(data => {
        data.tags.splice(9,1);
        data.tags.unshift({name:"全部"})
        this.tags = data.tags;
      })
      recommend(60).then(data => {
        this.lists = data.playlists;
      })
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      getNewClassList(name, index) {
        this.tags.forEach((val, i) => {
          this.tags[i].activity = false;
        });
        this.$set(this.tags[index], "activity", true);
        playList(name, 30).then(data => {
          this.lists = data.playlists;
        })
      },
      enterSongList(id){
        this.$router.push("/songlist/"+id);
      }
    }
  }
</script>
<style scoped>
  .active {
    color: red;
    border-bottom: 2px solid #f00;
  }

  .play-list-class {
    padding: 0 1rem;
  }

  .play-list-head {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
  }

  .play-list-head i {
    font-size: 2.0rem;
  }

  h3 {
    margin-left: 0.4rem;
    font-weight: 400;
  }

  p {
    margin: 0.6rem 0;
    font-size: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .play-list-class-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }

  .play-list-class-list li {
    width: 19%;
    margin-bottom: 0.8rem;
  }

  .swiper {
    width: 100%;
    height: 20rem;
    background: #f00;
    border-radius: 1rem;
  }

  .play-list-items {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .play-list-items li {
    width: 30%;
    margin-top: 1rem;
  }

  .play-list-items li img {
    width: 100%;
    border-radius: 0.4rem;
  }

</style>
