<script>
  import Button from '@/components/Button.svelte';
  import Search from '@/components/Search.svelte';
  import Table from '@/components/Table.svelte';
  import { onMount } from 'svelte';
  import {post} from '@/lib/axios';
  import {genders, formatDate} from '@/globals'
	import {push} from 'svelte-spa-router';

  let input = '';
  let players = null;
  let searchError = null;

  let columns = [
    {name: 'Name', key: 'name'},
    {name: 'Server', key: 'server'},
    {name: 'Guild', key: 'guild'},
    {name: 'Guild rank', key: 'guildRank'},
    {name: 'Level', key: 'level'},
    {name: 'Race', key: 'race'},
    {name: 'Gender', key: 'gender'},
    {name: 'Last seen', key: 'lastSeen'},
  ];

  async function getPlayers() {
    if (input) {
      searchError = false;
      const {data} = await post({
        url: '/players',
        name: input
      });
      players = data.map((i) => ({
        ...i,
        gender: genders[i.gender],
        lastSeen: formatDate(i.lastSeen)
      }))
    } else {
      searchError = true;
    }
  };

  async function playerClick({detail}) {
    push(`/players/${detail.id}`);
  }

	onMount(() => {
    document.addEventListener('keyup', (e) => {
      if(e.key === 'Enter' && input !== '') {
        getPlayers();
      }
    })
	});
</script>

<div class="content">
  {#if !players}
  <div class="form">
  <div class="img">
  <img src="assets/images/armory.png" alt="background image"/>
  </div>
  <div class="search">
    <Search placeholder="pattez gehennas" bind:value={input} error={searchError}/>
  </div>
  <div class="button">
    <Button text="search" on:click={getPlayers}/>
  </div>
  </div>
  {/if}
  {#if players}
  <div class="players">
  <div class="top">
    <h1>Players</h1>
    <Search placeholder="pattez gehennas" bind:value={input} error={searchError}/>
    <Button text="search" on:click={getPlayers}/>
  </div>
  <div class="table">
    <Table items={players} {columns} on:click={playerClick}/>
  </div>
  </div>
  {/if}
</div>

<style lang="stylus">
  .content
    display: flex
    justify-content: center
    width: 100%
    height: 100%
    align-items: center

  .search
    width: 500px
    margin-bottom: 10px

  .button
    display: flex
    justify-content: center

  .img
    justify-content: center
    display: flex
    margin-bottom: 10px

  .players
    height: 100%

</style>
