import Vue from 'vue';
import Vuex from 'vuex';
import mutations from  './mutations';
import getters from './getters'
Vue.use(Vuex);

const state =  {
  songList: [],   //歌曲列表
  index:0,        //当前歌曲索引
  songDetail:null, //当前歌曲信息
  lyric:[]         //当前歌曲歌词
} 

export default new Vuex.Store({
    state,
    mutations,
    getters
})
