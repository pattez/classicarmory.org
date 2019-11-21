<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>


<div class="disclaimer">
  <div class="text">
  This website uses Google Analytics tracking to monitor use of the website.  This is done in order to best enable us to maintain the website and ensure it is fulfilling the requirements of its users.
    We do not allow the data collected through Google Analytics to be shared and it does not contain information that can be used to identify you.
  If you do not wish to be tracked in this way you may revoke this permission through appropriate setting in your web browsers security settings
  <img src="assets/images/cross.png" on:click={() => dispatch('click', 'disclaimer')}/>
  </div>
</div>



<style lang="stylus">
  @require 'styles/colors'

  .text
    font-size: 12px
    font-weight: bold
    padding: 10px
    background-color: $primary-2
    display: flex
    justify-content: center

  img
    width: 18px
    height: 15px
    color: white
    cursor: pointer

    &:hover
      transform: scale(1.1)

  .disclaimer
    position: fixed
    bottom: 0
    z-index: 200
</style>
