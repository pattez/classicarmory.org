<script>
  import { onMount } from 'svelte';
  export let placeholder;
  export let value;
  export let error;
</script>

<input class="input{error ? ' error' : ''}" type="text" bind:value={value}  placeholder={placeholder || 'search'} autofocus/>


<style lang="stylus">
    .input
      width: 100%
      height: 100%
      background-color: transparent
      text-align: center
      border-color: #66fcf1
      outline: 0

      &:focus
        box-shadow: none

      &.error
        border-color: red



</style>
