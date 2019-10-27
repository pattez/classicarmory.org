<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let text;
</script>

<button class="button" on:click={() => dispatch('click', 'click')}>{text}</button>


<style lang="stylus">
  .button
    min-width: 150px
    background-color: transparent
    border-color: #66fcf1
    text-transform: uppercase
    cursor: pointer
    font-weight: bold
    height: 35px
    display: flex
    align-items: center
    justify-content: center

    &:hover
      opacity: 0.6
</style>
