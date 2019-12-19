<!-- 评论 -->
<template>
  <div>
    <div class="com-head">
      <div class="com-head-inner">
        <span class="icon iconfont">&#xe62f;</span>
        <h4>评论1755</h4>
        <span class="icon iconfont"></span>
      </div>
    </div>
    <ul class="comment-list">
      <li class="com-item">
        <div class="com-item-head">
          <img src="../../assets/images/007.jpg" alt="">
          <div class="com-item-name">
            <p>张三</p>
            <p>2019-11-13</p>
          </div>
          <div class="com-item-num">
            <span>1988</span>
            <span>11</span>
          </div>
        </div>
        <p>
          哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        </p>
      </li>
      <li class="com-item">
        <div class="com-item-head">
          <img src="../../assets/images/007.jpg" alt="">
          <div class="com-item-name">
            <p>张三</p>
            <p>2019-11-13</p>
          </div>
          <div class="com-item-num">
            <span>1988</span>
            <span>11</span>
          </div>
        </div>
        <p>
          哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
 

</script>

<style scoped>
  .com-head {
    height: 5rem;
  }

  .com-head>.com-head-inner {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: fixed;
    font-size: 1.8rem;
  }

  .com-head>.com-head-inner>span {
    display: inline-block;
    flex-grow: 1;
  }

  .com-head>div>h4 {
    flex-grow: 4;
    margin: 0;
    line-height: 5rem;
  }

  .comment-list {
    padding: 0 2rem;
  }

  .com-item {
    padding: 1rem 0;
  }

  .com-item-head {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .com-item-head>img {
    width: 5rem;
    height: 5rem;
    border-radius: 4rem;
  }

  .com-item-name {
    flex-grow: 1;
    margin-right: 1rem;
    font-size: 1.2rem;
  }

  .com-item-name>p {
    margin: 0.4rem 1rem;
  }

  .com-item-num {
    font-size: 1.2rem;
  }

  .com-item>p {
    margin: 0.4rem 0 0.4rem 6rem;
    word-wrap: break-word;
    word-break: break-all;
  }

</style>
