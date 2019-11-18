<script>
  import {INVENTORY_ITEMS, formatDate, SERVERS} from '@/globals'
  import { location } from 'svelte-spa-router';
  import Image from '@/components/Image.svelte';
  import { get } from '@/lib/axios';
  import Loading from '@/components/Loading.svelte';
  import axios from 'axios';
  import GearContainer from '@/components/GearContainer.svelte';
  const WOWHEAD_ICON_URL = 'https://wow.zamimg.com/images/wow/icons/large/'
  const WOWHEAD_ITEM_URL = 'https://classic.wowhead.com/tooltip/item/';
  const WOWHEAD_ICON_URL_MEDIUM = 'https://wow.zamimg.com/images/wow/icons/medium/';
  const getSlotId = (item) => {
    return item.split('slot_')[1]
  }

  const left = [
    {slot: 1, item: null},
    {slot: 2, item: null},
    {slot: 3, item: null},
    {slot: 15, item: null},
    {slot: 5, item: null},
    {slot: 4, item: null},
    {slot: 19, item: null},
    {slot: 9, item: null},
  ];

  const right = [
    {slot: 10, item: null},
    {slot: 6, item: null},
    {slot: 7, item: null},
    {slot: 8, item: null},
    {slot: 11, item: null},
    {slot: 12, item: null},
    {slot: 13, item: null},
    {slot: 14, item: null},
  ];

  const bottom = [
    {slot: 16, item: null},
    {slot: 17, item: null},
    {slot: 18, item: null},
  ]

  let player = {
    name: '',
  };

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
          const isLeft = left.find((i) => i.slot === slot.slotId && slot.current);
          const isRight = right.find((i) => i.slot === slot.slotId && slot.current);
          const isBottom = bottom.find((i) => i.slot === slot.slotId && slot.current);

          const values = {
            name: item.data.name,
            quality: item.data.quality,
            color: itemColors[item.data.quality],
            icon: item.data.icon,
            slot: INVENTORY_ITEMS[`slot_${slot.slotId}`]
          };



          if (isLeft) {isLeft.item = {...slot, ...values}}
          if (isRight) {isRight.item = {...slot, ...values}}
          if (isBottom) {isBottom.item = {...slot, ...values}}

          Object.assign(slot, {...values})
      }
    }
    if (data) {
      return data;
    } else {
      throw new Error('text');
    }
  };

  const borderStyling = (color) => {
    return `border: 1px solid ${color}; border-radius: 3px;`
  }

  let promise = getPlayerData()

</script>





<div class="content">
  <h1>Player</h1>
  {#await promise}
    <Loading />
  {:then data}
  <div class="block">
    <div class="info no-padding">
    <div>
      <Image src={`assets/character/${data.player.raceId}_${data.player.genderId}.jpg`}/>
    </div>
    <div>
      <Image src={`assets/class/${data.player.classId}.jpg`}/>
    </div>
      <span>{data.player.name}</span>
      <span>{data.player.level}</span>
    </div>
    <div class="info guild">
      {#if data.player.guild}
      <span>{data.player.guildRank} of {`<${data.player.guild}>`}</span>
      {/if}
    </div>
    <div class="info">
      <span>Server: {SERVERS[data.player.serverId].name}</span>
    </div>
  </div>
  <div class="general">
      <div class="gear">
    <div class="left">
      {#each left as slot}
        <div class="item {!slot.item ? 'empty' : ''}" style={slot.item ? borderStyling(slot.item.color) : ""}>
        {#if slot.item}
          <a href="#" data-wowhead={`item=${slot.item.itemId}&domain=classic&ench=${slot.item.enchantId}`}>
            <GearContainer src={`${WOWHEAD_ICON_URL}${slot.item.icon}.jpg`}/>
          </a>
        {:else}
            <GearContainer src={`assets/gear/${slot.slot}.webp`}/>
        {/if}
        </div>
      {/each}
    </div>
    <div class="bottom">
      {#each bottom as slot}
      <div class="item bottom {!slot.item ? 'empty' : ''}" style={slot.item ? borderStyling(slot.item.color) : ""}>
        {#if slot.item}
          <a href="#" data-wowhead={`item=${slot.item.itemId}&domain=classic&ench=${slot.item.enchantId}`}>
            <GearContainer src={`${WOWHEAD_ICON_URL}${slot.item.icon}.jpg`}/>
          </a>
        {:else}
            <GearContainer src={`assets/gear/${slot.slot}.webp`}/>
        {/if}
        </div>
      {/each}
    </div>
    <div class="right">
      {#each right as slot}
      <div class="item {!slot.item ? 'empty' : ''}" style={slot.item ? borderStyling(slot.item.color) : ""}>
        {#if slot.item}
          <a href="#" data-wowhead={`item=${slot.item.itemId}&domain=classic&ench=${slot.item.enchantId}`}>
            <GearContainer src={`${WOWHEAD_ICON_URL}${slot.item.icon}.jpg`}/>
          </a>
        {:else}
            <GearContainer src={`assets/gear/${slot.slot}.webp`}/>
        {/if}
        </div>
      {/each}
    </div>
  </div>
  <div class="other-gear">
  <h1>Other items</h1>
    <div class="items">
      {#each Object.keys(data.gear) as i}
        {#each data.gear[i] as slot}
          {#if !slot.current}
          <div class="item other" style={slot ? borderStyling(slot.color) : ""}>
            <a href="#" data-wowhead={`item=${slot.itemId}&domain=classic&ench=${slot.enchantId}`}>
              <GearContainer src={`${WOWHEAD_ICON_URL_MEDIUM}${slot.icon}.jpg`}/>
            </a>
          </div>
          {/if}
        {/each}
      {/each}
    </div>
  </div>
  </div>

  {:catch}
    ERROR
  {/await}

</div>

<style lang="stylus">
  @require 'styles/colors'

  .info
    font-weight: 500
    font-size: 20px
    display: flex

    div, span
      margin: 0px 5px 0px 5px

    &.no-padding
      padding: 0

    &.guild
      padding: 0

  .content
    width: calc(100% - 450px)
    margin: 0 auto

  .block
    padding-bottom: 15px

  .general
    height: 430px

  .other-gear
    width: 355px
    margin-top: 15px
    display: grid

  .items
    width: 100%
    height: 100%
    display: grid
    grid-template-columns: 25px 25px auto
    grid-gap: 10px

  .gear
    display: grid
    grid-template-columns: 90px 220px 45px
    width: 355px

  .left
    grid-column: 1

  .right
    grid-column: 3

  .bottom
    grid-column: 2
    display: flex
    align-self: end

  .item, .iconsmall
    height: 45px
    width: 45px
    padding-left: 2px

  .item
    margin-bottom: 5px

    &.empty
      height: 50px
      width: 51px
      padding: 0

    &.bottom
      margin-left: 5px
      margin-right: 5px

    &.other
      width: 25px
      height: 25px
      margin: 0

</style>
