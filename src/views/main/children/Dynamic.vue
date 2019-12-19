<!-- 动态页 -->
<template>
  <div class="dynamic">
    <div class="dyn-head">
      <div class="dyn-head-title">
        动态
      </div>
      <div class="dyn-head-chose">
        <div>
          <router-link to="" class="active">精选</router-link>
          <!-- <router-link to="">关注</router-link> -->
        </div>
      </div>
      <div class="dyn-head-icon">
        <span class="icon iconfont">&#xe61e;</span>
      </div>
    </div>
    <div class="dyn-swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="dyn-nav">

    </div>
    <ul>
      <li class="dyn-list" v-for="(value,index) in dynlist" :key="value.id">
        <div class="dyn-list-head">
          <img v-lazy="value.picUrl" alt="">
          <p>{{ value.artistName }}</p>
        </div>
        <div class="dyn-list-video">
          {{ value.mvUrl }}
          <video :src="value.url" :poster="value.picUrl" @click="playMv(index)" :controls="value.url?true:false"></video>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {
    getBannerImg,
    getMv,
    getMvUrl
  } from '@/api/fetch'
  export default {
    data() {
      return {
        dynlist: [],
        images: [],
        arr: [],
        url: '',
        src: ''
      }
    },
    mounted() {
      getBannerImg(1).then(data => {
        this.images = data.banners
      })
      getMv().then(data => {
        this.dynlist = data.result;
        // this.dynlist.forEach((value, index) => {
        //   getMvUrl(value.id).then(data => {
        //     this.arr[index] = data.data.url;
        //   })
        // });
      })
    },
    computed: {
      mvUrl() {
        if (!this.dynlist.length) {
          return []
        }
        return arr
      }
    },
    methods: {
      playMv(index) {
        getMvUrl(this.dynlist[index].id).then(data => {
          if (data.code === 200) {
            // this.dynlist[index].url = data.data.url;
            this.dynlist.forEach((val,n) => {
              this.$set(this.dynlist[n],"url",null);
            });
            this.$set(this.dynlist[index],"url",data.data.url)
          }
        })
      }
    }


  }

</script>

<style scoped>
  .dynamic {
    padding: 0 1rem 1rem 1rem;
    margin-bottom: 4rem;

  }

  .van-swipe {
    height: 100%;
  }

  .dyn-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    background: #fff;
  }

  .dyn-head-title {
    flex-grow: 1;
    font-size: 2.4rem;
    font-weight: bold;

  }

  .dyn-head-chose {
    flex-grow: 4;
    font-size: 1.4rem;
    text-align: center;
  }

  .dyn-head-chose>div {
    width: 60%;
    background: #bbb;
    border-radius: 2rem;
    margin: 0 auto;
    height: 3rem;
    line-height: 3rem;
    display: flex;
  }

  .dyn-head-chose>div>a {
    display: inline-block;
    width: 45%;
    flex-grow: 1;
  }

  .dyn-head-chose>div>a.active {
    border-radius: 1.5rem;
    background: #fff;
  }


  .dyn-head-icon {
    flex-grow: 1;
    text-align: center;
  }

  .dyn-head-icon>span {
    font-size: 2.4rem;
  }

  .dyn-swiper {
    width: 100%;
    height: 16rem;
  }

  .dyn-swiper img {
    width: 100%;
    height: 100%;
  }

  .dyn-list {
    padding-top: 1rem;
  }

  .dyn-list-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dyn-list-head>img {
    width: 5rem;
    height: 5rem;
    border-radius: 2.5rem;
  }

  .dyn-list-head>p {
    flex-grow: 1;
    margin: 0 1rem;
    font-size: 1.4rem;
  }

  .dyn-list-head>button {
    border: 1px solid #ccc;
    font-size: 1.2rem;
    border-radius: 1rem;
    background: #fff;
    margin-right: 2rem;
  }

  .dyn-list>p {
    font-size: 1.4rem;
    line-height: 2rem;
    height: 2rem;
    padding-right: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dyn-list-video {
    width: 100%;
    height: 20rem;
  }

  .dyn-list-video img {
    width: 98%;
    height: 100%;
  }

  video {
    margin-top: 0.4rem;
    width: 100%;
    height: 100%;
  }

  video[poster] {
    height: 100%;
    width: 100%;
  }

  /* video:hover{
     box-shadow: 0.1rem 0.2rem 0.5rem 0.5rem #000;
  } */

</style>
