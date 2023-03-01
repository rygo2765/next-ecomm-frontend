<script>
  import { uploadMedia } from '../../utils/s3-uploader.js';
  import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';

  async function uploadImage(evt) {
    evt.preventDefault();

    const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
    // code to make POST request to your backend

    const { token } = (() => {
       const token = localStorage.getItem('auth');
       return JSON.parse(token);
      })();

    console.log(token);

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
    } else {
      console.log("fail")
    }

  }
</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>


<form on:submit|preventDefault={uploadImage} class="w-1/3">

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
      placeholder=""
      class="input input-bordered w-full"
      required
    />
  </div>

  <!--Description Input-->
  <div class="form-control w-full">
    <label class="label" for="description">
      <span class="label-text">Description</span>
    </label>
    <input
      type="text"
      name="description"
      placeholder=""
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
        type="number"
        name="price"
        placeholder=""
        class="input input-bordered w-full"
        required
      />
  </div>

  <div class="form-control w-full mt-4">
    <button class="btn btn-md">Upload</button>
  </div>
</form>