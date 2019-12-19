<!-- 音乐馆 -->
<template>
  <div class="home">
    <div class="content">
      <router-view></router-view>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import tabbar from '@/components/tabbar'
  import top from '@/components/header'
  export default {
    components: {
      tabbar,
      top,
    }
  }
</script>
<style scoped>
  body {
    padding: 0 10px;
    background: #fafafa;
  }

  .home,
  .content {
    height: 100%;
  }

</style>
