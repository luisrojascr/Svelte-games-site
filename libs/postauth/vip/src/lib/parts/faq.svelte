<script lang="ts">
	import FaqArrow from '$lib/assets/faqArrow.svg';

	let faqs = [
		{
			id: 1,
			question: 'How does VIP scoring work?',
			answer:
				'Players earn 10 points for every $1 of real money wagered across all games that do not appear on the exclusion list. The maximum number of points earned per wager is 1,000 and points last a lifetime so you have plenty of time to become a Blue Whale!',
			isOpen: false
		},
		{
			id: 2,
			question: 'How does VIP cashback work?',
			answer:
				'Flush VIP Cashback is a partial refund on real money wagers that do not generate winnings for VIPs at Plankton level and above. The minimum wager to accumulate Cashback is $0.10 and the maximum wager to accumulate Cashback is $100.',
			isOpen: false
		},
		{
			id: 3,
			question: 'How do Free Spins work',
			answer:
				'Once you reach a qualifying VIP Level or Milestone you will have the choice of up to four Slot machines to indulge in free spins on the house. Free spins can be claimed immediately and you have up to 10 days to use the reward - good luck!',
			isOpen: false
		}
	];

	function toggleFAQ(faqId: number) {
		faqs = faqs.map((faq) => (faq.id === faqId ? { ...faq, isOpen: !faq.isOpen } : faq));
	}
</script>

<section class="faq">
	<h2 class="title">FAQ</h2>
	<div>
		{#each faqs as faq (faq.id)}
			<div
				class="faq-item"
				role="button"
				tabindex="0"
				on:click={() => toggleFAQ(faq.id)}
				on:keydown={(event) => {
					if (['Enter', ' '].includes(event.key)) toggleFAQ(faq.id);
				}}
			>
				<span class="faq-question">{faq.question}</span>
				<img class={`${faq.isOpen ? 'open-item' : 'closed-item'} `} src={FaqArrow} alt="Arrow" />
			</div>
			{#if faq.isOpen}
				<div class="faq-answer-container">
					<div class="faq-answer">
						{faq.answer}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</section>

<style lang="postcss">
	section.faq {
		@apply mt-10;
	}
	section.faq .title {
		@apply text-lg font-semibold mb-4;
	}
	.faq-item {
		@apply flex bg-gray-700 px-4 py-2 rounded-xl p-5 mb-3 h-16 cursor-pointer items-center justify-between;
	}
	.faq-item img {
		@apply transition-transform duration-500 ease-linear;
	}
	.faq-item img.open-item {
		@apply rotate-180;
	}
	.faq-item img.closed-item {
		@apply rotate-0;
	}
	.faq-question {
		@apply text-sm font-medium ml-6;
	}
	.faq-answer-container {
		@apply overflow-hidden transition-max-height max-h-[1200px];
	}
	.faq-answer {
		@apply w-full opacity-70 text-xs font-light mb-4 mt-1;
	}
</style>
