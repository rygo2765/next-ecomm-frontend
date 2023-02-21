<script>
  import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
  import Button from '../../../components/Button.svelte';

	// let formErrors = {};
  let isFormSubmitting = false;

	async function createUser(evt){
		evt.preventDefault();
		
		// if (evt.target['password'].value != evt.target['password-confirmation'].value) {
		// 	formErrors['password'] = {message: 'Password confirmation does not match'};
		// 	return;
		// }
    
		isFormSubmitting = true;

		const userData = {
			name: evt.target['username'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value
		}

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		if (resp.status == 200){
			console.log(resp.body)
		}

	}
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<h1 class="text-center text-xl mt-5">Sign Up</h1>

<div class="flex justify-center items-center mt-8">
  <form on:submit={createUser} class="w-3/4 sm:w-1/3">

    <!--Name input-->
    <div class="form-control w-full">
      <label class="label" for="username">
				<span class="label-text">Name</span>
			</label>
			<input
				type="text"
				name="username"
				placeholder="johndoe"
				class="input input-bordered w-full"
			/>
    </div>

		<!-- Email input -->
		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				type="text"
				name="email"
				placeholder="john@example.com"
				class="input input-bordered w-full"
				required
			/>
		</div>

		<!--Password Input-->
		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder=""
				class="input input-bordered w-full"
				required
			/>
		</div>

    <!--Password Confirmation Input-->
		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Confirm Password</span>
			</label>
			<input
				type="password"
				name="password-confirmation"
				placeholder=""
				class="input input-bordered w-full"
				required
			/>
		</div>

    <!--Create Account Button-->
		<div class="form-control w-full mt-4">
			<Button standard="Create an Account" loading="Creating Account" clicked={isFormSubmitting} />
		</div>
  </form>
</div>