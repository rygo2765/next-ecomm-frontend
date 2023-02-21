<script>
  import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
  import Button from '../../../components/Button.svelte';
	import {goto} from '$app/navigation';

	let formErrors = {};
  let isFormSubmitting = false;

	async function postSignUp(){
		goto('/');
	}

	async function createUser(evt){
		evt.preventDefault();
		
		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] = 'Password confirmation does not match';
			return;
		}
    
		isFormSubmitting = true;

		const userData = {
			name: evt.target['name'].value,
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
			postSignUp();
		} else {
			const res = await resp.json();
			formErrors = res.error;
			isFormSubmitting = false;
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
      <label class="label" for="name">
				<span class="label-text">Name</span>
			</label>
			<input
				type="text"
				name="name"
				placeholder="johndoe"
				class="input input-bordered w-full"
			/>
			{#if 'name' in formErrors}
			  <label class="label" for="name">
					<span class="label-text-alt text-red-500">{formErrors['name']}</span>
				</label>
			{/if}
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
			<input
				type="password"
				name="password"
				placeholder=""
				class="input input-bordered w-full"
				required
			/>
			{#if 'password' in formErrors}
			  <label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password']}</span>
				</label>
			{/if}
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
			{#if 'password' in formErrors}
			  <label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password']}</span>
				</label>
			{/if}
		</div>

    <!--Create Account Button-->
		<div class="form-control w-full mt-4">
			<Button standard="Create an Account" loading="Creating Account" clicked={isFormSubmitting} />
		</div>
  </form>
</div>