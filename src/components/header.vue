<template>
  <div class="header" >
    <div class="header-title" v-text="title"></div>
    <div class="header-search">
      <slot name="search"></slot>
      <div>
      </div>
    </div>
    <div class="header-icon"><span class="icon iconfont">&#xe63c;</span></div>
  </div>
</template>
<script>
  export default {
    props: ["title"],
  }
</script>
<style scoped>
  .header {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  .header-title {
    flex-grow: 1;
    font-size: 2.4rem;
    font-weight: bold;
  }

  .header-search {
    flex-grow: 4;
  }

  .header-search>a {
    display: inline-block;
    height: 3rem;
    line-height: 3rem;
    border-radius: 2rem;
    width: 100%;
    font-size: 1.6rem;
    color: #ccc;
  }

  .header-icon {
    flex-grow: 1;
  }

  .header-icon>span {
    font-size: 2.4rem;
  }

</style>
