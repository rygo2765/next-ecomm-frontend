<script>
import Upload from "../components/Upload.svelte";
import {isLoggedIn} from "../utils/auth.js";
import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public'
export let data

async function checkoutItem(id){
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/payment/${id}`, {
        method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({id})
    })

    if (resp.ok){
        const {url} = await resp.json();
        window.location = url
    }
}
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
            <button class="btn btn-primary" on:click={() => checkoutItem(image.id)}>Buy Now</button>
            </div>
        </div>
        </div>
    {/each}
</div>




