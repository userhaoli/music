<template>
  <div class="artist">
    <van-nav-bar :title="name" left-arrow @click-left="back">
    </van-nav-bar>
    <div class="artist-poster">
      <img v-lazy="poster" alt="">
    </div>
    <ul class="song-list">
      <li v-for="(val,index) in songlist" :key="index+ Math.random()*40" class="song-list-item"
        @click="playMusic(val.id,index)">
        <!-- <router-link to="/playmusic"> -->
        <img v-lazy="val.al.picUrl" alt="">
        <div>
          <p>{{ val.name }}</p>
          <p class="author">{{ val.author }}</p>
        </div>
        <van-icon name="service-o" />
        <!-- </router-link> -->
      </li>
    </ul>
    <div class="control" v-show="musSrc">
      <img :src="img" alt="" @touchstart="enterDetails(index)">
      <div class="control-text">
        <div class="control-lyric">
          <p>{{ showLyric }}</p>
        </div>
        <div class='control-progress'>
          <van-icon name="play-circle" v-show="!flag" @click="changeStatic(1)" />
          <van-icon name="pause-circle" v-show="flag" @click="changeStatic(0)" />
          <div>
            <progress-bar :allTime="audio?audio.duration:0" :current="current" @getWidthRate="getWidths"></progress-bar>
          </div>
        </div>
      </div>
    </div>
    <audio :src="musSrc" ref="audio"></audio>
  </div>
</template>
<script>
  import {
    getSongList,
    getMusicUrl,
    getLyric,
    changeTime
  } from '@/api/fetch.js';
  import ProgressBar from '@/components/Progressbar';
  export default {
    props: ['artistid'],
    components: {
      ProgressBar
    },
    data() {
      return {
        songlist: {}, //歌曲列表
        poster: "",  //海报
        name: "",   //歌手姓名
        musSrc: '', //音乐地址
        flag: 0,    //是否播放
        audio: null, //音频
        lyric: '', //歌词
        showLyric: '正在获取歌词....',
        current: 0,
        id:0,
        index:0,
        img:''
      }
    },
    mounted() {
      getSongList(this.artistid).then(data => { //获取歌曲列表
        this.poster = data.artist.picUrl;
        this.name = data.artist.name;
        this.songlist = data.hotSongs;
        this.audio = this.$refs.audio;
        this.audio.addEventListener("timeupdate", function observe(e) { //监听音乐播放
          if (!this.classArr || !this.classArr.length) {
            return;
          }
          var element = e.target;
          this.current = element.currentTime;
          var arrTime = this.classArr[0];
          var len = arrTime.length;
          for (var i = 0; i < len; i++) {
            if (arrTime[i] > element.currentTime) {
              this.showLyric = this.classArr[1][i - 1];
              if (!this.showLyric) {
                this.showLyric = this.classArr[1][i - 2]
              }
              return;
            }
          }
        }.bind(this))
        this.audio.addEventListener("ended", () => { //监听播放结束
          this.flag = 0;
          var rand = Math.floor(Math.random() * this.songlist.length);
          var randomSong = this.songlist.slice(rand, rand + 1);
          this.playMusic(randomSong[0].id);
        })
      })
    },
    destoryed() {
      this.audio.removeEventListener("timeupdate", observe) 
    },
    methods: {
      playMusic(id,index) {
        this.id = id;
        this.index = index;
        getMusicUrl(id).then(data => { //得到音乐url
          this.musSrc = data.data[0].url;
        })
        getLyric(id).then(data => { // 获取歌词列表
          this.lyric = data.lrc.lyric;
        })
        this.img =  this.songlist[index].al.picUrl
      },
      changeStatic(n) { //改变播放状态(播放、暂停)
        this.flag = n;
        var timer = null;
      },
      back() { //返回上一页
        this.$router.go(-1)
      },
      getWidths(val) {  //获取子组件传过来的宽度比例
        this.audio.currentTime = val * this.audio.duration;
      },
      enterDetails(index){  //进入播放列表详情页
        sessionStorage.setItem("list",JSON.stringify(this.songlist))
        sessionStorage.setItem("index",index)
        this.$router.push("/playmusic" );
      }
    },
    computed: {
      classArr() { //将歌词和时间分开
        var reg = /\[|\]/;
        var lyricArr = [],
          timeArr = [];
        var arr = this.lyric.split(reg);
        arr.splice(0, 1);
        if (arr[0] !== "00:00.000") {
          arr.splice(6, 2); //去除掉某些歌词前面带其它东西的歌词部分
        }
        arr.forEach((value, index) => {
          if (index & 1) {
            lyricArr.push(value);
          } else {
            var temp = value.split(':');
            value = temp[0] * 60 + parseFloat(temp[1]); //将分钟数转换成秒数
            timeArr.push(value);
          }
        });
        return [timeArr, lyricArr];
      },
      allTime() { //总时间
        if (!this.audio) {
          return 0;
        }
        return changeTime(this.audio.duration);
      },
      nowTime() { //当前播放时间
        if (!this.audio) {
          return 0;
        }
        return changeTime(this.audio.currentTime);
      }
    },
    watch: {
      flag: { //监听状态改变
        handler(newValue, oldValue) {
          if (newValue) {
            if (!this.audio) {
              return
            }
            this.audio.play();
          } else {
            if (!this.audio) {
              return
            }
            this.audio.pause();
          }
        },
        immediate: true
      },
      musSrc() { //监听音乐地址的变化
        this.flag = 0;
        var timer = setTimeout(() => {
          this.flag = 1;
          clearImmediate(timer);
        }, 100)
      },
    }

  }

</script>
<style scoped>
  .artist {
    box-sizing: border-box;
    margin-bottom:8rem;
    background: rgb(31, 34, 43);
  }

  .van-nav-bar {
    background: #1B3073;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }

  .van-nav-bar__title {
    color: #fff;
  }

  .artist-poster img {
    width: 100%;
    height: 24rem;
  }

  .song-list-item {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0;
    margin-top: 0.4rem;
    background: #333;
  }

  .song-list-item img {
    width: 6rem;
    height: 6rem;
    margin-right: 1rem;
  }

  .song-list-item>a>div {
    flex-grow: 1;

  }

  p {
    margin: 0;
    padding: 0.4rem;

  }

  .van-icon {
    margin-right: 2rem;
  }

  .author {
    font-size: 1.2rem;
  }

  .control {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .control>img {
    width: 8rem;
    height: 8rem;
    margin-right: 1rem;
    border-radius: 4rem;
  }

  .control-text {
    flex-grow: 1;
  }

  .control-lyric {
    font-size: 1.2rem;
    text-align: center;
  }

  .control-lyric>p {
    min-height: 1.8rem;
  }

  .control-progress {
    display: flex;
    height: 4rem;
    justify-content: space-between;
    align-items: center;
  }

  .control-progress i {
    font-size: 3rem;
  }

  .control-progress>div {
    width: 100%;
    flex-grow: 1;
    padding-right: 1rem;
  }

</style>
