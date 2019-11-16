<script>
  import Button from '@/components/Button.svelte';
  import Search from '@/components/Search.svelte';
  import Image from '@/components/Image.svelte';
  import Table from '@/components/Table.svelte';
  import { onMount } from 'svelte';
  import {post} from '@/lib/axios';
  import {formatDate, ADDON_URL} from '@/globals'
  import Loading from '@/components/Loading.svelte';
  import {push} from 'svelte-spa-router';

  let input = '';
  let players = [];
  let lastInput = '';
  let searchError = null;
  let offset = 0;
  let showLoadMore = false;
  let loading = false;
  let columns = [
    {name: '', key: 'characterSrc', img: true},
    {name: '', key: 'classSrc', img: true},
    {name: 'Name', key: 'name'},
    {name: 'Server', key: 'server'},
    {name: 'Guild', key: 'guild'},
    {name: 'Guild rank', key: 'guildRank'},
    {name: 'Level', key: 'level'},
    {name: 'Last seen', key: 'lastSeen'},
  ];

  async function getPlayers(o) {
    if (input) {
      if(lastInput !== input) {
        players = [];
        loading = true;
      }
      lastInput = input;
      searchError = false;
      loading = true;
      if (players.length > 0) {
        loading = false;
      }
      const {data} = await post({
        url: '/players',
        name: input,
        offset: o
      });
      showLoadMore = data.length >= 50;
      if(players.length > 0) {
        players = players.concat(data)
      } else {
        players = data;
      }
      players = players.map((i) => ({
          ...i,
          lastSeen: formatDate(i.lastSeen),
          characterSrc: `assets/character/${i.raceId}_${i.genderId}.jpg`,
          classSrc: `assets/class/${i.classId}.jpg`
        }));
      loading = false;
    } else {
      searchError = true;
    }
  };


  async function fetchMore() {
    if(players.length > 0) {
      offset = offset + 50;
      await getPlayers(offset)
    }
  };

  async function playerClick({detail}) {
    push(`/players/${detail.id}`);
  }
	onMount(() => {
    document.addEventListener('keyup', async (e) => {
      if(e.key === 'Enter' && input !== '') {
        offset = 0;
        await getPlayers(offset);
      }
    })
  });

  const clickSearch = async () => {
    if(input !== '') {
      offset = 0;
      await getPlayers(offset);
    }
  }

</script>


<div class="content">
  {#if !loading}
  {#if players.length === 0}
  <div class="form">
  <div class="info">
  <span>WoW Classic Armory uses a lightweight addon <a href={ADDON_URL}>{ADDON_URL}</a> to display your character data on <a href="https://classicarmory.org">https://classicarmory.org.</a></span>
  <span>We are currently in a closed beta phase of development<span>
  </div>
  <div class="img">
  <img src="assets/images/armory.png" alt="background image"/>
  </div>
  <div class="search">
    <Search placeholder="Player name or server" bind:value={input} error={searchError}/>
  </div>
  <div class="button">
    <Button text="search" on:click={clickSearch}/>
  </div>
  </div>
  {/if}
  {#if players.length > 0}
  <div class="players">
  <div class="top">
    <h1>Players</h1>
    <Search placeholder="pattez gehennas" bind:value={input} error={searchError}/>
    <Button text="search" on:click={clickSearch}/>
  </div>
  <div class="table">
    <Table items={players} {columns} on:click={playerClick} showLoadMore={showLoadMore} on:load-more={fetchMore}/>
  </div>
  </div>
  {/if}
  {/if}
  {#if loading}
    <Loading/>
  {/if}
</div>
{#if !loading && players.length === 0}
  <div class="donations">
    Donations: 1. Myaka 0.0010 BTC
  </div>
{/if}

<style lang="stylus" scoped>
  @require 'styles/colors'

  a
    color: $primary-4

  .content
    display: flex
    justify-content: center
    width: 100%
    height: 100%
    align-items: center

  .search
    margin-bottom: 10px

  .button
    display: flex
    justify-content: center
    width: 200px
    margin: 0 auto

  .img
    justify-content: center
    display: flex
    margin-bottom: 10px
    margin-top: 15px

  .players
    height: 100%

  span
    line-height: 25px
    font-weight: 500

  .info
    width: 800px
    text-align: center

</style>
