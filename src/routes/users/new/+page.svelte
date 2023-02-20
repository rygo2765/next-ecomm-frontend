<script>
  import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';

</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<h1 class="text-center text-xl mt-5">Sign Up</h1>

<div class="flex justify-center items-center mt-8">
  <form class="w-3/4 sm:w-1/3">

    <!--Name input-->
    <div class="form-control w-full">
      <label class="label" for="name">
				<span class="label-text">Name</span>
			</label>
			<input
				type="text"
				name="Name"
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
    
  </form>
</div>