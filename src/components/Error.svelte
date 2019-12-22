<script>
  import Loading from "@/components/Loading.svelte";
</script>

<style lang="stylus">
  @require 'styles/empty'

  .img
    animation: rotate 1.5s infinite

  .error
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

  .content
    display: inline-grid

  span, .icon
    display: flex
    justify-content: center
    align-items: center

</style>

<div class="error">
  <div class="content">
    <div class="icon">
      <img src="assets/images/armory.png" alt="background image" class="img" />
    </div>
    <span>Something went terribly wrong... </span>
    <span>Try refreshing the page or contact an admin.</span>
  </div>
</div>
