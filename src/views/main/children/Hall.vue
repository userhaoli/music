     <template>
       <div class="hall">
         <top title="音乐厅">
           <router-link to="/search" slot="search">
             搜索
           </router-link>
         </top>
         <div class="swiper">
           <van-swipe :autoplay="3000">
             <van-swipe-item v-for="(image, index) in images" :key="index">
               <img v-lazy="image.pic" />
             </van-swipe-item>
           </van-swipe>
         </div>
         <!-- 导航栏 -->
         <div class="nav-bar">
           <router-link to="/singer" class="bar-singer">
             <div>
               <span class="icon iconfont">&#xe619;</span>
             </div>
             <p>歌手</p>
           </router-link>
           <router-link to="/rank" class="bar-rank">
             <div>
               <span class="icon iconfont">&#xe62e;</span>
             </div>
             <p>排行</p>
           </router-link>
           <router-link to="/playlistclass" class="bar-classify">
             <div>
               <span class="icon iconfont">&#xe7f8;</span>
             </div>
             <p>分类歌单</p>
           </router-link>
           <router-link to="" class="bar-radio">
             <div>
               <span class="icon iconfont">&#xe610;</span>
             </div>
             <p>电台</p>
           </router-link>
           <router-link to="" class="bar-listen">
             <div>
               <span class="icon iconfont">&#xe674;</span>
             </div>
             <p>一起听</p>
           </router-link>
         </div>
         <div>
           <div class="official-list">
             <div class="title">
               <!-- <h3>官方歌单</h3> -->
               <h3>流行歌单</h3>
               <router-link to="">更多</router-link>
             </div>
             <ul class="mus-item">
               <li v-for="(val,i) in songlists" :key="i+Math.random()*10" @click="enterSongList(val.id)">
                 <div class="mus-list-img">
                   <img v-lazy="val.coverImgUrl" alt="">
                   <div class="mus-icons">
                     <p><span class="icon iconfont">&#xe642;</span><span class="play-count">{{parseInt(val.playCount/10000)}}万</span></p>
                     <span class="icon iconfont">&#xe640;</span>
                   </div>
                 </div>
                 <div class="mus-list-title">
                   <p>{{ val.name }}</p>
                 </div>
               </li>
             </ul>
           </div>
         </div>
         <div>
          <div class="official-list">
            <div class="title">
              <!-- <h3>官方歌单</h3> -->
              <h3>古风歌单</h3>
              <router-link to="">更多</router-link>
            </div>
            <ul class="mus-item">
              <li v-for="(val,i) in chinaStyle" :key="i+Math.random()*10" @click="enterSongList(val.id)">
                <div class="mus-list-img">
                  <img v-lazy="val.coverImgUrl" alt="">
                  <div class="mus-icons">
                    <p><span class="icon iconfont">&#xe642;</span> <span class="play-count">{{parseInt(val.playCount/10000)}}万</span></p>
                    <span class="icon iconfont">&#xe640;</span>
                  </div>
                </div>
                <div class="mus-list-title">
                  <p>{{ val.name }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="official-list">
            <div class="title">
              <!-- <h3>官方歌单</h3> -->
              <h3>欧美歌单</h3>
              <router-link to="">更多</router-link>
            </div>
            <ul class="mus-item">
              <li v-for="(val,i) in omList" :key="i+Math.random()*10" @click="enterSongList(val.id)">
                <div class="mus-list-img">
                  <img v-lazy="val.coverImgUrl" alt="">
                  <div class="mus-icons">
                    <p><span class="icon iconfont">&#xe642;</span><span class="play-count">{{parseInt(val.playCount/10000)}}万</span></p>
                    <span class="icon iconfont">&#xe640;</span>
                  </div>
                </div>
                <div class="mus-list-title">
                  <p>{{ val.name }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
       </div>
     </template>
     <script>
       import {
         getBannerImg,
         playList
       } from '@/api/fetch'
       import top from '@/components/header'
       export default {
         data() {
           return {
             images: [],
             songlists: [],
             chinaStyle:[],
             omList:[]
           }
         },
         components: {
           top,
         },
         mounted() {
           getBannerImg(2).then(data => {
             this.images = data.banners
           })
           playList("流行",6).then(data=>{
            this.songlists = data.playlists
           })
           playList("古风",6).then(data=>{
            this.chinaStyle = data.playlists
           })
           playList("欧美",6).then(data=>{
            this.omList = data.playlists
           })
         },
         methods:{
          enterSongList(id){
            this.$router.push("/songlist/"+id)
          }
         }
       }

     </script>
     <style scoped>
       .hall {
         margin-bottom: 6rem;
       }

       .swiper {
         height: 20rem;
         border-radius: 1rem;
         margin-top: 2rem;
       }

       .van-swipe {
         width: 100%;
         height: 100%;
       }

       .van-swipe-item {
         width: 100%;
       }

       .van-swipe img {
         width: 100%;
         height: 100%;
         border-radius: 0.6rem;
       }

       .nav-bar {
         margin-top: 2rem;
         font-size: 1.4rem;
         text-align: center;
         display: flex;
         justify-content: space-around;
       }

       .nav-bar>a {
         width: 18%;
         flex-grow: 1;
       }

       .nav-bar>a>div {
         padding: 0 1rem;
         color: #f00;
       }

       .nav-bar>a>P {
         margin: 0.6rem 0;
         color: #f00;
       }

       .nav-bar>a>div span {
         font-size: 2.4rem;
       }


       /* 广告栏 */
       .board {
         margin-top: 1rem;
         display: flex;
         justify-content: space-between;
       }

       .board>a {
         display: inline-block;
         width: 45%;
         padding: 1rem 1rem;
         border-radius: 1rem;
         background: rgba(255, 61, 26, 0.664);
         color: #444;
         margin-right: 1rem;
       }

       .board>a>.bar-left {
         display: flex;
         justify-content: space-between;
         align-items: center;
       }

       .board .bar-left>.inner-img {
         width: 20%;
         flex-grow: 1;
         margin-right: 0.4rem;
       }

       .board .bar-left>.inner-img>img {
         width: 100%;
         height: 100%;

       }

       .board .bar-left>.inner-right {
         width: 40%;
         flex-grow: 3;
       }

       .board .bar-left>.inner-right>p {
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         font-size: 1rem;
         margin: 0;
         padding: 0.5rem 0;
       }


       /* 音乐分类栏 */
       .official-list>.title {
         font-size: 1.3rem;
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         align-items: center;
       }

       .official-list>.title>h3 {
         font-size: 1.8rem;
       }

       .mus-inner {
         width: 100%;
         overflow: hidden;
       }

       .slider {
         overflow: hidden;
         -webkit-overflow-scrolling: touch;
       }

       .mus-list {
         display: flex;
         width: 72rem;
         justify-content: space-between;
         padding: 0 10px;
         white-space: nowrap;
         margin-left: 0px;
       }

       .mus-list-img {
         width: 11rem;
         height: 11rem;
         position: relative;
         border-radius: 1rem;
       }

       .mus-list>li img {
         width: 11rem;
         height: 11rem;
         border-radius: 0.8rem
       }

       /* .mus-list-title {
         height: 2rem;
         line-height: 2rem
       } */

       .mus-list-title>p {
         font-size: 1.2rem;
         overflow: hidden;
         text-overflow: ellipsis;
         margin: 0.4rem 0;
       }

       .mus-icons {
         width: 100%;
         height: 2rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
         position: absolute;
         bottom: 0.8rem;
         left: 0;
         color: #fff;
       }

       .mus-icons>span {
         text-align: right;
         margin-right: 0.3rem;
       }

       .van-swipe__track {
         height: 100%;
       }

       .slider {
         width: 100%;
         overflow: auto;
       }

       .mus-item {
         display: flex;
         justify-content: space-around;
         flex-wrap: wrap;
       }

       .mus-item li {
         width: 30%;
         margin-bottom: 1rem;
       }

       .mus-item li img {
         width: 100%;
         height: 100%;
       }
       .play-count{
         font-size: 1.2rem;
       }
     </style>
