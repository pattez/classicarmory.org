<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let text;
</script>

<button class="button" on:click={() => dispatch('click', 'click')}>{text}<slot/></button>


<style lang="stylus">
  .button
    background-color: transparent
    border-color: #66fcf1
    text-transform: uppercase
    cursor: pointer
    font-weight: bold
    height: 35px
    display: flex
    align-items: center
    justify-content: center
    width: 100%

    &:hover
      opacity: 0.6
</style>
