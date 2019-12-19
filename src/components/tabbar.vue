<template>
  <ul class="footer">
    <li :class="changeState==='/home'?'active':''" >
      <router-link to="/home" slot="icon" class="foot-icon">
        <span class="icon iconfont">&#xe602;</span>
        <span>音乐厅</span>
      </router-link>
    </li>
    <li :class="changeState==='/recommend'?'active':''" >
      <router-link to="/recommend" slot="icon" class="foot-icon">
        <span class="icon iconfont">&#xe731;</span>
        <span>推荐</span>
      </router-link>
    </li>
    <li :class="changeState==='/dynamic'?'active':''"  >
      <router-link to="/dynamic" slot="icon" class="foot-icon">
        <span class="icon iconfont">&#xe620;</span>
        <span>动态</span>
      </router-link>
    </li>
    <!-- <li :class="changeState==='/personal'?'active':''" >
      <router-link to="/personal" slot="icon" class="foot-icon">
        <span class="icon iconfont">&#xe632;</span>
        <span>我的</span>
      </router-link>
    </li> -->
  </ul>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
    },
    computed:{
      changeState(){
        return this.$router.app._route.path
      }
    }
  }

</script>
<style scoped>
  .footer {
    box-sizing: border-box;
    width: 100%;
    height: 5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding: 0.2rem;
  }

  .footer li {
    width: 25%;
   flex-grow: 1;
  }

  .foot-icon {
    box-sizing: border-box;
    display: flex !important;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding:0.2rem;
  }

  .foot-icon>span {
    font-size: 2.4rem;
  }

  .foot-icon>span:last-of-type {
    font-size: 1.2rem;
    white-space: nowrap;
  }

  .active {
    background: rgb(255, 39, 39);
    opacity:0.8;
  }

</style>
