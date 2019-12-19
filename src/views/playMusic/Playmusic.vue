<!-- 播放页详情 -->
<template>
  <div class="playmusic">
    <div class="play-head">
      <button type="button" class="icon iconfont" @touchstart="back()">&#xe614;</button>
      <h3>{{ songName  }}</h3>
      <button type="button" class="icon iconfont">&#xe64c;</button>
    </div>
    <div class="play-main">
      <div>
        <div>
          <p class="play-author">{{ authorName }}</p>
          <div class="play-detail">
            <div class="play-detail-img">
              <img :src="posterUrl" alt="" :class="icon?'pic':''">
            </div>
            <p class="play-detail-word">{{ showLyric }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="play-cont">
      <div class="progress">
        <span>{{ nowTime }}</span>
        <span class="bar">
          <progress-bar :allTime="audio?audio.duration:0" :current="audio?audio.currentTime:0" @getWidthRate="getRate"
            background="#ccc"></progress-bar>
        </span>
        <span>{{ allTime }}</span>
      </div>
      <div class="play-lyric">
        <!-- <router-link to="">歌词</router-link> -->
        <!-- <router-link to="" >一起聊</router-link> -->
      </div>
      <div class="play-cont-icons">
        <span @touchstart="changeMusic(-1)" class="icon iconfont">&#xe608;</span>
        <span @touchstart="play" class="icon iconfont">{{ icon?"&#xe6ba;":"&#xe640;" }}</span>
        <span @touchstart="changeMusic(1)" class="icon iconfont">&#xe606;</span>
      </div>
      <div class="play-cont-like">
        <span @touchstart="like" :style="style" class="icon iconfont">&#xe6d4;</span>
        <span @touchstart="download" class="icon iconfont">&#xe61a;</span>
        <span @touchstart="share" class="icon iconfont">&#xe60e;</span>
        <router-link to="/comment" class="icon iconfont">&#xe641;</router-link>
      </div>
    </div>
    <audio :src="musSrc" ref="audio"></audio>
  </div>
</template>
<script>
  import {
    getLyric,
    getMusicUrl,
    changeTime
  } from '@/api/fetch.js';
  import ProgressBar from '@/components/Progressbar'
  export default {
    props: ["songid"],
    components: {
      ProgressBar
    },
    data() {
      return {
        songList: [],
        name: "",
        author: "",
        showLyric: "",
        src: "",
        icon: false, //播放和停止的标识 和切换图标
        style: {},
        lyric: "",
        musSrc: '',
        audio: null, //audio实例
        arrLyric: [], // 提取的歌词字段
        arrTime: [], //提取的时间节点断
        nowTime: 0, //当前播放时间
        allTime:0,
        index: 0,
        currentSong: null
      }
    },
    mounted() {
      this.init()
      this.$nextTick(() => {
        this.audio = this.$refs.audio;
        var timer = setTimeout(()=>{
            this.play()
            clearTimeout(timer);
          },1000)
        this.audio.addEventListener("timeupdate", function observe(e) { //监听音乐播放
          if (!this.classArr || !this.classArr.length) {
            return;
          }
          var element = e.target;
          this.current = element.currentTime;
          this.nowTime = changeTime(element.currentTime)
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
          this.index += 1;
          sessionStorage.setItem("index",this.index);
          this.play()
        })
        this.audio.addEventListener("durationchange",()=>{
          this.allTime =changeTime(this.audio.duration);
        })
      })
    },
    methods: {
      getUrl() {
        getMusicUrl(this.currentSong.id).then(data => { //获取歌曲地址
          this.musSrc = data.data[0].url;
        })
      },
      getMusicLyric() {
        getLyric(this.currentSong.id).then((data) => { //获取歌词
          if (data.code !== 200) return;
          this.lyric = data.lrc.lyric;
        })
      },
      init(){  //初始化
        this.$store.commit("getSongList");
        this.$store.commit("getIndex"); 
        this.songList = this.$store.state.songList;
        this.index = this.$store.state.index;
        this.currentSong = this.songList[this.index]
        this.getUrl();
        this.getMusicLyric();
     
      },
      changeMusic(n) {
        this.index += n;
        sessionStorage.setItem("index",this.index)
      },
      play() {
        if (!this.icon) {
          this.audio.play();
        } else {
          clearInterval(this.timer);
          this.audio.pause();
        }
        this.icon = !this.icon;
      },
      like() {
        if (this.flag) {
          this.style = {};
        } else {
          this.style = {
            color: "red"
          };
        }
        this.flag = !this.flag;
      },
      download() {

      },
      share() {

      },
      getRate(val) {
        this.audio.currentTime = val * this.audio.duration;
      },
      back(){
        this.$router.go(-1);
      }
    },
    computed: {
      id() {
        return this.$route.params.songid
      },
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
      songName(){
       if(!this.currentSong) return null;
       return this.currentSong.ar?this.currentSong.ar[0].name:this.currentSong.name;
      },
      authorName(){
        if(!this.currentSong) return null;
        return  this.currentSong.al?this.currentSong.al.name:this.currentSong.artists[0].name
      },
      posterUrl(){
        if(!this.currentSong) return null;
        return this.currentSong.al?this.currentSong.al.picUrl:this.currentSong.artists[0].img1v1Url
      }

    },
    watch: {
      index(newValue,oldValue) {
          if(oldValue===0||oldValue===this.songList.lenth) return;
          this.init();
          this.audio.currentTime = 0;
          this.icon = false;
          var timer = setTimeout(()=>{
            this.play()
            clearTimeout(timer);
          },600)
      }
    }
  }

</script>
<style scoped>
  .playmusic {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #000;
    color: rgb(245, 244, 244);
    box-sizing: border-box;
  }

  .play-head {
    text-align: center;
    font-size: 2.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .play-head>button {
    flex-grow: 1;
    font-size: 2rem;
    border: 0;
    background: transparent;
  }

  .play-head>h3 {
    flex-grow: 7;
    font-size: 1.8rem;
    margin: 0;
    padding: 0.4rem;
  }

  .play-main {
    flex-grow: 1;
    text-align: center;
    padding: 0 2rem;
  }

  .play-detail {
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .play-author {
    font-size: 1.4rem;
  }

  .play-detail-img {
    max-width: 24rem;
    max-height: 24rem;
    margin: 0 auto;
    border-radius: 20rem;
    margin-top: 2rem;
  }

  .play-detail-img img {
    width: 24rem;
    height: 24rem;
    border-radius: 20rem;
    animation: rotate1 10s linear infinite;
    animation-play-state: paused;

  }

  .play-detail-word {
    height: 4rem;
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  .play-word>p {
    font-size: 1.4rem;
    height: 2rem;
  }


  .play-cont {
    width: 100%;
    height: 30%;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 1rem 0rem;
  }

  .progress {
    text-align: center;
    line-height: 3rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .progress>span {
    flex-grow: 1;
  }

  .progress .bar {
    flex-grow: 6;
  }

  .play-lyric {
    font-size: 1.4rem;
    padding: 0.2rem;
  }

  .play-lyric>a {
    display: inline-block;
    width: 5rem;
    height: 1.5rem;
    line-height: 1.4rem;
    margin-left: 1.6rem;
    font-size: 1.2rem;
    text-align: center;
    border: 1px solid #f00;
    border-radius: 1rem 0.6rem 0.6rem 0;
    color: rgb(245, 244, 244);
    color: #f00;
  }

  .play-cont-icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 1rem 0;
  }

  .play-cont-icons>span {
    display: inline-block;
    width: 30%;
    font-size: 3rem;
  }

  .play-cont-icons>span:nth-of-type(2) {
    font-size: 4rem;
  }

  .play-cont-like {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;
  }

  .play-cont-like>span,
  .play-cont-like>a {
    display: inline-block;
    width: 20%;
    flex-grow: 1;
    text-align: center;
    font-size: 2.4rem;
    color: rgb(245, 244, 244);
  }

  /* .pic {
    animation: rotate1 10s linear infinite;
  } */
  .play-detail-img .pic{
    animation-play-state: running;
}
  @keyframes rotate1 {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

</style>
