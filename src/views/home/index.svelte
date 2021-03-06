<script>
  import Button from "@/components/Button.svelte";
  import Search from "@/components/Search.svelte";
  import Image from "@/components/Image.svelte";
  import Table from "@/components/Table.svelte";
  import { onMount } from "svelte";
  import { post } from "@/lib/axios";
  import { formatDate, ADDON_URL, FRONTEND_URL, RACES } from "@/globals";
  import Loading from "@/components/Loading.svelte";
  import { push, querystring } from "svelte-spa-router";

  let input = "";
  let players = [];
  let lastInput = "";
  let searchError = null;
  let offset = 0;
  let showLoadMore = false;
  let loading = false;
  let searched = false;
  let columns = [
    { name: "", key: "characterSrc", img: true },
    { name: "", key: "classSrc", img: true },
    { name: "", key: "rankSrc", img: true },
    { name: "Name", key: "name" },
    { name: "Server", key: "server" },
    { name: "Guild", key: "guild" },
    { name: "Guild rank", key: "guildRank" },
    { name: "Level", key: "level" },
    { name: "Last seen", key: "lastSeen" }
  ];

  const resolveFaction = raceId => {
    return RACES[raceId].faction === "Alliance" ? 1 : 2;
  };

  async function getPlayers(o) {
    if (input) {
      if (lastInput !== input) {
        players = [];
        loading = true;
      }
      lastInput = input;
      searchError = false;
      loading = true;
      if (players.length > 0) {
        loading = false;
      }
      const { data } = await post({
        url: "/players",
        name: input,
        offset: o
      });
      showLoadMore = data.length >= 50;
      if (players.length > 0) {
        players = players.concat(data);
      } else {
        players = data;
      }
      players = players.map(i => ({
        ...i,
        lastSeen: formatDate(i.lastSeen),
        characterSrc: `assets/character/${i.raceId}_${i.genderId}.jpg`,
        classSrc: `assets/class/${i.classId}.jpg`,
        rankSrc:
          i.rankNumber >= 5 && i.rankNumber <= 18
            ? `assets/rank/${resolveFaction(i.raceId)}_${i.rankNumber}.jpg`
            : null
      }));
      loading = false;
      searched = true;
    } else {
      searchError = true;
    }
  }

  const parseQuerystring = () => {
    return $querystring.split("search=")[1];
  };

  async function fetchMore() {
    if (players.length > 0) {
      offset = offset + 50;
      await getPlayers(offset);
    }
  }

  async function playerClick({ detail }) {
    push(`/players/${detail.id}`);
  }

  onMount(() => {
    document.addEventListener("keyup", async e => {
      if (e.key === "Enter" && input !== "") {
        push(`/?search=${input}`);
      }
    });
  });

  const clickSearch = async () => {
    if (input !== "") {
      push(`/?search=${input}`);
    }
  };

  const checkQueryString = async () => {
    if ($querystring && $querystring.includes("search")) {
      input = decodeURIComponent(parseQuerystring());
      offset = 0;
      await getPlayers(offset);
    }
  };

  const githubLink = () => {
    window.open("https://github.com/pattez/classicarmory.org");
  };

  $: {
    if ($querystring) {
      checkQueryString();
    }
  }
</script>

<style lang="stylus" scoped>
  @require 'styles/colors'


  .logo
    cursor: pointer

    &:hover
      opacity: 0.7

  a
    color: $primary-4

  .content
    display: flex
    justify-content: center
    width: 100%
    height: 100%

  .search
    margin-bottom: 10px

  .button
    display: flex
    justify-content: center
    width: 200px
    margin: 0 auto

    &.after
      margin: 0
      margin-top: 15px

  .img
    justify-content: center
    display: flex
    margin-top: 15px

  .players
    height: 100%
    width: calc(100% - 450px)

  span
    line-height: 25px
    font-weight: 500

  .info
    width: 1000px
    text-align: center
    margin-bottom: 20px

    &.about
      margin-top: 20px

  .top
    margin-bottom: 30px

  .donations
    position: absolute
    bottom: 70px

  .form
    margin-top: 100px

  .title
    font-size: 3em
    font-weight: 500;
</style>

<div class="content">
  {#if !loading && !searched}
      <div class="form">
        <div class="info">
          <div class="img">
            <img src="assets/images/armory.png" alt="background image" />
          </div>
          <div class="title">Classic WoW Armory</div>
        </div>
        <div class="info about">
          <span>
            Classic WoW Armory
            <a href="https://classicarmory.org">https://classicarmory.org</a>
             has come to an end
          </span>
        </div>
        <div class="info about">
          <span>
            To all the people that helped with this project
          </span>
        </div>
        <div class="info about">
          <span>
           Thank you &#128522;
          </span>
        </div>
        <div class="info about">
          <img class="logo" src="assets/images/github.png" on:click={githubLink} />
        </div>
      </div>
    {/if}
  {#if loading}
    <Loading />
  {/if}
</div>
