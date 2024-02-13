<script lang="ts">
	export let testimonial: string;
	export let name: string;
</script>

<div class="testimonial-container">
	<p class="testimonial-message">
		{testimonial}
	</p>
	<p class="testimonial-name">{name}</p>
	<a class="testimonial-link" href="/"> Show more </a>
</div>

<style lang="postcss">
	.testimonial-container {
		@apply flex flex-col bg-gray-700 rounded-md mb-4 p-3 mx-3;
	}
	.testimonial-message {
		@apply pt-2 pb-2 text-xs font-normal opacity-80 mb-5 leading-5 min-h-[220px];
	}
	.testimonial-name {
		@apply font-bold text-xs pt-4 pb-2;
	}
	.testimonial-link {
		@apply text-green-600 text-sm font-bold underline uppercase py-2;
	}
</style>
