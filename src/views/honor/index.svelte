<script>
  import Table from '@/components/Table.svelte';
  import Loading from '@/components/Loading.svelte';
  import Dropdown from '@/components/Dropdown.svelte';
  import {axiosPost} from '@/lib/axios';
  import {formatDate, SERVERS, FRONTEND_URL} from '@/globals'
  import { onMount } from 'svelte';
  import {scrollTo} from "svelte-scrollto";

  const columns = [
    {name: "", key: "characterSrc", img:true},
    {name: "", key: "classSrc", img: true },
    {name: "", key: "rankSrc", img: true },
    {name: 'Name', key: 'name'},
    {name: 'Guild', key: 'guild'},
    {name: 'Guild rank', key: 'guildRank'},
    {name: 'Last seen', key: 'lastSeen'},
    {name: 'Last week standing', key: 'lastweekStanding'},
    {name: 'HKs today', key: 'todayHK'},
    {name: 'HKs yesterday', key: 'yesterdayHK'},
    {name: 'Honor yesterday', key: 'yesterdayHonor'},
    {name: 'This week HKs', key: 'thisweekHK'},
    {name: 'This week honor', key: 'thisweekHonor'},
    {name: 'Lifetime HKs', key: 'lifetimeHK'},
  ];

  let orderBys = [
    {name: 'Last seen', key: 'lastSeen'},
    {name: 'Last week standing', key: 'lastweekStanding'},
    {name: 'HKs today', key: 'todayHK'},
    {name: 'HKs yesterday', key: 'yesterdayHK'},
    {name: 'Honor yesterday', key: 'yesterdayHonor'},
    {name: 'This week HKs', key: 'thisweekHK'},
    {name: 'This week honor', key: 'thisweekHonor'},
    {name: 'Lifetime HKs', key: 'lifetimeHK'},
  ];

  let servers = Object.keys(SERVERS).map((i) => {
    return {
      id: i,
      name: SERVERS[i].name,
      type: SERVERS[i].faction
    }
  });

  const factions = [
    {id: 1, name: "Alliance"},
    {id: 2, name: "Horde"}
  ]

  const searchItems = {
    'orderBy': {name: 'Last week standing', key: 'lastweekStanding'},
    'faction': {id: 1, name: "Alliance"},
    'server': {id: 9, name: 'Gehennas'}
  }

  let showLoadMore = false;
  let initialOffset = 0;
  let dataLength = 0;
  let honorData = [];

  const get = async (offset, join, oldData) => {
    getLocalStorage()
    const container = document.querySelector('.content.honor');
    if (container) {
      console.log(container.clientHeight)
      scrollTo({
        y: container.clientHeight - 50
      })
    }
    let {data} = await axiosPost({
      url: '/honor',
      body: {
      serverId: searchItems.server.id,
      offset,
      faction: searchItems.faction.id,
      orderBy: searchItems.orderBy.key
      }
    });
    showLoadMore = data.length >= 50;
    dataLength = data.length;
      if (join) {
        data = oldData.concat(data)
        honorData = data
      } else {
        honorData = data
      }
    if (data) {

      return data.map(i => {
        return {
          ...i,
          lastSeen: formatDate(i.lastSeen),
          lifetimeRank: i.lifetimeRank || 0,
          lifetimeHK: i.lifetimeHK || 0,
          characterSrc: `assets/character/${i.raceId}_${i.genderId}.jpg`,
          classSrc: `assets/class/${i.classId}.jpg`,
          rankSrc: i.rankNumber > 0 && i.rankNumber < 14 ? `assets/rank/${i.faction}_${i.rankNumber}` : null
        }
      })
    } else {
      throw new Error('text');
    }
  }

  const fetchMore = async () => {
    if(dataLength > 0) {
      initialOffset = initialOffset + 50;
      promise = get(initialOffset, true, honorData)
    }
  };

  const getLocalStorage = () => {
    for(const item of Object.keys(searchItems)) {
      const value = localStorage.getItem(item)
      if (value) {
        searchItems[item] = JSON.parse(value);
      }
    }
  }

  const factionClick = async ({detail}) => {
    searchItems.faction = detail;
    setLocalStorage('faction', detail)
    initialOffset = 0
    promise = get(initialOffset)
  }

  const serverClick = async ({detail}) => {
    searchItems.server = detail
    setLocalStorage('server', detail)
    initialOffset = 0
    promise = get(initialOffset)
  }

  const orderByClick = async ({detail}) => {
    searchItems.orderBy = detail;
    setLocalStorage('orderBy', detail)
    initialOffset = 0
    promise = get(initialOffset)
  }

  const setLocalStorage = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
  }

  const rowClick = ({detail}) => {
    window.open(`${FRONTEND_URL}/#/players/${detail.id}`)
  }

  let promise = get(initialOffset)

</script>


{#await promise}
<Loading/>
{:then data}
<div class="content honor">
<h1>Honor</h1>
<div class="dropdowns">
  <div class="dropdown factions">
  <Dropdown items={factions} name={searchItems.faction.name} on:click={factionClick}/>
  </div>
  <div class="dropdown servers">
  <Dropdown items={servers} name={searchItems.server.name} on:click={serverClick}/>
  </div>
<div class="dropdown orderBys">
  <Dropdown items={orderBys} name={searchItems.orderBy.name} on:click={orderByClick}/>
  </div>
</div>
  <div class="alliance">
    <div class="table">
    <Table items={data} {columns} on:click={rowClick} showLoadMore={showLoadMore} on:load-more={fetchMore}/>
    </div>
  </div>
</div>
{:catch}
  Error
{/await}



<style lang="stylus">

  .content
    width: calc(100% - 300px)
    margin: 0 auto

  .alliance
    grid-row: 1

  .horde
    grid-row: 2

  .dropdown

    &:not(:first-child)
      margin-left: 15px

    &.servers
      width: 200px

    &.factions
      width: 150px

    &.orderBys
      width: 250px

  .dropdowns
    display: flex
    margin-bottom: 20px

  .h1
    display: flex

  h1:not(:first-child)
    margin-left: 15px

</style>
