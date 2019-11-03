<script>
	import Router from 'svelte-spa-router';
  import Header from '@/components/Header.svelte';
	import routes from '@/routes';
</script>
<Header/>
<div class="content">
<Router {routes}/>
</div>
<style lang="stylus">
	.content
		width: calc(100% - 60px)
		height: calc(100% - 130px)
		margin: 0 auto
</style>
