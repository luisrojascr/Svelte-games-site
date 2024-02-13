<script lang="ts">
	import NoobImg from '$lib/assets/noob.svg';
	import { Progressbar } from 'flowbite-svelte';
</script>

<section class="rank">
	<div class="rank-content">
		<div class="rank-image-content">
			<img alt="Noob" src={NoobImg} />
		</div>
		<div class="rank-current-content">
			<div class="rank-current-points">
				<h4 class="rank-points">CURRENT RANK</h4>
				<span class="rank-current-value"> Plankton </span>
			</div>
			<div class="rank-current-points">
				<h4 class="rank-points">TOTAL POINTS</h4>
				<span class="rank-current-value"> 3,000 </span>
			</div>
		</div>
		<div class="next-rank-content">
			<div class="next-rank-data">
				<div class="rank-title-content">
					<h4 class="rank-title">
						0
						<span class="opacity-t">/ 100000</span>
					</h4>
				</div>
				<div class="next-rank-title-content">
					<h4 class="rank-title">
						NEXT RANK:
						<span class="blue-text">SILVER</span>
					</h4>
				</div>
			</div>
			<div class="rank-progress-container">
				<span class="rank-progress-current">0</span>

				<Progressbar progress="50" size="h-1.5" />
				<span class="rank-progress-next">1</span>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	section.rank {
		@apply rounded-lg p-4 mb-6 bg-cover bg-center; /*bg-[url('lib/assets/headerBack.svg')] */
	}
	.rank-content {
		@apply grid grid-cols-mobile bg-gray-700 justify-items-center rounded-lg;
	}
	.rank-image-content {
		@apply w-full p-3 h-[134px] border-r-2 border-gray-600 col-span-2;
	}
	.rank-image-content img {
		@apply w-full h-full mt-3;
	}
	.rank-current-content {
		@apply flex w-full col-span-2 mt-3;
	}
	.rank-current-points {
		@apply flex flex-col items-center justify-center border-r-2 border-gray-600 h-[131px] w-full;
	}
	.rank-points {
		@apply text-xs text-gray-400 opacity-60;
	}
	.rank-current-value {
		@apply text-base font-semibold;
	}
	.next-rank-content {
		@apply flex flex-col w-full h-[131px] col-span-2;
	}
	.next-rank-data {
		@apply flex justify-between h-[15px] w-[81%] ml-auto mr-auto;
	}
	.rank-title-content {
		@apply mt-6 font-normal text-xs;
	}
	.rank-title {
		@apply text-xs font-medium;
	}
	.opacity-t {
		@apply opacity-60;
	}
	.next-rank-title-content {
		@apply mt-6 ml-6 font-normal text-xs;
	}
	.blue-text {
		@apply text-blue-500;
	}
	.rank-progress-container {
		@apply flex flex-row justify-center mt-12 ml-auto mr-auto w-[80%] items-center;
	}
	.rank-progress-current {
		@apply flex justify-center items-center w-5 h-5 bg-green-600 rounded font-bold text-xs text-center;
	}
	.rank-progress-next {
		@apply flex justify-center items-center w-5 h-5 bg-gray-500 rounded font-bold text-xs text-center;
	}
	@media (min-width: 768px) {
		.rank-content {
			@apply grid-cols-custom;
		}
		.rank-image-content img {
			@apply mt-0;
		}
		.rank-image-content,
		.rank-current-content,
		.next-rank-content {
			@apply col-span-1;
		}
	}
	:global(.rank-progress-container div:first-child) {
		@apply w-full bg-gray-200 rounded-full h-1.5;
	}
	:global(.rank-progress-container div:first-child div) {
		@apply bg-primary-600 h-1.5 rounded-full;
	}
</style>
