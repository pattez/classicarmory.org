<script>
  import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let show = false;
  onMount(() => {
    const dialog = document.querySelector('.dialog');
    document.addEventListener('keyup', e => {
      if(e.key === 'Escape') {
        dispatch('escape');
        show = false;
      }
    })
    dialog.addEventListener('click', e => {
      if (e.target.className.includes('dialog')) {
        dispatch('outside-click');
        show = false;
      }
    });
  });
</script>

<style lang="stylus">
  /* prettier-ignore */
  @require 'styles/layout'
  @require 'styles/colors'

  .dialog
    @extend $fullscreen
    background-color: $overlay
    display: none

    &.show
      display: block

  .content
    @extend $absolute-center
    z-index: $z-index-dialog
    @extend $card
    min-width: 200px
    min-height: 200px
</style>

<div class="dialog{show ? ' show' : ''}">
  <div class="content">
    <slot />
  </div>
</div>
