<template>
  <div class="progress-bar">
    <div class="outer-bar" ref="outerBar" :style="style">
      <div class="inner-bar" ref="innerBar" :style="'width:'+ Width +'%'"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      allTime: {
        type: Number,
        default: 0,
        required: true
      },
      current: {
        type: Number,
        default: 0,
        required: true
      },
      background:{
        type:String,
        default:"#000"
      }
    },
    data() {
      return {
        Width:0,
        style:{
          "background": this.background
        }
      }
    },
    watch:{
      current(){
           this.Width = this.current/this.allTime*100;
      }
    },
    mounted(){
      this.$refs.outerBar.addEventListener("touchstart",(e)=>{
       var touchPoint = e.touches[0].clientX - e.target.offsetLeft;
       var ouetrBarWidth = this.$refs.outerBar.clientWidth;
       this.Width = touchPoint/ouetrBarWidth * 100;
       this.$emit( "getWidthRate",touchPoint/ouetrBarWidth );
      })
    }
    
  }

</script>
<style scoped>
  .progress-bar {
    width: 100%;
  }

  .outer-bar {
    width: 100%;
    height: 1rem;
    background: #000;
    border-radius: 0.5rem;
  }

  .inner-bar {
    width: 0%;
    height: 1rem;
    background: #f00;
    border-radius: 0.5rem;
  }

</style>
