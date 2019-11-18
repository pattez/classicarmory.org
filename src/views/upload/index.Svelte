<script>
  import Button from '@/components/Button.svelte';
  import Search from '@/components/Search.svelte';
  import {axiosPost} from '@/lib/axios';
  import {ADDON_URL, FRONTEND_URL} from '@/globals'
  import { onMount } from 'svelte';
  const text = "upload"
  let input = "";
  let password = ""
  let status = "";
  const placeholderPassword = "Password"
  const placeholder = "Paste copied text from addon here"

  const upload = async () => {
    try {
      const {data} = await axiosPost({url: '/upload', body: {
        lua: input
      }})
      status = data
      input = ""
    }
     catch (e) {
      status = "Too many requests from this IP. Try again in 15 minutes."
    }
  };

  $: {
    if (input !== "") {
      input = btoa(input)
    }
  }


</script>


<div class="content">
<h1>Upload</h1>
  <div class="info">
    <span>
      If you wish to upload, download the addon <a href={ADDON_URL}>{ADDON_URL}</a>
    </span>
  </div>
  <div class="info">
  <span>
    <a href={ADDON_URL}>pattez_armory</a> saves data to savedVariables on target.
  </span>
  </div>
    <div class="info">
  <span>
    type /pa or /paexport to export - This will open a small editbox window with a bunch of text already highlighted, press ctrl + c and then enter. Upload by pasting in the copied text at <a href={FRONTEND_URL}>{`${FRONTEND_URL}/#/upload`}</a>
  </span>
  </div>
      <div class="info">
  <span>
    Updates the player data whenever you inspect someone you've inspected already. Which means that when you upload, you will only upload what that character was wearing at the time you inspected that player
  </span>
  </div>
      <div class="info">
  <span>
   Sometime it may take a few seconds for the server to throttle the character information.
  </span>
  </div>
      <div class="info">
  <span>
   Currently inspecting manually (right clicking a target frame and clicking inspect) may take sometimes (1-5 seconds)
  </span>
  </div>
  <div class="data">
    <textarea {placeholder} bind:value={input} class="textarea"/>
  </div>
  <div class="button">
    <Button {text} on:click={upload}/>
  </div>
  {status}
</div>

<style lang="stylus">
  @require 'styles/colors'
  .content
    width: calc(100% - 450px)
    margin: 0 auto

  .data, .password
    margin-top: 10px

  .info
    font-weight: 500
    margin-bottom: 5px

  a
    color: $primary-4

  .button
    width: 200px
    margin-top: 10px

  .textarea
    background-color: $primary-1
    border-color: $primary-4
    color: white
    width: 100%
    height: 150px
    margin-top: 15px
</style>
