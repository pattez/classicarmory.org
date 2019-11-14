<script>
	import { createEventDispatcher, onMount } from 'svelte';

  export let items = null;
  export let columns = null;
  export let showLoadMore = null;

	const dispatch = createEventDispatcher();

</script>

<table>
  <tr>
    {#each columns as column}
      <th>{column.name}</th>
    {/each}
  </tr>
  {#each items as item}
    <tr class="row">
      {#each columns as column}
        <td class="cell" on:click={() => dispatch('click', item)}>{item[column.key]}</td>
      {/each}
    </tr>
  {/each}
</table>
{#if showLoadMore}
<div class="more" on:click={() => dispatch('load-more')}>
  Load more
</div>
{/if}


<style lang="stylus">
  @require 'styles/colors'

  table
    border-collapse: collapse


  tr
    width: 100%
    cursor: pointer

  tr:not(:first-child)
    border-bottom: 1px solid $primary-4


    &.row:hover
      opacity: 0.5

  th, td
    padding: 10px
    text-align: left

  table
    width: 100%
    height: 100%

  .more
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    height: 40px
    cursor: pointer
    &:hover
      background-color: $primary-1
      opacity: 0.5
</style>
