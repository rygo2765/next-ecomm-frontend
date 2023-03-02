<script>
  import { uploadMedia } from '../utils/s3-uploader.js';
  import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
  import Button from './Button.svelte';

  let isImageUploading = false;
  let uploadSuccess = false;

  async function uploadImage(evt) {
    evt.preventDefault();

    isImageUploading = true;

    const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);

    const { token } = (() => {
       const token = localStorage.getItem('auth');
       return JSON.parse(token);
      })();

    const imageData = { 
      title: evt.target['title'].value,
      description: evt.target['description'].value,
      price: evt.target['price'].value,
      url: fileUrl
    }

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(imageData)
    })

    if (resp.status == 200){
      console.log("success")
      uploadSuccess = true
      setTimeout(()=>{
        uploadSuccess = false
      }, 3000);
    } else {
      console.log("fail")
    }

    isImageUploading = false;
  }
</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<label for="my-modal-4" class="btn bg-white text-black border-none hover:bg-gray-200">
  <svg class="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg> Upload Image
</label>

<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative" for="">

    {#if uploadSuccess}
     <h3 class="text-lg items-center font-bold">Sucessfully Uploaded!</h3>
    {:else}
      <form on:submit|preventDefault={uploadImage} class="w-full">
        <!--Image upload-->
        <div class="form-control w-full mt-2">
          <input type="file" name="file" />
        </div>
        
        <!--Title Input-->
        <div class="form-control w-full">
          <label class="label" for="title">
            <span class="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Penguin"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!--Price Input-->
        <div class="form-control w-full">
            <label class="label" for="price">
              <span class="label-text">Price</span>
            </label>
            <input
              type="text"
              name="price"
              placeholder="1.23"
              pattern="[0-9]+([\.][0-9]+)?"
              class="input input-bordered w-full"
              required
            />
        </div>

        <!--Description Input-->
        <div class="form-control w-full">
          <label class="label" for="description">
            <span class="label-text">Description</span>
          </label>
          <textarea 
          name="description" 
          class="textarea textarea-bordered w-full"
          placeholder="Penguins having fun" />
        </div>

        
        <div class="form-control w-full mt-4">
          <Button standard="Upload Image" loading="Uploading Image" clicked={isImageUploading} />
        </div>
      </form>
    {/if}
  </label>
</label>

