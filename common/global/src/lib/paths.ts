const devBasePath = import.meta.env.BASE_URL.substring(1); // sveltekit server dev mode
const basePath = import.meta.env.VITE_BASE_PATH ?? ''; // deployed base path (env var)

// takes the current full relative page path (w/ base path)
// and the partial target path path (w/o base path)
// and returns the full relative href for the target and whether the target is the current page
export const relativeHref = (
	currentPath: string,
	targetPath: string
): [href: string, isCurrent: boolean] => {
	const relParts = currentPath.split('/');
	const absParts = currentPath.split('/');
	// remove any empty trailing slash part
	if (absParts.length > 0 && absParts[absParts.length - 1].length === 0) absParts.pop();
	if (relParts.length > 0 && relParts[relParts.length - 1].length === 0) relParts.pop();
	// remove any empty leading slash part
	if (absParts.length > 0 && absParts[0].length === 0) absParts.shift();
	if (relParts.length > 0 && relParts[0].length === 0) relParts.shift();
	// console.log(
	// 	`relParts[${relParts.length}][${relParts}] - absParts[${absParts.length}][${absParts}]`
	// );
	// remove base path (if configured and present)
	if (
		(devBasePath && relParts.length > 0 && relParts[0] === devBasePath) ||
		(basePath && relParts.length > 0 && relParts[0] === basePath)
	) {
		relParts.shift();
	}
	// remove language (if present)
	if (relParts.length > 0 && relParts[0].length === 2) relParts.shift();
	// remove path (if not root)
	if (relParts.length > 0) absParts.pop();
	// console.log(
	// 	`relParts[${relParts.length}][${relParts}] - absParts[${absParts.length}][${absParts}]`
	// );
	const relativeHref = relParts.length === 0 ? '/' : '/' + relParts.join('/') + '/';
	const isCurrent = relativeHref === targetPath;
	const href = isCurrent
		? currentPath
		: (absParts.length === 0 ? '' : '/' + absParts.join('/')) + targetPath;
	// console.log(`relativePath [${relativeHref}] - href [${href}]`);
	return [href, isCurrent];
};
