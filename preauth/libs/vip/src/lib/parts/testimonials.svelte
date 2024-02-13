<script lang="ts">
	import LeftControl from '$lib/assets/leftControl.svg';
	import RightControl from '$lib/assets/rightControl.svg';
	import Carousel from '$lib/parts/carousel.svelte';
	import Testimonial from '$lib/parts/testimonial.svelte';

	let testimonials = [
		{
			name: 'Jack Doe',
			comment:
				'Been an avid player of casinos for almost two decades now and nothing has come close to Flush. Flush VIP has delivered far more than I could have ever expected and even when I lose, I win!'
		},
		{
			name: 'Chrish Osgward',
			comment:
				'I love slots and the VIP free spins perk is a great feature! The more I play, the more free spins I get as I climb the ranks!'
		},
		{
			name: 'Larry Jam',
			comment:
				'Flush has been a great alternative to physically attending casinos after my hips gave out. Why go to Vegas when I can click my mouse and bring Vegas to me. Very grateful.'
		},
		{
			name: 'Evren Kasrit',
			comment:
				"I've tried out loads of online casinos and the main problem I come across is the limited selection of games. Flush has been a breath of fresh air. With so many games to choose from, I never find myself becoming bored from repetition! Great fun and highly recommend."
		},
		{
			name: 'Fake Name',
			comment:
				"I've tried out loads of online casinos and the main problem I come across is the limited selection of games. Why go to Vegas when I can click my mouse and bring Vegas to me. Very grateful."
		}
	];
</script>

<!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 text-white"></div> -->
<div class="testimonials-container">
	<Carousel perPage={window.innerWidth < 640 ? 2 : 4}>
		{#each testimonials as testimonial, index (index)}
			<Testimonial name={testimonial.name} testimonial={testimonial.comment} />
		{/each}
		<span class="left-control" slot="left-control">
			<img src={LeftControl} alt="Left control icon" loading="lazy" />
		</span>
		<span class="right-control" slot="right-control"
			><img src={RightControl} alt="Right control icon" loading="lazy" /></span
		>
	</Carousel>
</div>

<style lang="postcss">
	.testimonials-container {
		@apply relative text-white w-full mt-5;
	}
	.left-control {
		@apply absolute left-[-42px];
	}
	.right-control {
		@apply absolute right-[-42px];
	}
</style>
