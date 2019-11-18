<script>
  import {PATREON_URL, DISCORD_URL} from '@/globals';

</script>


<div class="content">
  <h1>Donate</h1>
  <div class="donate">
    <div class="info">
      https://classicarmory.org/ World of Warcraft Classic Armory was created by a sole developer, taking roughly three weeks to develop to this point.
      In addition to being the sole developer I also financially maintain the website. Any donations towards the running costs of the Classic Armory are greatly appreciated.
      These costs monthly at the moment are rougly around 50$ USD. In return for your contribution, aside from my thanks, you'll get a shiny rank in the Classic Armory discord. (2019-11-11)
    </div>
    <span><a href={PATREON_URL}>Patreon</span>
    <span>Other ways of donating will be added eventually, if you feel like donating through paypal or by sending bitcoin or another other cryptocurrency, contact me on discord pattez#4267</span>
  </div>
</div>

<style lang="stylus">
  .content
    width: calc(100% - 450px)
    margin: 0 auto

  .info, span
    font-weight: 500

  .donate
    display: grid
    grid-gap: 10px
</style>
