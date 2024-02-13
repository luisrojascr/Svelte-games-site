<script lang="ts">
	import Arrow from '$lib/assets/arrow.svg';
	import Lock from '$lib/assets/lock.svg';
	import Right from '$lib/assets/right.svg';
	import 'swiper/css';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import SwiperLevelRank from './swiperLevelRank.svelte';

	type milestone = {
		name: string;
		point: number;
		isMilestone: boolean;
		rakebackWagePercent: number;
		bonus: number;
		freeSpin: number;
		spinGameList: any;
		freeSpinClaimed: boolean;
		bonusClaimed: boolean;
		cashbackClaimed: boolean;
		freeSpinEligible: boolean;
		bonusEligible: boolean;
		cashbackEligible: boolean;
		cashbackAmountUSD: number;
	};

	// Mocked levelReachedNumber
	const levelReachedNumber = 1;

	// Mocked data for levels
	const levelsData: milestone[] = [
		{
			name: 'blue-whale',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'crab',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'dolphin',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'electric-eel',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'great-white-shark',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'killer-whale',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'minnow',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'octopus',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'plankton',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'shrimp',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		},
		{
			name: 'swordfish',
			point: 2,
			isMilestone: true,
			rakebackWagePercent: 0,
			bonus: 1,
			freeSpin: 0,
			spinGameList: {},
			freeSpinClaimed: false,
			bonusClaimed: false,
			cashbackClaimed: false,
			freeSpinEligible: false,
			bonusEligible: false,
			cashbackEligible: false,
			cashbackAmountUSD: 0
		}
	];
</script>

<section class="swiper-rank">
	<Swiper
		virtual={true}
		slidesPerView={4}
		slidesPerGroup={1}
		mousewheel={true}
		keyboard={true}
		breakpoints={{
			420: {
				slidesPerView: 5,
				slidesPerGroup: 1
			},
			540: {
				slidesPerView: 6,
				slidesPerGroup: 1
			},
			600: {
				slidesPerView: 7,
				slidesPerGroup: 1
			},
			725: {
				slidesPerView: 8,
				slidesPerGroup: 1
			},
			850: {
				slidesPerView: 9,
				slidesPerGroup: 1
			},
			950: {
				slidesPerView: 9,
				slidesPerGroup: 1
			},
			1100: {
				slidesPerView: 10,
				slidesPerGroup: 1
			},
			1300: {
				slidesPerView: 11,
				slidesPerGroup: 1
			}
		}}
	>
		{#each levelsData as level, index}
			<SwiperSlide>
				<div class="slider-component">
					<div class="slider-image">
						{#if levelReachedNumber === index}
							<div class="slider-arrow-image">
								<img src={Arrow} alt="Arrow icon" />
							</div>
						{:else if levelReachedNumber > index}
							<div class="slider-tick-image">
								<img src={Right} alt="Arrow icon" />
							</div>
						{:else}
							<div class="slider-lock-image">
								<img src={Lock} alt="Arrow icon" />
							</div>
						{/if}

						<div class={`slider-arrow-block ${levelReachedNumber === index ? 'current' : ''}`}>
							<SwiperLevelRank
								levelName={level.name}
								success={levelReachedNumber > index}
								current={levelReachedNumber === index}
							/>
						</div>
					</div>
					<div
						class={`slider-number ${
							levelReachedNumber === index ? 'blue' : levelReachedNumber > index ? 'success' : ''
						} `}
					>
						{index + 1}
						<span></span>
					</div>
					<div class={`slider-bottom ${levelReachedNumber <= index ? 'current' : ''}`}></div>
				</div>
			</SwiperSlide>
		{/each}
	</Swiper>
</section>

<style lang="postcss">
	section.swiper-rank {
		@apply flex justify-between mb-6 w-full mt-10;
	}
	.slider-component {
		@apply p-2;
	}
	.slider-image {
		@apply flex flex-col justify-center items-center w-[72px] h-[72px] rounded relative;
	}
	.slider-arrow-image {
		@apply mt-[-62px] z-[2] absolute;
	}
	.slider-arrow-image img {
		@apply w-[28px] h-5;
	}
	.slider-tick-image {
		@apply absolute flex mt-[-52px] z-[2];
	}
	.slider-tick-image img {
		@apply w-5 h-5 justify-self-center;
	}
	.slider-lock-image {
		@apply absolute z-[3];
	}
	.slider-lock-image img {
		@apply w-[30px] h-[30px] justify-self-center;
	}
	.slider-arrow-block {
		@apply flex flex-col bg-primary-700 items-center rounded w-[66px] h-[55px];
	}
	.slider-arrow-block.current {
		@apply w-[87px] h-[73px];
	}
	.slider-number {
		@apply flex justify-center items-center w-[25px] h-[25px] ml-[23px] mt-[10px] text-primary-900 bg-primary-600 rounded font-bold z-[2] relative text-xs;
	}
	.slider-number.success {
		@apply bg-green-600;
	}
	.slider-number.blue {
		@apply bg-primaryBlue;
	}
	.slider-number span {
		@apply border-l-[6px] border-primary-600 mt-[-40px] h-[18px] absolute;
	}
	.slider-number.success span {
		@apply border-green-600;
	}
	.slider-number.blue span {
		@apply border-primaryBlue;
	}
	.slider-bottom {
		@apply border-b-[6px] border-green-600 w-[90px] ml-[35px] mt-[-15px] relative z-[1];
	}
	.slider-bottom.current {
		@apply border-primary-600;
	}
</style>
