export function clickOutside(node: HTMLElement, callback: (event: MouseEvent | TouchEvent) => void) {
    const handleClick = (event: MouseEvent | TouchEvent) => {
        if (!node.contains(event.target as Node)) {
            callback(event);
        }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return {
        destroy() {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        }
    };
}