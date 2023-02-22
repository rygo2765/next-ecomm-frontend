<script>
  import "../app.css";
  import Alerts from "../components/Alerts.svelte";
</script>

<header class="flex flex-row justify-between bg-primary text-white p-2">
  <a href="/" class="btn btn-ghost text-xl">P2P EComm Full Stack </a>
  <div class="flex justify-evenly">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/users/new" class="btn btn-ghost">Sign Up</a></li>
    </ul>
    <ul class="menu menu-horizontal px-1">
      <li><a href="/signin" class="btn btn-ghost">Sign In</a></li>
    </ul>
  </div>
</header>

<div class="mt-4">
  <Alerts/>
</div>


<slot />