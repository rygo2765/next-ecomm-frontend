<script>
  import "../app.css";
  import Alerts from "../components/Alerts.svelte";
  import {isLoggedIn, logOut} from '../utils/auth.js'
  import {goto} from '$app/navigation'

  function signOut(){
    logOut()
    goto('/')
  }
</script>

<header class="flex flex-row justify-between bg-primary text-white p-2">
  <a href="/" class="btn btn-ghost text-xl">P2P EComm Full Stack </a>
  <div class="flex justify-evenly">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/users/new" class="btn btn-ghost">Sign Up</a></li>
    </ul>
    {#if $isLoggedIn}
    <ul class="menu menu-horizontal px-1">
      <li><button class="btn btn-ghost" on:click={signOut}>Sign out</button></li>
    </ul>
    {:else}
     <ul class="menu menu-horizontal px-1">
      <li><a href="/signin" class="btn btn-ghost">Sign In</a></li>
    </ul>
    {/if}
  </div>
</header>

<div class="mt-4">
  <Alerts/>
</div>


<slot />