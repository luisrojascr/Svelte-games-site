<script lang="ts">
	let resize = false;
</script>

<div class={`dice-slider-wrapper ${resize ? 'resize' : ''}`}>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 0%">
			<span class="breakpoint-value">
				<span>{0}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 25%">
			<span class="breakpoint-value">
				<span>{25}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 50%">
			<span class="breakpoint-value">
				<span>{50}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 75%">
			<span class="breakpoint-value">
				<span>{75}</span>
			</span>
		</div>
	</div>
	<div class="breakpoints-wrapper">
		<div class="breakpoint-wrapper" style="left: 100%">
			<span class="breakpoint-value">
				<span>{100}</span>
			</span>
		</div>
	</div>
</div>

<style lang="postcss">
	.dice-slider-wrapper {
		@apply relative w-full max-w-[633px] text-left rounded-[31px] p-6 border border-blue-700 bg-blue-900;
		/* Conditional margin */
	}

	/* Applying conditional margin based on $resize */
	.dice-slider-wrapper:resize {
		@apply my-20 mx-0;
	}

	.dice-slider-wrapper:not(:resize) {
		@apply my-16 mx-0;
	}

	.breakpoints-wrapper {
		@apply absolute bottom-full left-[calc(1.5em+15px)] right-[calc(1.5em+15px)];
	}

	.breakpoint-wrapper {
		@apply absolute text-center;
		transform: translate(-50%, 0);
	}

	.breakpoint-value {
		@apply absolute flex left-1/2 bottom-0 text-white;
		font-family: 'Open Sans', serif;
		font-size: 12px;
		font-weight: 900;
		line-height: 2;
		letter-spacing: 1px;
		text-align: center;
		/* Custom transform for the parent element */
		transform: translate(-50%, 0);
	}

	.breakpoint-value::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		border-color: transparent transparent #111a41;
		border-style: solid;
		border-width: 0 8px 6px;
	}

	.breakpoint-value span {
		width: 4ch;
		position: absolute;
		left: 50%;
		bottom: 100%;
		transform: translate(-45%, -20%);
	}
</style>
