<script lang="ts">
	import MetaMaskIcon from '$lib/icons/metamask.svelte';
	import WalletConnectIcon from '$lib/icons/walletconnect.svelte';
	import Onboard from '@web3-onboard/core';
	import injectedModule from '@web3-onboard/injected-wallets';
	import walletConnectModule from '@web3-onboard/walletconnect';
	import { ethers, getAddress } from 'ethers';
	import { SiweMessage } from 'siwe';

	let confirmed = false;
	let wallet_address: string | undefined = undefined;

	let walletProvider: any = undefined;
	let walletSigner: any = undefined;

	const injected = injectedModule();
	const walletConnect = walletConnectModule({
		projectId: import.meta.env.VITE_WALLET_CONNECT,
		// requiredChains: [1],
		// optionalChains: [42161, 8453, 10, 137, 56],
		dappUrl: import.meta.env.VITE_PREAUTH_URL
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

	export const confirm = async (): Promise<boolean> => {
		if (!wallet_address) return false;
		return new Promise(async (resolve) => {
			try {
				// todo: get nonce from server and/or add timestamp?
				const message = {
					domain: window.location.host,
					address: wallet_address,
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
					confirmed = true;
					// stateWalletAddress.set(wallet_address!);
					// stateWalletConfirmed.set(true);
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
				// stateWalletAddress.set(wallets[0].accounts[0].address);
				wallet_address = getAddress(wallets[0].accounts[0].address);
				walletProvider = wallets[0].provider;
				walletProvider = new ethers.BrowserProvider(wallets[0].provider);
				walletSigner = await walletProvider.getSigner();
				await confirm();
			} catch (e) {
				console.log(`error parsing wallet address ${e}`);
			}
		}
	};
</script>

<div class="section">
	<button class="first" on:click={connect}>
		<div class="inner-button">
			<MetaMaskIcon />
		</div></button
	>
	<button class={'enabled'} on:click={connect}>
		<div class="inner-button">
			<WalletConnectIcon />
		</div></button
	>
</div>

<style lang="postcss">
	.first {
		@apply ml-3;
	}
	.section {
		@apply pt-6 flex space-x-3;
	}
	button {
		@apply bg-blue-600  rounded-lg px-1 py-1 text-center;
	}
	button:hover {
		@apply bg-blue-800;
	}
	button:focus {
		@apply ring-4 outline-none ring-blue-300;
	}
</style>
