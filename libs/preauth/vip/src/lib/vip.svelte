<script lang="ts">
	import BecomeVIPIMG from '$lib/assets/becomeVIP.svg';
	import Events from '$lib/parts/events.svelte';
	import Features from '$lib/parts/features.svelte';
	import ProvidersMarquee from '$lib/parts/providersMarquee.svelte';
	import SectionTitle from '$lib/parts/sectionTitle.svelte';
	import Testimonials from '$lib/parts/testimonials.svelte';
	import TopBanner from '$lib/parts/topBanner.svelte';

	const isFramed = window.self !== window.top;

	const close = (event: Event): void => {
		event?.preventDefault();
		window.parent.postMessage({ showModal: false }, '*');
	};
</script>

<div class="container">
	<section class="banner">
		<div class="banner-content">
			<h1 class="banner-title">
				Spend a Buck, <br class="break-one" /> Make <br class="break-two" /> a Dime: Welcome to
				<br />
				The
				<span class="text-green-600">VIP Club</span>
			</h1>
			<p class="banner-text">
				Casinos have always been a gambler's delight, but for some, hitting that sweet spot isn't
				always a guarantee. Flush VIP ensures the flavour never fades, the fun never stops, and even
				when you play a losing bet - you still win. Grab a chair, pick your game, and work your way
				up the VIP rankings to maximise your gaming experience.
			</p>
		</div>
		<div class="banner-image">
			<TopBanner />
		</div>
	</section>

	<section class="features">
		<SectionTitle title="VIP Features" iconName="star" />
		<Features />
	</section>

	<section class="events">
		<SectionTitle title="VIP Events" iconName="events" />
		<Events />
	</section>

	<section class="testimonials">
		<SectionTitle title="VIP Testimonials" iconName="testimonials" />
		<Testimonials />
	</section>

	<section class="become-vip">
		<div class="become-vip-content">
			<div class="become-vip-text">
				<h2 class="become-vip-title">
					How to <br /> become a <span class="text-green-600"> VIP?</span>
				</h2>
				<p class="mb-4">
					To play your way through the Flush VIP rankings - and to learn more - sign up today by
					clicking the button below and start working your way towards VIP free spins, cashback, and
					exclusive VIP events!
				</p>
				<button class="signup-button"> SIGN UP </button>
			</div>
			<div class="become-vip-img">
				<img src={BecomeVIPIMG} alt="" />
			</div>
		</div>
	</section>

	<ProvidersMarquee />
</div>

<style lang="postcss">
	.container {
		@apply mx-auto px-4 bg-primary-900 mt-5 max-w-5xl;
	}
	section.banner {
		@apply relative;
	}
	.banner-title {
		@apply text-4xl font-bold mb-4;
	}
	.banner-content {
		@apply top-[20%] w-full text-white z-10;
	}
	.banner-text {
		@apply text-xs font-normal opacity-80 leading-6;
	}
	.break-one {
		@apply hidden;
	}
	.break-two {
		@apply inline;
	}
	.banner-image {
		@apply mt-4;
	}
	section.features {
		@apply mt-8 text-white;
	}
	section.events {
		@apply mb-12;
	}
	section.testimonials {
		@apply mb-6;
	}
	section.become-vip {
		@apply p-6 rounded-lg mb-12 text-white relative min-h-[400px];
	}
	.become-vip-title {
		@apply text-4xl font-bold leading-10 mb-4;
	}
	.signup-button {
		@apply bg-green-600 py-2 px-4 rounded w-56 font-bold tracking-wider;
	}
	.become-vip-img {
		@apply mt-8;
	}
	@media (min-width: 640px) {
		.banner {
			@apply h-[325px];
		}
		.banner-content {
			@apply absolute w-[54vw];
		}
		.break-one {
			@apply inline;
		}
		.break-two {
			@apply hidden;
		}
		.banner-image {
			@apply absolute right-0 mt-0;
		}
		section.testimonials {
			@apply mb-12;
		}
		.become-vip-content {
			@apply mt-11;
		}
		.become-vip-text {
			@apply w-[22rem];
		}
	}
	@media (min-width: 768px) {
		.banner-content {
			@apply absolute w-[48vw];
		}
	}
	@media (min-width: 1024px) {
		.banner-content {
			@apply absolute w-[35vw];
		}
		.become-vip-img {
			@apply absolute right-0 top-0 mt-0;
		}
	}
	@media (min-width: 1240px) {
		.banner-content {
			@apply absolute w-[35vw];
		}
	}
	@media (min-width: 1450px) {
		.banner-content {
			@apply absolute w-[27vw];
		}
	}
</style>
