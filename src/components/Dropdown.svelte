<script>
  import Button from '@/components/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let name = "Button"
  export let items;
  export let prop = 'name';
</script>

<div class="dropdown">
  <div class="name">
    <Button text={name}> <i/></Button>
  </div>
  <div class="dropdown-content">
    {#each items as item}
      <div class="item" on:click={() => dispatch('click', item)}>
        {item[prop]}
      </div>
    {/each}
  </div>
</div>


<style lang="stylus">
  @require 'styles/colors'

  .dropdown-content
    border: 1px solid black
    background-color: $primary-2
    border-left: 1px solid $primary-4
    border-bottom: 1px solid $primary-4
    border-right: 1px solid $primary-4
    display: none
    position: absolute
    z-index: 1000
    width: 100%
    box-sizing: border-box
    max-height: 305px
    overflow: hidden
    overflow-y: auto

  .name i
    border: solid white
    border-width: 0 2px 2px 0
    display: inline-block
    padding: 2px
    transform: translate(2px, -2px) rotate(-45deg)
    margin-left: 10px
    margin-top: 5px

  .toggled i
    transform: translate(3px, -3px) rotate(45deg)

  .item
    font-weight: 500
    display: flex
    align-items: center
    justify-content: center
    padding: 8px
    cursor: pointer

    &:not(:last-child)
      border-bottom: 1px solid $primary-4


    &:hover
      opacity: 0.7


  .dropdown:hover

    i
      transform: translate(3px, -3px) rotate(45deg)

    .dropdown-content
      display: block

  .dropdown
    width: 100%
    height: 100%
    position: relative

</style>
