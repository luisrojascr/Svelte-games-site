<script lang="ts">
	import FlushVIPClubIcon from '$lib/assets/eventsClubIcon.svg';
	import EventsPartyIcon from '$lib/assets/eventsPartyIcon.svg';
	import EventsTicketsIcon from '$lib/assets/eventsTicketsIcon.svg';
</script>

<div class="events-container">
	<div class="events-content">
		<p class="main-paragraph">
			Flush VIP ups the ante by further rewarding players with the opportunity to attend VIP
			exclusive events inaccessible to the general public.
		</p>
		<p class="second-paragraph">
			With upcoming exclusive events such as 'Flush VIP Club Poker tournaments', 'tickets for
			exclusive events', and 'Flush Party time events'; Flush VIP Club members get far more bang for
			their buck than any other provider out there!
		</p>
	</div>

	<div class="events-grid">
		<div class="events-card">
			<img src={FlushVIPClubIcon} alt="VIP Club icon" loading="lazy" />
			<span class="events-card-text">Flush VIP Club Poker Tournaments</span>
		</div>
		<div class="events-card">
			<img src={EventsTicketsIcon} alt="Exclusive Events icon" loading="lazy" />
			<span class="events-card-text">Tickets for Exclusive Events</span>
		</div>
		<div class="events-card">
			<img src={EventsPartyIcon} alt="Flush Party Events icon" loading="lazy" />
			<span class="events-card-text">Flush Party Time Events</span>
		</div>
		<div class="events-main-card">
			<span class="events-main-card-text">
				VIP events are coming soon, give us some time to organise the parties, and make sure the VIP
				treatment is delivered in full.
			</span>
		</div>
	</div>
</div>

<style lang="postcss">
	.events-container {
		@apply text-white mt-5;
	}
	.events-content {
		@apply flex flex-col items-center mb-5;
	}
	.main-paragraph {
		@apply text-xl font-bold mr-12;
	}
	.second-paragraph {
		@apply text-base font-normal opacity-80 mt-4;
	}
	.events-grid {
		@apply grid grid-cols-1 gap-4;
	}
	.events-card {
		@apply flex flex-col justify-center items-center bg-gray-700 rounded-md h-32 p-2;
	}
	.events-card-text {
		@apply text-center mt-2 font-semibold text-sm;
	}
	.events-main-card {
		@apply flex flex-col justify-center items-center rounded-md h-32 bg-[url('./eventbackground.svg')] bg-cover bg-center;
	}
	.events-main-card-text {
		@apply text-center text-base font-semibold p-3;
	}
	@media (min-width: 640px) {
		.events-content {
			@apply flex-row;
		}
		.second-paragraph {
			@apply mt-0;
		}
	}
	@media (min-width: 768px) {
		.events-grid {
			@apply grid-cols-custom;
		}
	}
</style>
