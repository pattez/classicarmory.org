<script>
  import Router from "svelte-spa-router";
  import Header from "@/components/Header.svelte";
  import Disclaimer from "@/components/Disclaimer.svelte";
  import routes from "@/routes";

  const disclaimer = localStorage.getItem("disclaimer");
  let showDisclaimer = false;
  if (disclaimer === null) {
    showDisclaimer = true;
  }

  const clickedAwayDisclaimer = () => {
    localStorage.setItem("disclaimer", false);
    showDisclaimer = false;
  };
</script>

<style lang="stylus">
  @require 'styles/empty'
	.content
		width: calc(100% - 60px)
		height: calc(100% - 102px)
		margin: 0 auto;
</style>

<Header />
<div class="content{showDisclaimer ? ' disclaimer' : ''}">
  <Router {routes} />
</div>
{#if showDisclaimer}
  <Disclaimer on:click={clickedAwayDisclaimer} />
{/if}
