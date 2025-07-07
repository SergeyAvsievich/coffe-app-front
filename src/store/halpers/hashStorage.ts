export const hashStorage = {
	getItem: (key: string): string => {
		const hash = window.location.hash.slice(1);
		const params = new URLSearchParams(hash);
		const storageValue = params.get(key) ?? '';
		return JSON.parse(storageValue);
	},
	setItem: (key: string, value: string): void => {
		const hash = window.location.hash.slice(1);
		const params = new URLSearchParams(hash);
		params.set(key, JSON.stringify(value));
		window.location.hash = params.toString();
	},
	removeItem: (key: string): void => {
		const hash = window.location.hash.slice(1);
		const params = new URLSearchParams(hash);
		params.delete(key);
		window.location.hash = params.toString();
	},
};
