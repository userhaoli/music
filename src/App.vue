<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import setRem from './assets/js/setRem.js'
  // setRem()
  setRem.sethtmlfontsize(37.5);
  //  添加监听事件
  window.addEventListener('resize', function () {
    setRem.sethtmlfontsize(37.5);
  })
  export default {
    created() {
      var user = JSON.parse(sessionStorage.getItem("user"));
    }
  }
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 1.4rem;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #222;
  }

  input:focus,
  button:focus {
    outline: none;
  }

</style>
