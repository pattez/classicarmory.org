<script>
  import search from "@/assets/icons/search.svg";

  const icons = {
    search
  };
  export let type = "";
</script>

<style lang="stylus">
  @require 'styles/empty';
</style>

{@html icons[type]}
