<script>
	import { createEventDispatcher } from 'svelte';

  export let items = null;
  export let columns = null;

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


<style lang="stylus">
  tr
    width: 100%
    cursor: pointer

    &.row:hover
      opacity: 0.5

  .cell
    border: 1px solid white

  th, td
    padding: 20px
    text-align: left

  table
    width: 100%
    height: 100%
</style>
