<script>
  import { onMount } from 'svelte';
  import { location } from 'svelte-spa-router';
  import { get } from '@/lib/axios';
  import axios from 'axios';
  import Loading from '@/components/Loading.svelte';

  import { INVENTORY_ITEMS, formatDate } from '@/globals';
  let player = {
    name: '',
  };

  let WOWHEAD_ITEM_URL = 'https://classic.wowhead.com/tooltip/item/';
  const itemColors = {
    0: '#9d9d9d',
    1: '#fff',
    2: '#1eff00',
    3: '#0070dd',
    4: '#a335ee',
    5: '#ff8000',
  };

  let showMore = false;

  let showMoreItems = async (i) => {
    i.showMore = true;
    const moreItems = []
    for(let g of i.gear) {
      if(i.id !== g) {
        const {data} = await axios.get(`${WOWHEAD_ITEM_URL}${g}`);
        moreItems.push({id: g, color: data.quality, name: data.name})
      }
    }
    i.moreItems = moreItems;
    if(moreItems.length > 0) {
      return moreItems;
    } else {
      throw new Error("error")
    }
  };

  const getPlayerData = async () => {
    const { data } = await get({ url: $location });
    const data2 = await get({ url: `${$location}/gear` });
    const playerGear = data2.data;
    let gear = [];
    for (const key of Object.keys(data.playerGear)) {
      if (data.playerGear[key]) {
        const item = await axios.get(`${WOWHEAD_ITEM_URL}${data.playerGear[key]}`);
        gear.push({
          slot_id: key,
          more: playerGear[key] && playerGear[key][0] !== data.playerGear[key] && playerGear[key].length > 1 ? '...' : '',
          gear: playerGear[key],
          slot: INVENTORY_ITEMS[key],
          id: data.playerGear[key],
          name: item.data.name,
          quality: item.data.quality,
          color: itemColors[item.data.quality],
          showMore: false,
          moreItems: [],
          morePromise: null
        });
      }
    }
    data['gear'] = gear;
    if (data) {
      return data;
    } else {
      throw new Error('text');
    }
  };

  const setMorePromise = async (i) => {
    morePromise = showMoreItems(i);
  }
  let morePromise = null;
  let promise = getPlayerData();
</script>

<style lang="stylus">
  .item
    display: flex

  .info
    span
      display: flex

    h1
      span
        font-size: 0.5em

  .item > div, span
    padding-left: 5px

  .more
    cursor: pointer
</style>

<div class="content">
  {#await promise}
    <Loading />
  {:then data}
    <div class="info">
      <h1>
         {data.player.name}
        <span>Level {data.player.level} {data.player.race} {data.player.class} </span>
        <span>{data.player.guildRank} of {`<${data.player.guild}>`}</span>
      </h1>
      <span />
      <span>Last seen by {data.player.uploader} at:</span>
      <span>{formatDate(data.player.lastSeen)}</span>
    </div>
    <ul>
      {#each data.gear as i}
        <li>
          <div class="item">
            <span>{i.slot}:</span>
            <a href="#" data-wowhead={`item=${i.id}&domain=classic`}>
              <span style={`color:${i.color}`}>{i.name} </span>
            </a>
            <div class="more" on:click={() => setMorePromise(i)}> {i.more} </div>

          </div>
        </li>
          {#if morePromise && i.showMore}
          {#await morePromise}
          {:then gear}
            <ul>
              {#each i.moreItems as j}
            <div class="item">
              <a href="#" data-wowhead={`item=${j.id}&domain=classic`}>
                <span style={`color:${j.color}`}>{j.name} </span>
              </a>
            </div>
            {/each}
            </ul>
          {:catch}
            ...
          {/await}

          {/if}
      {/each}

    </ul>

  {:catch}
    nej
  {/await}
</div>
