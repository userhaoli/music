import $http from '@/utils/request';

//获取歌词
export function getLyric(id) {
  return $http.get(`/lyric?id=${id}`).then(data=>data.data)
}
//获取音乐地址
export function getMusicUrl(id){
  return $http.get(`/song/url?id=${id}`).then(data=>data.data)
 }
 
//改变时间显示格式为 00：00
export function changeTime(time) {
  // var time = parseFloat(time.toFixed(2))
  var minute = parseInt(time / 60);
  var second = parseInt(time - minute * 60);
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return "" + minute + ":" + second;
}
//获取首页轮播图
export function getBannerImg(type){
  return $http.get(`/banner?type=${type}`).then( data => data.data )
}


//获取歌手列表
export function getArtlist(){
  return $http.get('/toplist/artist').then (data => data.data )
}

//获取歌手歌曲列表
export function getSongList(id) {
 return $http.get(`/artists?id=${id}`).then(data=>data.data)
}

//获取每日推荐
export function getRecommend(){
  return $http.get(`/personalized`).then(data=>data.data)
}

//获取喜欢音乐列表
export function likeList(id){ 
  return $http.get(`/likelist?uid=${id}`).then(data=>data.data)
}

//获取排行榜单
export function getFormSong(){
  return $http.get(`/top/list?idx=0`).then(data=>data.data)
}

//获取热门搜索
export function getHotSearch(){
  return $http.get(`/search/hot/detail`).then(data=>data.data)
}

//搜索提示
export function getTips(word){
  return $http.get(`/search/suggest?keywords=${word}&type=mobile`)
}

//获取搜索结果
export function getSearchList(query){
  return $http.get(`/search?keywords=${query}`).then(data=>data.data)
}
//获取推荐mv
export function getMv(){
  return $http.get(`/personalized/mv`).then(data=>data.data)
}
// 获取mv地址
export function getMvUrl(id){
  return $http.get(`/mv/url?id=${id}`).then(data=>data.data)
}

//新歌新碟   新碟上架
export function newVideo(num){
  return $http.get(`/top/album?offset=0&limit=${num}`)
}

//推荐歌单
export function recommendSongList(num){
  return $http.get(`/personalized?limit=${num}`)
}

//歌单分类
export function playListClass(){
  return $http.get(`/playlist/catlist`).then(data=>data.data)
}
//网友推荐歌单
export function recommend(num){
  return $http.get(`/top/playlist?limit=${num}`).then(data=>data.data)
}
//热门歌单
export function hotPlayList(){
  return $http.get(`/playlist/hot`).then(data=>data.data)
}

//获取精品歌单
export function playList(type,num){
  return $http.get(`/top/playlist/highquality?cat=${type}&limit=${num}`).then(data=>data.data)
}

//推荐新音乐
export function newSong(num){
  return $http.get(`/personalized/newsong?limit=${num}`).then(data=>data.data)
}
//获取歌单详情
export function playListDetail(id,num){
  return $http.get(`/playlist/detail?id=${id}&limit=${num}`).then(data=>data.data)
}
