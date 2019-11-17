<script>
  import Button from '@/components/Button.svelte';
  import Search from '@/components/Search.svelte';
  import {axiosPost} from '@/lib/axios';
  import {DISCORD_URL, ADDON_URL} from '@/globals'
  import { onMount } from 'svelte';
  const text = "upload"
  let input = "";
  let password = ""
  let status = "";
  const placeholderPassword = "Password"
  const placeholder = "Paste copied text from addon here"

  const upload = async () => {
    const p = localStorage.getItem("password")
    const lua = input.split("z27e8");
    if (p !== '' && input !== "" && Array.isArray(lua)) {
      try {
        const {data} = await axiosPost({url: '/upload', body: {
          authorization: p,
          lua
        }})
      if (data === "Done") {
        status = "Successful upload"
        input = ""
      }
      } catch (e) {
        status = "Too many requests from this IP. Try again in 15 minutes."
      }
    }
  };

  $: {
    if(password !== "") {
      localStorage.setItem("password", password)
    }
  }

  onMount(() => {
    const p = localStorage.getItem("password")
    password = p;
  })
</script>


<div class="content">
<h1>Upload</h1>
  <div class="info">
    <span>
      If you wish to upload, download the addon <a href={ADDON_URL}>{ADDON_URL}</a> and join the discord: <a href={DISCORD_URL}>{DISCORD_URL}</a> and ask pattez for a password.
    </span>
  </div>
  <div class="data">
  <Search {placeholder} bind:value={input}/>
  </div>
  <div class="password">
  <Search placeholder={placeholderPassword} bind:value={password}/>
  </div>
  <div class="button">
    <Button {text} on:click={upload}/>
  </div>
  {status}
</div>

<style lang="stylus">
  @require 'styles/colors'
  .content
    width: calc(100% - 500px)
    margin: 0 auto

  .data, .password
    margin-top: 10px

  .info
    font-weight: 500
    margin-bottom: 30px

  a
    color: $primary-4

  .button
    width: 200px
    margin-top: 10px
</style>
