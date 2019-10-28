<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import { get } from "@/lib/axios";
  import axios from "axios";
  import Loading from "@/components/Loading.svelte";
  import {INVENTORY_ITEMS, formatDate} from '@/globals'
  let player = {
    name: ""
  };

  let WOWHEAD_ITEM_URL = "https://classic.wowhead.com/tooltip/item/";
  const itemColors = {
    0: "#9d9d9d",
    1: "#fff",
    2: "#1eff00",
    3: "#0070dd",
    4: "#a335ee",
    5: "#ff8000"
  };
  const getPlayerData = async () => {
    const { data } = await get({ url: $location });
    let gear = [];
    for (const key of Object.keys(data.playerGear)) {
      if (data.playerGear[key]) {
        const item = await axios.get(
          `${WOWHEAD_ITEM_URL}${data.playerGear[key]}`
        );
        gear.push({
          slot: INVENTORY_ITEMS[key],
          id: data.playerGear[key],
          name: item.data.name,
          quality: item.data.quality,
          color: itemColors[item.data.quality]
        });
      }
    }
    data["gear"] = gear;
    if (data) {
      return data;
    } else {
      throw new Error("text");
    }
  };

  let promise = getPlayerData();
</script>

<style lang="stylus">
  .info

    span
      display: flex

    h1
      span
        font-size: 0.5em
</style>


<div class="content">
{#await promise}
  <Loading />
{:then data}
  <div class="info">
    <h1>{data.player.name} {data.player.race} <span>{data.player.guildRank} of {`<${data.player.guild}>`}</span></h1>
    <span></span>
    <span>Last seen by {data.player.uploader} at:</span>
    <span>{formatDate(data.player.lastSeen)}</span>
  </div>
  <ul>
    {#each data.gear as i}
      <li>
          <span>{i.slot}:</span>
        <a href="#" data-wowhead={`item=${i.id}&domain=classic`}>
          <span style={`color:${i.color}`}>{i.name}</span>
        </a>
      </li>
    {/each}
  </ul>
{:catch}
  nej
{/await}
</div>
