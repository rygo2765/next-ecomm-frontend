<script>
  import Button from "../../components/Button.svelte";
  import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
  

  let isFormSubmitting = false;

  async function loginUser(evt){
    evt.preventDefault();

    isFormSubmitting = true;

    const userData = {
      email: evt.target['email'].value,
      password: evt.target['password'].value
    };

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/signin',{
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (resp.status == 200){
      console.log('success!')
    } else{
      console.log('failed!')
    }
  }

</script>

<svelte:head>
  <title>Sign In | NEXT</title>
</svelte:head>

<h1 class="text-center text-xl mt-5">Sign in</h1>
<div class="flex justify-center items-center mt-8">
  <form on:submit={loginUser} class="w-2/3 sm:w-1/3">

    <!--Email Input-->
    <div class="form-control w-full">
      <label class="label" for="email">
        <span class="label-text">Email</span>
      </label>
      <input type="text" name="email" placeholder="johndoe@example.com"
      class="input input-bordered w-full">
    </div>

    <!--Password Input-->
    <div class="form-control w-full">
      <label class="label" for="password">
        <span class="label-text">Password</span>
      </label>
      <input type="text" name="password" placeholder="" class="input input-bordered w-full"
      required/>

    <!--Sign In Button-->
    <div class="form-control w-full mt-4">
      <Button standard="Log In" loading="Logging In" clicked={isFormSubmitting} />

    </div>
    </div>
  </form>
</div>