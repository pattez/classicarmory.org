<script>
  import {
    INVENTORY_ITEMS,
    formatDate,
    SERVERS,
    RACES,
    RANKS
  } from "@/globals";
  import { location } from "svelte-spa-router";
  import Image from "@/components/Image.svelte";
  import { get } from "@/lib/axios";
  import Loading from "@/components/Loading.svelte";
  import Search from "@/components/Search.svelte";
  import Error from "@/components/Error.svelte";
  import Button from "@/components/Button.svelte";
  import { push } from "svelte-spa-router";
  import axios from "axios";
  import { querystring } from "svelte-spa-router";
  import GearContainer from "@/components/GearContainer.svelte";
  const WOWHEAD_ICON_URL = "https://wow.zamimg.com/images/wow/icons/large/";
  const WOWHEAD_ITEM_URL = "https://classic.wowhead.com/tooltip/item/";
  const WOWHEAD_ICON_URL_MEDIUM =
    "https://wow.zamimg.com/images/wow/icons/large/";
  const getSlotId = item => {
    return item.split("slot_")[1];
  };

  const left = [
    { slot: 1, item: null },
    { slot: 2, item: null },
    { slot: 3, item: null },
    { slot: 15, item: null },
    { slot: 5, item: null },
    { slot: 4, item: null },
    { slot: 19, item: null },
    { slot: 9, item: null }
  ];

  const right = [
    { slot: 10, item: null },
    { slot: 6, item: null },
    { slot: 7, item: null },
    { slot: 8, item: null },
    { slot: 11, item: null },
    { slot: 12, item: null },
    { slot: 13, item: null },
    { slot: 14, item: null }
  ];

  const bottom = [
    { slot: 16, item: null },
    { slot: 17, item: null },
    { slot: 18, item: null }
  ];

  let player = {
    name: ""
  };

  const itemColors = {
    0: "#9d9d9d",
    1: "#fff",
    2: "#1eff00",
    3: "#0070dd",
    4: "#a335ee",
    5: "#ff8000"
  };

  const resolveFaction = raceId => {
    return RACES[raceId].faction === "Alliance" ? 1 : 2;
  };

  const checkOtherItems = items => {
    return Object.keys(items).some(key => items[key].length > 1);
  };

  let otherItems = true;

  const getPlayerData = async () => {
    const { data } = await get({ url: $location });
    let gear = [];
    for (const key of Object.keys(data.gear)) {
      for (let slot of data.gear[key]) {
        const item = await axios.get(`${WOWHEAD_ITEM_URL}${slot.itemId}`);
        const isLeft = left.find(i => i.slot === slot.slotId && slot.current);
        const isRight = right.find(i => i.slot === slot.slotId && slot.current);
        const isBottom = bottom.find(
          i => i.slot === slot.slotId && slot.current
        );

        const values = {
          name: item.data.name,
          quality: item.data.quality,
          color: itemColors[item.data.quality],
          icon: item.data.icon,
          slot: INVENTORY_ITEMS[`slot_${slot.slotId}`]
        };

        if (isLeft) {
          isLeft.item = { ...slot, ...values };
        }
        if (isRight) {
          isRight.item = { ...slot, ...values };
        }
        if (isBottom) {
          isBottom.item = { ...slot, ...values };
        }

        Object.assign(slot, { ...values });
      }
    }
    otherItems = checkOtherItems(data.gear);
    if (data) {
      return data;
    } else {
      throw new Error("text");
    }
  };

  const borderStyling = color => {
    return `border: 1px solid ${color}; border-radius: 3px;`;
  };

  let promise = getPlayerData();

  const search = () => {
    push("/", { bro: "hej" });
  };

  let input = "";
</script>

<style lang="stylus">
  @require 'styles/colors'



  .honor span
    display: flex
    justify-content: space-between

  .info
    font-weight: 500
    font-size: 18px
    display: flex

    div:not(:first-child), span:not(:first-child)
      margin: 0px 5px 0px 5px

    div:first-child
      margin-right: 5px

    &.no-padding
      padding: 0

    &.guild
      padding: 0

  .content
    width: calc(100% - 450px)
    margin: 0 auto

  .main
    background-repeat: no-repeat
    background-size: contain
    background-position: center

  .block
    padding-bottom: 15px
    padding-top: 30px

  .general
    height: 430px
    display: flex

  .other-gear
    width: 210px
    margin-left: 45px

  .items
    width: 100%
    height: 100%
    display: grid
    grid-template-columns: 30px 30px 30px 30px
    grid-auto-rows: 30px
    grid-gap: 10px

  .gear
    display: grid
    grid-template-columns: 90px 220px 45px
    width: 355px
    height: 420px

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
      width: 30px
      height: 30px
      margin: 0

  .title
    font-weight: 500
    margin-bottom: 15px
    font-size: 18px

    &.margin
      margin: 5px 0px 5px 0px
      font-size: 15px
      font-weight: bold
      border-bottom: 1px solid white

      &.first
        margin-top: 0


  .honor
    margin-left: 30px
    width: 280px

  .search
    margin-bottom: 10px

  .button
    width: 200px
    margin-top: 15px

  .lastseen
    width: 355px

  .otherItems
    width: 210px
    margin-left: 45px !important
    margin-right: 0 !important
    font-weight: bold

  .h
    width: 280px
    margin-left: 28px !important
    margin-right: 0 !important
    font-weight: bold;
</style>

