<script>
  import {get} from '@/lib/axios'
  import Loading from '@/components/Loading.svelte';
  import Error from '@/components/Error.svelte';
  import {SERVERS} from '@/globals'
  let EU_SERVERS = [];
  let US_SERVERS = [];


  const getStats = async () => {
    const {data} = await get({url: '/stats/servers'});
    EU_SERVERS = data.servers.filter((i) => i.region === 'eu')
    US_SERVERS = data.servers.filter((i) => i.region === 'us')
    if(data) {
      return data;
    } else {
      return 'Error'
    }
  };

  const promise = getStats()

  const style = (server, faction) => {
    let width = parseFloat((server[faction] / server.total)) * 100;
    width = width > 0 ? width : '100'
    return `width: ${width}%;`
  }

</script>


<div class="content">
  <h1>Stats</h1>
  {#await promise}
  <Loading/>
  {:then data}
  <span>
    Total players inspected:
    {data.total}
  </span>
    <h1>EU</h1>
  <div class="stats">
    {#each EU_SERVERS as server}
      <div class="server">
      <span>
        {server.name}
        {server.total === (server.alliance + server.horde) ? server.total : 0}
        {server.type}
      </span>
      <div class="progress">
        <div class="alliance" style={style(server, 'alliance')}></div>
        <div class="horde"  style={style(server, 'horde')}></div>
      </div>
      <div class="faction">
        <span>
          <img src="assets/alliance.png"/>
          {server.alliance}
        </span>
        <span>
          <img src="assets/horde.png"/>
          {server.horde}
        </span>
      </div>
      </div>
    {/each}
  </div>
  <h1>US</h1>
  <div class="stats">
      {#each US_SERVERS as server}
      <div class="server">
      <span>
        {server.name}
        {server.total === server.alliance + server.horde ? server.total : 0}
        {server.type}
      </span>
      <div class="progress">
        <div class="alliance" style={style(server, 'alliance')}></div>
        <div class="horde"  style={style(server, 'horde')}></div>
      </div>
      <div class="faction">
        <span>
          <img src="assets/alliance.png"/>
          {server.alliance}
        </span>
        <span>
          <img src="assets/horde.png"/>
          {server.horde}
        </span>
      </div>
      </div>
    {/each}
  </div>
  {:catch}
    <Error/>
  {/await}
</div>


<style lang="stylus">

  span
    display: flex
    align-items: center

  .content
    width: calc(100% - 450px)
    margin: 0 auto

  .progress
    display: flex


  .alliance
    background-color: #144587

  .horde
    background-color: #8c1616

  .stats
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-auto-rows: 1fr
    grid-gap: 80px

  .progress
    padding-top: 10px
    height: 10px

  .faction
    display: flex
    justify-content: space-between
    padding-top: 5px

  img
    height: 15px
    width: 15px
    margin-right: 5px
</style>
