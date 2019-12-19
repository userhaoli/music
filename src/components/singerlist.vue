<!-- 歌手  歌手列表 -->
<template>
  <div class="singer-content">
    <ul>
      <li>
        <img src="" alt="">
      </li>
      <li>
        周杰伦
      </li>
      <li>
        <button type="button">+关注</button>
      </li>
    </ul>
  </div>
</template>

<style>
  .singer-content {
    padding: 0 1rem;
  }

  .singer-content>ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .singer-content>ul>li:first-of-type {
    width: 10%;
    flex-grow: 2;
    border-radius: 50% 50%;
  }

  .singer-content>ul>li:nth-of-type(2) {
    width: 10%;
    flex-grow: 6;
  }

  .singer-content>ul>li:nth-of-type(3) {
    width: 10%;
    flex-grow: 1;
  }

  .singer-content>ul>li:nth-of-type(3)>button {
    border: 1px solid #aaa;
    background: #fff;
    font-size: 1.2rem;
    padding:0.2rem;
    line-height: 1.4rem;
    width: 80%;
    border-radius: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }

</style>
