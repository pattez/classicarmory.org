<script>
	import { createEventDispatcher, onMount } from 'svelte';
  import Image from '@/components/Image.svelte';

  export let items = null;
  export let columns = null;
  export let showLoadMore = null;

	const dispatch = createEventDispatcher();

</script>

<table>
  <tr>
    {#each columns as column}
        <th class="{column.img ? 'img': ''}">{column.name}</th>
    {/each}
  </tr>
  {#each items as item}
    <tr class="row">
      {#each columns as column}
        {#if column.img}
        <td class="cell img" on:click={() => dispatch('click', item)}>
          {#if item[column.key]}
            <Image src={item[column.key]}/>
          {/if}
        </td>
        {:else}
        <td class="cell" on:click={() => dispatch('click', item)}>{item[column.key]}</td>
        {/if}
      {/each}
    </tr>
  {/each}
  {#if items.length === 0}
    <div class="empty">
      No data
    </div>
  {/if}
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

  .cell.img
    padding: 5px

  .empty
    position: absolute
    margin: auto
    width: fit-content
    height: fit-content
    left: 0
    right: 0

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

    &.img
      padding: 5px

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
