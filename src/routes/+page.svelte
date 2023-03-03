<script>
import Upload from "../components/Upload.svelte";
import {isLoggedIn} from "../utils/auth.js";
export let data
</script>

{#if $isLoggedIn}
<div class="flex justify-end">
    <Upload/>
</div>
{/if}

<div class="flex flex-wrap basis-1/3 flex-none justify-center mt-10">
    {#each data.images as image}
    <div class="card card-compact w-96 bg-base-100 shadow-xl mx-2">
        <figure><img src={image.url} alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">{image.title}</h2>
            <p>{image.description}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        </div>
    {/each}
</div>




