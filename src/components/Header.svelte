<script>
  import { push } from "svelte-spa-router";
  import { FRONTEND_URL } from "@/globals";
  import Icon from "@/components/Icon.svelte";
  import Search from "@/components/Search.svelte";
  import ClickOutside from "svelte-click-outside";

  const githubLink = () => {
    window.open("https://github.com/pattez");
  };
  const discordLink = () => {
    window.open("https://discord.gg/cVDp6en");
  };

  const home = () => {
    push("/");
  };

  const donate = () => {
    push("/donate");
  };

  const honor = () => {
    push("/honor");
  };
  const upload = () => {
    push("/upload");
  };
  const stats = () => {
    push("/stats");
  };

  const activateSearch = () => {
    const searchBar = document.querySelector(".search-bar");
    const searchEl = searchBar.children[0];
    searchEl.focus();

    if (!visible) {
      visible = true;
    } else {
      search();
    }
  };

  const onClickOutside = () => {
    visible = false;
  };

  const onFocus = () => {
    focused = true;
  };

  const onFocusOut = () => {
    focused = false;
  };

  let focused = false;
  let visible = false;
  let triggerEl;
  let input = "";

  const search = () => {
    if (focused && visible && input !== "") {
      push(`/?search=${input}`);
      visible = false;
      focused = false;
      input = "";
    }
  };

  const handleKeydown = e => {
    if (e.keyCode === 13) {
      search();
    }
  };
</script>

<style lang="stylus">
  @require 'styles/colors'

  .header
    height: 50px
    background-color: #1F2833
    display: flex
    align-items: center

  .beta
    color: $primary-4

  .title
    font-weight: bold
    color: $primary-3
    cursor: pointer
    height: 100%
    display: flex
    align-items: center

  .honor, .upload
    cursor: pointer

    &:hover
      opacity: 0.7

  .upload
    margin-left: 15px


  .text
    height: 100%
    display: flex
    align-items: center
    padding-right: 30px

    &:hover
      opacity: 0.7


  .github
    display: flex
    align-items: center
    justify-content: space-between
    font-weight: bold
    color: $primary-3


  .content
    width: calc(100% - 60px)
    margin: 0 auto
    display: flex
    justify-content: space-between
    align-items: center
    height: 100%

  img, .search
    width: 25px
    height: 25px
    margin-left: 20px
    cursor: pointer

    &:hover
      transform: scale(1.2)

  .discord
    width: 27px
    height: 27px

  .donate
    display: flex
    height: 100%
    align-items: center
    cursor: pointer
    margin-left: 15px


  .donate span:hover
    opacity: 0.7

  .armory
    font-weight: bold

  .search
    display: flex

  .search-bar
    height: 30px
    font-size: 13px;
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="header">
  <div class="content">
    <div class="title">
      <div class="text" on:click={home}>
        <span class="armory">
          Classic WoW Armory
          <span class="beta">Beta</span>
        </span>
      </div>
    </div>
    <div class="github">
      <img src="assets/images/github.png" on:click={githubLink} />
    </div>
  </div>
</div>
