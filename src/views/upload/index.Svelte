<script>
  import Button from '@/components/Button.svelte';
  import Search from '@/components/Search.svelte';
  import {axiosPost} from '@/lib/axios';
  import {ADDON_URL} from '@/globals'
  import { onMount } from 'svelte';
  const text = "upload"
  let input = "";
  let password = ""
  let status = "";
  const placeholderPassword = "Password"
  const placeholder = "Paste copied text from addon here"

  const upload = async () => {
    const lua = input.split("z27e8");
    if (input !== "" && Array.isArray(lua)) {
      try {
        const {data} = await axiosPost({url: '/upload', body: {
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


</script>


<div class="content">
<h1>Upload</h1>
  <div class="info">
    <span>
      If you wish to upload, download the addon <a href={ADDON_URL}>{ADDON_URL}</a>
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

  .textarea
    background-color: $primary-1
    border-color: $primary-4
    color: white
    width: 100%
    height: 300px
</style>
