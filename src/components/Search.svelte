<script>
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  export let placeholder;
  export let value;
  export let error;
  export let autofocus = true;
</script>

<input class="input{error ? ' error' : ''}" type="text" bind:value={value}  placeholder={placeholder || 'search'} autofocus={autofocus} on:focus={() => dispatch('focus', 'focus')}
  on:focusout={() => dispatch('focusout', 'focusout')}/>


<style type="text/stylus">
    .input
      width: 100%
      height: 100%
      background-color: transparent
      text-align: center
      border-color: #66fcf1
      outline: 0
      padding: 8px

      &:focus
        box-shadow: none

      &.error
        border-color: red



</style>
