<script>
  import { uploadMedia } from '../../utils/s3-uploader.js';

  async function uploadImage(evt) {
    const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
    // code to make POST request to your backend
  }
</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<form on:submit|preventDefault={uploadImage} class="w-1/3">
  <div class="form-control w-full mt-2">
    <input type="file" name="file" />
  </div>
  <div class="form-control w-full mt-4">
    <button class="btn btn-md">Upload</button>
  </div>
</form>