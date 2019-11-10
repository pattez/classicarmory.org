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

  const WOWHEAD_ITEM_URL = 'https://classic.wowhead.com/tooltip/item/';
  const WOWHEAD_ICON_URL = 'https://wow.zamimg.com/images/wow/icons/small/'
  const itemColors = {
    0: '#9d9d9d',
    1: '#fff',
    2: '#1eff00',
    3: '#0070dd',
    4: '#a335ee',
    5: '#ff8000',
  };

  const getPlayerData = async () => {
    const { data } = await get({ url: $location });
    let gear = [];
    for (const key of Object.keys(data.gear)) {
      for (let slot of data.gear[key]) {
          const item = await axios.get(`${WOWHEAD_ITEM_URL}${slot.itemId}`);
          Object.assign(slot, {
          name: item.data.name,
          quality: item.data.quality,
          color: itemColors[item.data.quality],
          icon: item.data.icon,
          slot: INVENTORY_ITEMS[`slot_${slot.slotId}`],
        })
      }
    }
    if (data) {
      return data;
    } else {
      throw new Error('text');
    }
  };

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

  .item > div, a
    padding-left: 5px

  .more
    cursor: pointer

  .iconsmall
    background-repeat: no-repeat
    background-position: center
    width: 20px
    height: 20px

  li
    padding: 3px 0px 3px 0px

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
      {#each Object.keys(data.gear) as i}
        {#each data.gear[i] as slot}
        {#if slot.current}
        <li>
          <div class="item">
            <span>{slot.slot}:</span>
            <a href="#" data-wowhead={`item=${slot.itemId}&domain=classic&ench=${slot.enchantId}`}>
            <span class="iconsmall" style={`background-image: url('${WOWHEAD_ICON_URL}${slot.icon}.jpg')`}></span>
              <span style={`color:${slot.color}`}>{slot.name} </span>
            </a>
          </div>
        </li>
          {/if}
          {#if !slot.current}
        <ul>
          <li>
            <div class="item">
            <a href="#" data-wowhead={`item=${slot.itemId}&domain=classic&ench=${slot.enchantId}`}>
            <span class="iconsmall" style={`background-image: url('${WOWHEAD_ICON_URL}${slot.icon}.jpg')`}></span>
              <span style={`color:${slot.color}`}>{slot.name} </span>
            </a>
          </div>
          </li>
        </ul>
          {/if}
        {/each}
      {/each}
      </ul>


  {:catch}
    nej
  {/await}
</div>
