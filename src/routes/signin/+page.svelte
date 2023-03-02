<script>
  import Button from "../../components/Button.svelte";
  import {authenticateUser} from '../../utils/auth.js'
  import { goto } from '$app/navigation';
  import {alerts} from '../../utils/alert.js'

  let isFormSubmitting = false;
  let loginFail = false;
  let formErrors = {};

  async function loginUser(evt){
    evt.preventDefault();

    loginFail = false;
    isFormSubmitting = true;

    const userData = {
      email: evt.target['email'].value,
      password: evt.target['password'].value
    };

    const res = await authenticateUser(userData.email,userData.password);

    if (res.success){
      alerts.clearAlert();
      goto('/') //need to change once post page is created
    } else{
      formErrors = res.res.error;
      if ('login' in formErrors){
        alerts.setAlert(formErrors['login'],'alert-error')
        setTimeout(() => {
          alerts.clearAlert();
        }, 1000);
      }
      isFormSubmitting = false;
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
      {#if 'email' in formErrors}
        <label class="label" for="email">
					<span class="label-text-alt text-red-500">{formErrors['email']}</span>
				</label>
      {/if}
    </div>

    <!--Password Input-->
    <div class="form-control w-full">
      <label class="label" for="password">
        <span class="label-text">Password</span>
      </label>
      <input type="text" name="password" placeholder="" class="input input-bordered w-full"
      required/>
      {#if 'password' in formErrors}
        <label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password']}</span>
				</label>
      {/if}
    </div>

    <!--Sign In Button-->
    <div class="form-control w-full mt-4">
      <Button standard="Log In" loading="Logging In" clicked={isFormSubmitting} />
    </div>
  </form>
</div>