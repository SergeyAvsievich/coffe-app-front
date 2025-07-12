export interface CoffeeFilters {
	urlParams: {
		filterType: string;
		search: string;
		sortOrder: string;
	};
}

export interface CoffeeFiltersWithUrl extends CoffeeFilters {
	urlParams: {
		filterType: string;
		search: string;
		sortOrder: string;
	};
}

export interface CoffeeFiltersActions {
	setUrlParams: (params: CoffeeFilters['urlParams']) => void;
}
