<script lang="ts">
	import { testUserLogin } from '$lib/test/testuser';
	import { loggedIn, username } from '@infinitro/global-postauth';
	let element: HTMLSelectElement;
	let value = '';

	const onChange = async () => {
		// todo: if non-test users are contained in the list, remove them
		const userNumber = parseInt(element.value.substring(8));
		await testUserLogin(userNumber);
	};

	username.subscribe((_value) => {
		value = _value;
		if (element) element.value = _value;
		// todo: if user is not contained in the list, add it
	});

	loggedIn.subscribe(async (loggedIn) => {
		if (!loggedIn) {
			await testUserLogin(1);
		}
	});
</script>

<span class="section">
	<span class="input">
		<select
			name="testuser"
			id="testuser"
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			{value}
		>
			<option value="testuser1">testuser1</option>
			<option value="testuser2">testuser2</option>
			<option value="testuser3">testuser3</option>
			<option value="testuser4">testuser4</option>
			<option value="testuser5">testuser5</option>
		</select>
	</span>
</span>

<style lang="postcss">
	.section {
		@apply flex;
	}
	span.input {
		@apply relative;
	}
	select,
	select:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5;
	}
	select:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5;
	}
</style>
