// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onGoogleSignIn: (response: any) => void
		fbAsyncInit: () => void
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ethereum: any
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	declare let FB: any;
}

export {};
