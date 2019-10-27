<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import { get } from "@/lib/axios";
  import axios from 'axios';
  let player = {
    name: ""
  };
  let playerGear = {};

  const getPlayerData = async () => {
    const {data} = await get({ url: $location });
    // const test = await axios.get('')
		if (data) {
      return data;
		} else {
      throw new Error(text);
		}
  }

  let promise = getPlayerData();

  let keys = [
    "slot_1",
    "slot_2",
    "slot_3",
    "slot_4",
    "slot_5",
    "slot_6",
    "slot_7",
    "slot_8",
    "slot_9",
    "slot_10",
    "slot_11",
    "slot_12",
    "slot_13",
    "slot_14",
    "slot_15",
    "slot_16",
    "slot_17",
    "slot_18",
    "slot_19"
  ];
</script>

<style lang="stylus">

</style>

{#await promise}
  waiting
{:then data}
<h1>{data.player.name}</h1>
  <ul>
    {#each keys as key}
      <li>
        <a href="#"  data-wowhead={`item=${data.playerGear[key]}&domain=classic`}>#</a>
      </li>
    {/each}
  </ul>
{:catch}
  nej
{/await}

