<script>

</script>

<style lang="stylus">
  .img
    animation: rotate 1.5s infinite

  .loading
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

  .content
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: 1fr 1fr

  span
    display: flex
    justify-content: center

  @-webkit-keyframes rotate {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(-360deg);
    }
  }
  @-moz-keyframes rotate {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(-360deg);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(-360deg);
    }
  }
</style>

<div class="loading">
  <div class="content">
    <img src="assets/images/armory.png" alt="background image" class="img" />
    <span>Loading...</span>
  </div>
</div>
