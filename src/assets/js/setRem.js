function sethtmlfontsize(n) {
    // 三个步骤:
    // 1.获取html的宽,
    let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth; //有些浏览器documentElement获取不到,那就使用后面的body

    // 2.htmlDom
    let htmlDom = document.getElementsByTagName("html")[0]

    //3.设置根元素样式  设置1rem = 10px;
    htmlDom.style.fontSize = htmlwidth / n + 'px';
}
// 调用一次
// sethtmlfontsize();

// // 添加监听事件(resize是监听的意思)
// window.addEventListener('resize', sethtmlfontsize)

export default {
    sethtmlfontsize
}