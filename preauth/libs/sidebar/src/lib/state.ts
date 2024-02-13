import { writable } from 'svelte/store';

// menu auto-collapse indicates whether the sidebar menu should autocollapse on desktop
// this is set by the hamburger menu button in the topnav when in deskptop (lg) viewarea
export const menuAutoCollapse = writable<boolean>(false);
export const menuAutoCollapsed = writable<boolean>(false);

// menu mobile open indicates whether the sidebar menu should be open on mobile
// this is set by the hamburger menu button in the topnav when in mobile (xs/sm/md) viewarea
// and is closed by the X menu button in the topnav when in mobile (xs/sm/md) viewarea
export const menuMobileOpen = writable<boolean>(false);
