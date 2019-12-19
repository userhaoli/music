export default {
   getSongList(state){  //获取歌曲列表
      var list =JSON.parse(sessionStorage.getItem("list"));
      if(!list) return 
      state.songList = list;
   },
   getIndex(state){   //获取歌曲索引
    var index = sessionStorage.getItem("index");
    if(!index) return 
    state.index = Number(index);
   }
}