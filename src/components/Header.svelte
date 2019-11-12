
<script>
	import {push} from 'svelte-spa-router';
  import {FRONTEND_URL} from '@/globals';
  const githubLink = () => {
    window.open('https://github.com/pattez');
  }
  const discordLink = () => {
    window.open('https://discord.gg/cVDp6en');
  }

  const home = () => {
    window.location = FRONTEND_URL
  };
</script>

<div class="header">
  <div class="content">
  <div class="title" on:click={home}>
    WoW Classic Armory
    <span class="beta">
      Beta
    </span>
  </div>
  <div class="github">
    <span>
      By pattez
    </span>
    <img src="assets/images/github.png" on:click={githubLink}/>
    <img src="assets/images/discord.png" class="discord" on:click={discordLink}/>
  </div>
  </div>
</div>


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

    &:hover
      transform: scale(1.1)

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

  img
    width: 25px
    height: 25px
    margin-left: 10px
    cursor: pointer

    &:hover
      transform: scale(1.2)

  .discord
    width: 27px
    height: 27px
</style>
