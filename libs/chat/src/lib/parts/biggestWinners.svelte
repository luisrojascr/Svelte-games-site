<script lang="ts">
	import { UserCircleSolid } from 'flowbite-svelte-icons';
</script>

<div class="bg-gray-800 p-4 rounded-lg w-64 text-white">
	<div class="flex items-center justify-between mb-2">
		<div class="flex items-center">
			<UserCircleSolid
				class="w-3 h-3 ml-2 text-white dark:text-white focus:ring-0 dark:focus-within:ring-0"
			/>
			<span class="font-semibold"> Winner1 </span>
		</div>
		<span class="text-green-400 font-semibold"> $1,172,850.60 </span>
	</div>
	<div class="flex items-center justify-between mb-2">
		<div class="flex items-center">
			<UserCircleSolid
				class="w-3 h-3 ml-2 text-white dark:text-white focus:ring-0 dark:focus-within:ring-0"
			/>
			<span class="font-semibold"> Winner2 </span>
		</div>
		<span class="text-green-400 font-semibold"> $130,072.51 </span>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<UserCircleSolid
				class="w-3 h-3 ml-2 text-white dark:text-white focus:ring-0 dark:focus-within:ring-0"
			/>
			<span class="font-semibold"> Winner3 </span>
		</div>
		<span class="text-green-400 font-semibold"> $50,282.47 </span>
	</div>
</div>
