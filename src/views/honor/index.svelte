<script>
  import Table from '@/components/Table.svelte';
  import Loading from '@/components/Loading.svelte';
  import {axiosPost} from '@/lib/axios';
  const columns = [
    {name: 'Name', key: 'name'},
    {name: 'Guild', key: 'guild'},
    {name: 'Guild rank', key: 'guildRank'},
    {name: 'Race', key: 'race'},
    {name: 'Gender', key: 'gender'},
    {name: 'Class', key: 'class'},
    {name: 'Last seen', key: 'lastSeen'},
    {name: 'HKs today', key: 'todayHK'},
    {name: 'Honor today', key: 'todayHonor'},
    {name: 'HKs yesterday', key: 'yesterdayHK'},
    {name: 'Honor yesterday', key: 'yesterdayHonor'},
    {name: 'Lifetime HKs', key: 'lifetimeHK'},
    {name: 'Lifetime Rank', key: 'lifetimeRank'},
    {name: 'Honor progress', key: 'honorProgress'},
    {name: 'Rank', key: 'rankNumber'},
  ];

  const get = async () => {
    const {data} = await axiosPost({
      url: '/honor',
      body: {
      serverId: 9,
      offset: 0
      }
    });
    if (data) {
      return data;
    } else {
      throw new Error('text');
    }
  }

  const promise = get();

</script>


<h1>Honor</h1>
{#await promise}
<Loading/>
{:then data}
<div class="content">
  <div class="alliance">
  <h1>Alliance</h1>
    <div class="table">
    <Table items={data} {columns}/>
    </div>
  </div>
  <div class="horde">
    <h1>Horde</h1>
  <div class="table">
    <Table items={[]} {columns}/>

  </div>
  </div>
</div>
{:catch}
  Error
{/await}



<style lang="stylus">

  .content
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: 1fr 1fr

  .alliance
    grid-row: 1

  .horde
    grid-row: 2

</style>
