<script>
import Upload from "../components/Upload.svelte";
import {isLoggedIn} from "../utils/auth.js";
</script>

{#if $isLoggedIn}
<div class="flex justify-end">
    <Upload/>
</div>
{/if}

