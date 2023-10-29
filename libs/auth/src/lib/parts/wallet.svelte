<script lang="ts">
	import Onboard from '@web3-onboard/core';
	import injectedModule from '@web3-onboard/injected-wallets';
	import walletConnectModule from '@web3-onboard/walletconnect';
	import { ethers, getAddress } from 'ethers';
	import { SiweMessage } from 'siwe';
	import { stateWalletAddress, stateWalletConfirmed } from '../state';

	let _element: HTMLInputElement;
	let _confirmed = false;

	let walletProvider: any = undefined;
	let walletSigner: any = undefined;

	const injected = injectedModule();
	const walletConnect = walletConnectModule({
		projectId: import.meta.env.VITE_WALLET_CONNECT,
		// requiredChains: [1],
		// optionalChains: [42161, 8453, 10, 137, 56],
		dappUrl: import.meta.env.VITE_AUTH_URL
	});

	const onboard = Onboard({
		theme: 'dark',
		wallets: [injected, walletConnect],
		chains: [
			{
				id: '0x1',
				token: 'ETH',
				label: 'Ethereum Mainnet',
				rpcUrl: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`
			}
		],
		// i18n?: i18nOptions,
		// accountCenter?: AccountCenterOptions,
		// apiKey?: string,
		// notify?: Partial<NotifyOptions>,
		// gas?: typeof gas,
		// connect?: ConnectModalOptions,
		// theme?: Theme,
		disableFontDownload: true // Inter font is already loaded
	});

	stateWalletAddress.subscribe((value) => {
		if (value && _element) {
			_element.value = value;
		}
	});

	stateWalletConfirmed.subscribe((value) => {
		_confirmed = value;
	});

	export const confirm = async (): Promise<boolean> => {
		return new Promise(async (resolve) => {
			try {
				const __address = _element.value;
				if (_element.value.length === 0) {
					resolve(false);
					return;
				}
				// todo: get nonce from server and/or add timestamp?
				const message = {
					domain: window.location.host,
					address: __address,
					statement: `${
						import.meta.env.VITE_BRAND
					} would like to verify your ownership of this address`,
					uri: window.location.origin,
					version: '1',
					chainId: 1
				};
				const siweMessage = new SiweMessage(message);
				const preparedMessage = siweMessage.prepareMessage();
				const signature = await walletSigner.signMessage(preparedMessage);
				const fields = await siweMessage.verify({ signature });
				console.log(`fields: ${JSON.stringify(fields, null, 2)}`);
				if (fields.success) {
					_confirmed = true;
					stateWalletConfirmed.set(true);
				}
				resolve(fields.success);
			} catch (e) {
				console.log(`error signing or verifying message: ${e}`);
				resolve(false);
			}
		});
	};

	const connect = async (event: Event) => {
		if (event) event.preventDefault();
		const wallets = await onboard.connectWallet();

		if (wallets?.length > 0 && wallets[0].accounts?.length > 0) {
			try {
				stateWalletAddress.set(wallets[0].accounts[0].address);
				if (_element) _element.value = getAddress(wallets[0].accounts[0].address);
				walletProvider = wallets[0].provider;
				walletProvider = new ethers.BrowserProvider(wallets[0].provider);
				walletSigner = await walletProvider.getSigner();
				const confirmed = await confirm();
			} catch (e) {
				console.log(`error parsing wallet address ${e}`);
			}
		}
	};
</script>

<div class="section">
	<span class="flex">
		<div class="relative w-full">
			<div class="leading-icon">
				<svg
					class="leading-icon-svg"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11.905 1.316 15.633 6M18 10h-5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h5m0-5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-3m-6.367-9L7.905 1.316 2.352 6h9.281Z"
					/>
				</svg>
			</div>
			<input
				type="text"
				name="address"
				id="address"
				bind:this={_element}
				placeholder={` connect crypto wallet`}
				disabled
			/>
		</div>
		{#if _confirmed}
			<svg
				class="check"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 16 12"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 5.917 5.724 10.5 15 1.5"
				/>
			</svg>
		{/if}
	</span>
	{#if !_confirmed}
		<div class="button">
			<button class={'enabled'} on:click={connect}>
				<div class="inner-button">
					<svg
						version="1.1"
						id="Layer_1"
						class="button-icon"
						viewBox="0 0 318.6 318.6"
						style="enable-background:new 0 0 318.6 318.6;"
						xml:space="preserve"
					>
						<style type="text/css">
							.st0 {
								fill: #e2761b;
								stroke: #e2761b;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st1 {
								fill: #e4761b;
								stroke: #e4761b;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st2 {
								fill: #d7c1b3;
								stroke: #d7c1b3;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st3 {
								fill: #233447;
								stroke: #233447;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st4 {
								fill: #cd6116;
								stroke: #cd6116;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st5 {
								fill: #e4751f;
								stroke: #e4751f;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st6 {
								fill: #f6851b;
								stroke: #f6851b;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st7 {
								fill: #c0ad9e;
								stroke: #c0ad9e;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st8 {
								fill: #161616;
								stroke: #161616;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
							.st9 {
								fill: #763d16;
								stroke: #763d16;
								stroke-linecap: round;
								stroke-linejoin: round;
							}
						</style>
						<polygon class="st0" points="274.1,35.5 174.6,109.4 193,65.8 " />
						<g>
							<polygon class="st1" points="44.4,35.5 143.1,110.1 125.6,65.8 	" />
							<polygon class="st1" points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7 	" />
							<polygon class="st1" points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8 	" />
							<polygon class="st1" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 	" />
							<polygon class="st1" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 	" />
							<polygon class="st1" points="106.8,247.4 140.6,230.9 111.4,208.1 	" />
							<polygon class="st1" points="177.9,230.9 211.8,247.4 207.1,208.1 	" />
						</g>
						<g>
							<polygon class="st2" points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.3 	" />
							<polygon class="st2" points="106.8,247.4 138.3,262.3 138.1,253 140.6,230.9 	" />
						</g>
						<polygon class="st3" points="138.8,193.5 110.6,185.2 130.5,176.1 " />
						<polygon class="st3" points="179.7,193.5 188,176.1 208,185.2 " />
						<g>
							<polygon class="st4" points="106.8,247.4 111.6,206.8 80.3,207.7 	" />
							<polygon class="st4" points="207,206.8 211.8,247.4 238.3,207.7 	" />
							<polygon
								class="st4"
								points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 	"
							/>
							<polygon
								class="st4"
								points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 	"
							/>
						</g>
						<g>
							<polygon class="st5" points="87.8,162.1 111.4,208.1 110.6,185.2 	" />
							<polygon class="st5" points="208.1,185.2 207.1,208.1 230.8,162.1 	" />
							<polygon class="st5" points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 	" />
							<polygon class="st5" points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 	" />
						</g>
						<polygon
							class="st6"
							points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 "
						/>
						<polygon
							class="st6"
							points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 "
						/>
						<polygon
							class="st7"
							points="180.3,262.3 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4 
	140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "
						/>
						<polygon
							class="st8"
							points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 "
						/>
						<g>
							<polygon
								class="st9"
								points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 
		281.8,129.1 275.6,124.3 283.6,118.2 	"
							/>
							<polygon
								class="st9"
								points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 
		140.6,106.9 44.4,35.5 	"
							/>
						</g>
						<polygon
							class="st6"
							points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 "
						/>
						<polygon
							class="st6"
							points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 "
						/>
						<polygon
							class="st6"
							points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 
	173.1,227.6 173.3,182.8 "
						/>
					</svg>
					<div class="button-text">Sign in with Crypto Wallet</div>
					<svg
						fill="none"
						height="332"
						viewBox="0 0 480 332"
						width="480"
						class="button-icon"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="m126.613 93.9842c62.622-61.3123 164.152-61.3123 226.775 0l7.536 7.3788c3.131 3.066 3.131 8.036 0 11.102l-25.781 25.242c-1.566 1.533-4.104 1.533-5.67 0l-10.371-10.154c-43.687-42.7734-114.517-42.7734-158.204 0l-11.107 10.874c-1.565 1.533-4.103 1.533-5.669 0l-25.781-25.242c-3.132-3.066-3.132-8.036 0-11.102zm280.093 52.2038 22.946 22.465c3.131 3.066 3.131 8.036 0 11.102l-103.463 101.301c-3.131 3.065-8.208 3.065-11.339 0l-73.432-71.896c-.783-.767-2.052-.767-2.835 0l-73.43 71.896c-3.131 3.065-8.208 3.065-11.339 0l-103.4657-101.302c-3.1311-3.066-3.1311-8.036 0-11.102l22.9456-22.466c3.1311-3.065 8.2077-3.065 11.3388 0l73.4333 71.897c.782.767 2.051.767 2.834 0l73.429-71.897c3.131-3.065 8.208-3.065 11.339 0l73.433 71.897c.783.767 2.052.767 2.835 0l73.431-71.895c3.132-3.066 8.208-3.066 11.339 0z"
							fill="#fff"
						/></svg
					>
				</div></button
			>
		</div>
	{/if}
</div>

<style lang="postcss">
	.section {
		@apply pt-6;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	.leading-icon-svg {
		@apply w-6 h-6 text-white;
	}
	.check {
		@apply w-6 h-6 text-green-400 pt-3;
	}
	.inner-button {
		@apply flex justify-center justify-items-center;
	}
	.button {
		@apply pt-2;
	}
	.button-text {
		@apply pt-3 px-3;
	}
	.button-icon {
		@apply w-10 h-10 text-white;
	}
	input {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-12;
	}
	button.enabled {
		@apply w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center;
	}
</style>
