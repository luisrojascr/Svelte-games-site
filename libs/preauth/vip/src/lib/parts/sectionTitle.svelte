<script lang="ts">
	import EventsIcon from '$lib/assets/eventsIcon.svg';
	import StarIcon from '$lib/assets/starIcon.svg';
	import TestimonialsIcon from '$lib/assets/testimonialsIcon.svg';

	export let iconName: string;
	export let title: string;

	let icon: string;
	switch (iconName) {
		case 'star':
			icon = StarIcon;
			break;
		case 'events':
			icon = EventsIcon;
			break;
		case 'testimonials':
			icon = TestimonialsIcon;
			break;
	}
</script>

<div class="section-title">
	{#if icon}
		<img src={icon} alt="icon" loading="lazy" />
	{/if}

	<h2 class="lead-title">{title}</h2>
</div>

<style lang="postcss">
	.section-title {
		@apply border-b border-b-gray-600 pb-3 flex items-center;
	}
	.lead-title {
		@apply text-xl leading-5 font-bold text-white ml-2;
	}
</style>