<div class="content">
  <h1>Players</h1>
  <!-- <div class="search">
    <Search placeholder="Player name or server" autofocus={false} bind:value={input}/>
  </div>
  <div class="button">
    <Button text="Search" on:click={search}/>
  </div> -->
  {#await promise}
    <Loading />
  {:then data}
  <div class="main" style="background-image: url('assets/wallpaper/{resolveFaction(data.player.raceId)}.webp')">
    <div class="block">
      <div class="info no-padding player">
        <div>
          <Image
            src={`assets/character/${data.player.raceId}_${data.player.genderId}.jpg`} />
        </div>
        <div>
          <Image src={`assets/class/${data.player.classId}.jpg`} />
        </div>
        {#if data.player.rankNumber >= 5 && data.player.rankNumber <= 18}
          <div>
            <Image
              src={`assets/rank/${resolveFaction(data.player.raceId)}_${data.player.rankNumber}.jpg`} />
          </div>
        {/if}
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
      <div class="info">
        <span class="lastseen">
          Last seen by {data.player.uploader}: {formatDate(data.player.lastSeen)}
        </span>
      </div>
    </div>
    <div class="general">
      <div class="gear">
        <div class="left">
          {#each left as slot}
            <div
              class="item {!slot.item ? 'empty' : ''}"
              style={slot.item ? borderStyling(slot.item.color) : ''}>
              {#if slot.item}
                <a
                  href="#"
                  data-wowhead={`item=${slot.item.itemId}&domain=classic&ench=${slot.item.enchantId}`}>
                  <GearContainer
                    src={`${WOWHEAD_ICON_URL}${slot.item.icon}.jpg`} />
                </a>
              {:else}
                <GearContainer src={`assets/gear/${slot.slot}.webp`} />
              {/if}
            </div>
          {/each}
        </div>
        <div class="bottom">
          {#each bottom as slot}
            <div
              class="item bottom {!slot.item ? 'empty' : ''}"
              style={slot.item ? borderStyling(slot.item.color) : ''}>
              {#if slot.item}
                <a
                  href="#"
                  data-wowhead={`item=${slot.item.itemId}&domain=classic&ench=${slot.item.enchantId}`}>
                  <GearContainer
                    src={`${WOWHEAD_ICON_URL}${slot.item.icon}.jpg`} />
                </a>
              {:else}
                <GearContainer src={`assets/gear/${slot.slot}.webp`} />
              {/if}
            </div>
          {/each}
        </div>
        <div class="right">
          {#each right as slot}
            <div
              class="item {!slot.item ? 'empty' : ''}"
              style={slot.item ? borderStyling(slot.item.color) : ''}>
              {#if slot.item}
                <a
                  href="#"
                  data-wowhead={`item=${slot.item.itemId}&domain=classic&ench=${slot.item.enchantId}`}>
                  <GearContainer
                    src={`${WOWHEAD_ICON_URL}${slot.item.icon}.jpg`} />
                </a>
              {:else}
                <GearContainer src={`assets/gear/${slot.slot}.webp`} />
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <div class="other-gear">
        <div class="items">
          {#if otherItems}
            {#each Object.keys(data.gear) as i}
              {#each data.gear[i] as slot}
                {#if !slot.current}
                  <div
                    class="item other"
                    style={slot ? borderStyling(slot.color) : ''}>
                    <a
                      href="#"
                      data-wowhead={`item=${slot.itemId}&domain=classic&ench=${slot.enchantId}`}>
                      <GearContainer
                        src={`${WOWHEAD_ICON_URL_MEDIUM}${slot.icon}.jpg`} />
                    </a>
                  </div>
                {/if}
              {/each}
            {/each}
          {:else}No other items scanned{/if}
        </div>
      </div>
      <div class="honor">
        <div class="today">
          <div class="title margin first">Today</div>
          <span>
            Honorable Kills
            <span>{data.player.todayHK}</span>
          </span>
        </div>
        <div class="yesterday">
          <div class="title margin">Yesterday</div>
          <span>
            Honorable Kills
            <span>{data.player.yesterdayHK}</span>
          </span>
          <span>
            Honor
            <span>{data.player.yesterdayHonor}</span>
          </span>
        </div>
        <div class="thisweek">
          <div class="title margin">This week</div>
          <span>
            Honorable Kills
            <span>{data.player.thisweekHK}</span>
          </span>
          <span>
            Honor
            <span>{data.player.thisweekHonor}</span>
          </span>
        </div>
        <div class="lastweek">
          <div class="title margin">Last week</div>
          <span>
            Honorable Kills
            <span>{data.player.lastweekHK}</span>
          </span>
          <span>
            Honor
            <span>{data.player.lastweekHonor}</span>
          </span>
          <span>
            Standing
            <span>{data.player.lastweekStanding}</span>
          </span>
        </div>
        <div class="lifetime">
          <div class="title margin">Lifetime</div>
          <span>
            Honorable Kills
            <span>{data.player.lifetimeHK}</span>
          </span>
          <span>
            Dishonorable Kills
            <span>{data.player.lifetimeDK}</span>
          </span>
          <span>
            Highest Rank
            <span>
              {#if data.player.lifetimeRank >= 5 && data.player.lifetimeRank <= 18}
                {RANKS[`${resolveFaction(data.player.raceId)}${data.player.lifetimeRank}`]}
              {:else}No rank{/if}
            </span>
          </span>
        </div>
      </div>
    </div>
</div>
  {:catch}
    <Error/>
  {/await}

</div>
